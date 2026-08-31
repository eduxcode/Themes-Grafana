/**
 * Lightweight safe Handlebars & Grafana Variable Evaluator for Business Text plugin preview
 */

export function renderBusinessTemplate(
  template: string,
  data: any,
  variables: Record<string, string> = {}
): string {
  if (!template) return '';

  let output = template;

  // 1. Substitute Grafana Dashboard variables ${var_name} or ${__dashboard.name}
  output = output.replace(/\$\{([^}]+)\}/g, (_, varName) => {
    if (variables[varName] !== undefined) {
      return variables[varName];
    }
    // Default fallback values for standard Grafana global variables
    if (varName === '__dashboard.name') return variables['__dashboard.name'] || 'Production Infrastructure Overview';
    if (varName === '__dashboard.uid') return 'prod-infra-01';
    if (varName === '__org.name') return 'Main Enterprise Org';
    if (varName === '__from:date') return new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (varName === '__to:date') return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (varName === '__interval') return '1m';
    return `\${${varName}}`;
  });

  // 2. Process #each blocks
  // Regex to match {{#each path}} content {{/each}}
  output = output.replace(/\{\{#each\s+([a-zA-Z0-9_.[\]]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, path, blockContent) => {
    const list = resolvePath(data, path.trim());
    if (!Array.isArray(list) || list.length === 0) {
      return '';
    }

    return list.map((item, index) => {
      let itemOutput = blockContent;
      // replace @index, @first, @last
      itemOutput = itemOutput.replace(/\{\{@index\}\}/g, String(index));
      itemOutput = itemOutput.replace(/\{\{@first\}\}/g, index === 0 ? 'true' : 'false');
      itemOutput = itemOutput.replace(/\{\{@last\}\}/g, index === list.length - 1 ? 'true' : 'false');
      
      // Handle nested conditionals inside #each first before replacing raw field tags
      itemOutput = processConditionals(itemOutput, item);

      // replace item fields {{this.field}} or {{field}}
      itemOutput = itemOutput.replace(/\{\{(?:this\.)?([a-zA-Z0-9_.[\]]+)\}\}/g, (match, propPath) => {
        if (propPath === 'this') {
          return typeof item === 'object' ? JSON.stringify(item) : String(item);
        }
        if (propPath.startsWith('#') || propPath.startsWith('/') || propPath.startsWith('else')) return match;
        const val = resolvePath(item, propPath);
        return val !== undefined && val !== null ? String(val) : '';
      });

      return itemOutput;
    }).join('');
  });

  // 3. Process Conditionals at root level
  output = processConditionals(output, data);

  // 4. Process custom helpers: {{round val decimals}}, {{formatBytes val}}, {{uppercase val}}, {{json val}}
  output = output.replace(/\{\{round\s+([a-zA-Z0-9_.[\]]+)(?:\s+(\d+))?\}\}/g, (_, path, decimals) => {
    const val = Number(resolvePath(data, path));
    if (isNaN(val)) return '0';
    return val.toFixed(decimals ? parseInt(decimals, 10) : 1);
  });

  output = output.replace(/\{\{formatBytes\s+([a-zA-Z0-9_.[\]]+)\}\}/g, (_, path) => {
    const val = Number(resolvePath(data, path));
    if (isNaN(val)) return '0 B';
    if (val < 1024) return `${val} B`;
    if (val < 1024 * 1024) return `${(val / 1024).toFixed(1)} KB`;
    if (val < 1024 * 1024 * 1024) return `${(val / (1024 * 1024)).toFixed(1)} MB`;
    return `${(val / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  });

  output = output.replace(/\{\{uppercase\s+([a-zA-Z0-9_.[\]]+)\}\}/g, (_, path) => {
    const val = resolvePath(data, path);
    return val ? String(val).toUpperCase() : '';
  });

  output = output.replace(/\{\{json\s+([a-zA-Z0-9_.[\]]+)\}\}/g, (_, path) => {
    const val = resolvePath(data, path);
    return val !== undefined ? JSON.stringify(val, null, 2) : '{}';
  });

  // 5. Replace standard variable references {{data.[0].field}} or {{field}}
  output = output.replace(/\{\{([a-zA-Z0-9_.[\]]+)\}\}/g, (match, path) => {
    // Ignore unmatched tags or helpers
    if (path.startsWith('#') || path.startsWith('/') || path.startsWith('else')) return match;
    const val = resolvePath(data, path.trim());
    return val !== undefined ? String(val) : '';
  });

  return output;
}

function processConditionals(template: string, context: any): string {
  // Regex to match {{#if condition}} ifContent ({{else}} elseContent)? {{/if}}
  return template.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g, (_, rawCond, ifContent, elseContent = '') => {
    const isTrue = evaluateCondition(rawCond.trim(), context);
    return isTrue ? ifContent : elseContent;
  });
}

function evaluateCondition(condStr: string, context: any): boolean {
  // Handle helper syntax like (gt cpu 80), (gt this.cpu 80), (eq status 'healthy'), (ne status 'down')
  const parensMatch = condStr.match(/^\((eq|ne|gt|gte|lt|lte)\s+([a-zA-Z0-9_.[\]]+)\s+([^)]+)\)$/);
  if (parensMatch) {
    const [_, operator, rawPath, rawTarget] = parensMatch;
    const path = rawPath.startsWith('this.') ? rawPath.replace(/^this\./, '') : rawPath;
    const val = resolvePath(context, path);
    let target: any = rawTarget.trim();
    if ((target.startsWith("'") && target.endsWith("'")) || (target.startsWith('"') && target.endsWith('"'))) {
      target = target.slice(1, -1);
    } else if (!isNaN(Number(target))) {
      target = Number(target);
    }

    if (val === undefined || val === null) {
      if (operator === 'ne') return true;
      return false;
    }

    const numVal = Number(val);
    const numTarget = Number(target);

    switch (operator) {
      case 'eq': return String(val).toLowerCase() === String(target).toLowerCase();
      case 'ne': return String(val).toLowerCase() !== String(target).toLowerCase();
      case 'gt': return !isNaN(numVal) && !isNaN(numTarget) ? numVal > numTarget : false;
      case 'gte': return !isNaN(numVal) && !isNaN(numTarget) ? numVal >= numTarget : false;
      case 'lt': return !isNaN(numVal) && !isNaN(numTarget) ? numVal < numTarget : false;
      case 'lte': return !isNaN(numVal) && !isNaN(numTarget) ? numVal <= numTarget : false;
    }
  }

  // Simple boolean / existence check: {{#if value}} or {{#if this.value}}
  const cleanCond = condStr.startsWith('this.') ? condStr.replace(/^this\./, '') : condStr;
  const val = resolvePath(context, cleanCond);
  if (val === undefined || val === null || val === '') return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'number') return !isNaN(val) && val > 0;
  return Boolean(val);
}

function resolvePath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  if (path === 'this') return obj;

  // normalize data.[0].field or data[0].field or items.0.name
  const cleanPath = path
    .replace(/\[(\d+)\]/g, '.$1')
    .replace(/^\./, '');

  const parts = cleanPath.split('.');
  let curr = obj;

  for (const p of parts) {
    if (curr === null || curr === undefined) return undefined;
    curr = curr[p];
  }

  return curr;
}
