/**
 * Utilities to generate clean Grafana Panel JSON configurations
 * for the "Business Text" (volkovlabs-business-text-panel) plugin.
 */

export interface ExportOptions {
  panelTitle: string;
  htmlContent: string;
  cssContent: string;
  defaultData?: any;
  gridPos?: { h: number; w: number; x: number; y: number };
}

export function generateGrafanaPanelJson({
  panelTitle,
  htmlContent,
  cssContent,
  gridPos = { h: 8, w: 12, x: 0, y: 0 },
}: ExportOptions): string {
  const panelModel = {
    id: Math.floor(Math.random() * 1000) + 1,
    type: "volkovlabs-business-text-panel",
    title: panelTitle || "Business Text Panel",
    gridPos: gridPos,
    options: {
      content: htmlContent,
      defaultContent: "<div class='no-data-alert'>Aguardando dados da consulta Grafana...</div>",
      everyRow: false,
      styles: cssContent,
      helpers: `
// Custom Handlebars helpers for Volkov Labs Business Text (Grafana v12+)
Handlebars.registerHelper('eq', function (a, b) { return a == b || String(a).toLowerCase() === String(b).toLowerCase(); });
Handlebars.registerHelper('ne', function (a, b) { return a != b && String(a).toLowerCase() !== String(b).toLowerCase(); });
Handlebars.registerHelper('gt', function (a, b) { return Number(a) > Number(b); });
Handlebars.registerHelper('gte', function (a, b) { return Number(a) >= Number(b); });
Handlebars.registerHelper('lt', function (a, b) { return Number(a) < Number(b); });
Handlebars.registerHelper('lte', function (a, b) { return Number(a) <= Number(b); });
Handlebars.registerHelper('round', function (val, decimals) { 
  const num = Number(val);
  return isNaN(num) ? '0' : num.toFixed(decimals || 1);
});
Handlebars.registerHelper('formatBytes', function (bytes) {
  const num = Number(bytes);
  if (isNaN(num)) return '0 B';
  if (num < 1024) return num + ' B';
  if (num < 1024 * 1024) return (num / 1024).toFixed(1) + ' KB';
  if (num < 1024 * 1024 * 1024) return (num / (1024 * 1024)).toFixed(1) + ' MB';
  return (num / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
});
      `.trim(),
      wrap: true,
      editor: {
        format: "auto",
        language: "html"
      }
    },
    pluginVersion: "5.3.0",
    transparent: true
  };

  return JSON.stringify(panelModel, null, 2);
}

export function generateDashboardJsonSnippet(panels: any[]): string {
  const dashboard = {
    annotations: { list: [] },
    editable: true,
    fiscalYearStartMonth: 0,
    graphTooltip: 1,
    id: null,
    links: [],
    liveNow: true,
    panels: panels,
    refresh: "10s",
    schemaVersion: 39,
    tags: ["business-text", "custom-theme", "grafana-studio"],
    templating: { list: [] },
    time: { from: "now-1h", to: "now" },
    timepicker: {},
    timezone: "browser",
    title: "Dashboard com Tema Business Text",
    version: 1,
    weekStart: ""
  };

  return JSON.stringify(dashboard, null, 2);
}
