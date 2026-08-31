import { ReusableComponent } from '../types';

export const REUSABLE_COMPONENTS: ReusableComponent[] = [
  // 1. KPI & MÉTRICAS
  {
    id: 'kpi-spark-delta',
    name: 'Cartão KPI com Delta & Micro Sparkline',
    category: 'kpi',
    description: 'Métrica principal corporativa com variação percentual colorida e SVG sparkline embutido para tendências em tempo real.',
    sampleData: {
      label: "TOTAL REQUESTS (1H)",
      value: "1.42M",
      delta: "+14.8%",
      is_positive: true,
      spark_points: "0,25 10,20 20,28 30,15 40,18 50,10 60,14 70,5 80,8 90,2 100,0"
    },
    htmlSnippet: `<div class="bt-kpi-card">
  <div class="bt-kpi-header">
    <span class="bt-kpi-label">{{#if label}}{{label}}{{else}}MÉTRICA{{/if}}</span>
    <span class="bt-kpi-delta {{#if is_positive}}delta-up{{else}}delta-down{{/if}}">
      {{#if delta}}{{delta}}{{else}}0.0%{{/if}}
    </span>
  </div>
  <div class="bt-kpi-body">
    <div class="bt-kpi-value">{{#if value}}{{value}}{{else}}N/D{{/if}}</div>
    <svg class="bt-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" points="{{#if spark_points}}{{spark_points}}{{else}}0,15 100,15{{/if}}" />
    </svg>
  </div>
</div>`,
    cssSnippet: `.bt-kpi-card {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
  min-width: 220px;
}
.bt-kpi-card .bt-kpi-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
}
.bt-kpi-card .bt-kpi-label {
  font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 0.6px; text-transform: uppercase;
}
.bt-kpi-card .bt-kpi-delta {
  font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-family: monospace;
}
.bt-kpi-card .delta-up { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.bt-kpi-card .delta-down { background: rgba(239, 68, 68, 0.15); color: #f87171; }
.bt-kpi-card .bt-kpi-body {
  display: flex; justify-content: space-between; align-items: flex-end; gap: 12px;
}
.bt-kpi-card .bt-kpi-value {
  font-size: 26px; font-weight: 800; line-height: 1; color: #f8fafc; font-family: monospace;
}
.bt-kpi-card .bt-sparkline {
  width: 90px; height: 26px; color: #38bdf8;
}`
  },

  // 2. CORPORATIVO & SLAS
  {
    id: 'sla-compliance-tracker',
    name: 'Termômetro de SLA & Error Budget (SRE Enterprise)',
    category: 'enterprise',
    description: 'Monitor de cumprimento de SLA com Error Budget restante em minutos, taxa de 99.9x% e barra de queima.',
    sampleData: {
      service_name: "PAYMENT-GATEWAY-PROD",
      target_sla: "99.95%",
      current_uptime: "99.982%",
      budget_remaining_min: 18.4,
      burn_rate: "0.8x (Estável)",
      status: "HEALTHY"
    },
    htmlSnippet: `<div class="bt-sla-card">
  <div class="bt-sla-header">
    <div class="bt-sla-title-grp">
      <span class="bt-sla-badge {{#if (eq status 'HEALTHY')}}badge-green{{else}}badge-red{{/if}}">
        {{#if status}}{{status}}{{else}}N/D{{/if}}
      </span>
      <span class="bt-sla-name">{{#if service_name}}{{service_name}}{{else}}Serviço{{/if}}</span>
    </div>
    <span class="bt-sla-target">Alvo: {{#if target_sla}}{{target_sla}}{{else}}99.9%{{/if}}</span>
  </div>
  <div class="bt-sla-metrics">
    <div class="bt-sla-col">
      <span class="bt-sla-lbl">UPTIME ATUAL</span>
      <span class="bt-sla-val text-emerald-400">{{#if current_uptime}}{{current_uptime}}{{else}}N/D{{/if}}</span>
    </div>
    <div class="bt-sla-col">
      <span class="bt-sla-lbl">ERROR BUDGET</span>
      <span class="bt-sla-val">{{#if budget_remaining_min}}{{budget_remaining_min}} min{{else}}N/D{{/if}}</span>
    </div>
    <div class="bt-sla-col">
      <span class="bt-sla-lbl">BURN RATE</span>
      <span class="bt-sla-val text-blue-400">{{#if burn_rate}}{{burn_rate}}{{else}}1.0x{{/if}}</span>
    </div>
  </div>
  <div class="bt-sla-burn-bar">
    <div class="bt-sla-fill" style="width: 88%"></div>
  </div>
</div>`,
    cssSnippet: `.bt-sla-card {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.bt-sla-card .bt-sla-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
}
.bt-sla-card .bt-sla-title-grp { display: flex; align-items: center; gap: 8px; }
.bt-sla-card .bt-sla-badge {
  font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 3px; font-family: monospace;
}
.bt-sla-card .badge-green { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
.bt-sla-card .badge-red { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
.bt-sla-card .bt-sla-name { font-size: 13px; font-weight: 700; color: #f8fafc; }
.bt-sla-card .bt-sla-target { font-size: 11px; font-mono; color: #64748b; }
.bt-sla-card .bt-sla-metrics {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 12px;
}
.bt-sla-card .bt-sla-lbl { font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; display: block; margin-bottom: 2px; }
.bt-sla-card .bt-sla-val { font-size: 15px; font-weight: 800; font-family: monospace; color: #e2e8f0; }
.bt-sla-card .bt-sla-burn-bar {
  height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden;
}
.bt-sla-card .bt-sla-fill {
  height: 100%; background: linear-gradient(90deg, #10b981, #38bdf8); border-radius: 3px;
}`
  },

  // 3. TABELAS & INVENTÁRIO (DISCOS / PODS / HOSTS)
  {
    id: 'enterprise-resource-table',
    name: 'Tabela de Partições / Discos com Mini Gauge',
    category: 'tables',
    description: 'Tabela compacta corporativa para monitorar múltiplos discos ou pods com mini barra de uso e limiares inteligentes.',
    sampleData: {
      disks: [
        { mount: "/ (root)", fstype: "ext4", total: "100GB", free: "32GB", used_pct: 68 },
        { mount: "/var/log", fstype: "xfs", total: "250GB", free: "22GB", used_pct: 91 },
        { mount: "/data/pg_wal", fstype: "ext4", total: "500GB", free: "310GB", used_pct: 38 },
        { mount: "/backup", fstype: "nfs", total: "2.0TB", free: "890GB", used_pct: 55 }
      ]
    },
    htmlSnippet: `<div class="bt-disk-table-box">
  <div class="bt-disk-head-title">INVENTÁRIO DE PARTIÇÕES &amp; ESPAÇO EM DISCO</div>
  <table class="bt-disk-table">
    <thead>
      <tr>
        <th>PONTO DE MONTAGEM</th>
        <th>TIPO</th>
        <th>TOTAL</th>
        <th>LIVRE</th>
        <th style="min-width: 140px;">USO (%)</th>
      </tr>
    </thead>
    <tbody>
      {{#each disks}}
      <tr>
        <td class="col-mount font-bold">{{#if this.mount}}{{this.mount}}{{else}}N/D{{/if}}</td>
        <td class="col-fs font-mono text-zinc-500">{{#if this.fstype}}{{this.fstype}}{{else}}N/D{{/if}}</td>
        <td class="col-total font-mono">{{#if this.total}}{{this.total}}{{else}}N/D{{/if}}</td>
        <td class="col-free font-mono">{{#if this.free}}{{this.free}}{{else}}N/D{{/if}}</td>
        <td class="col-bar">
          <div class="bt-row-gauge">
            <div class="bt-rg-bar">
              <div class="bt-rg-fill {{#if (gt this.used_pct 85)}}fill-danger{{else if (gt this.used_pct 70)}}fill-warning{{else}}fill-normal{{/if}}" 
                   style="width: {{this.used_pct}}%"></div>
            </div>
            <span class="bt-rg-pct font-mono {{#if (gt this.used_pct 85)}}text-red-400 font-bold{{/if}}">{{this.used_pct}}%</span>
          </div>
        </td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</div>`,
    cssSnippet: `.bt-disk-table-box {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.bt-disk-table-box .bt-disk-head-title {
  font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.6px; margin-bottom: 12px; text-transform: uppercase;
}
.bt-disk-table-box .bt-disk-table {
  width: 100%; border-collapse: collapse; font-size: 12px; color: #cbd5e1;
}
.bt-disk-table-box .bt-disk-table th {
  text-align: left; padding: 6px 10px; font-size: 10px; font-weight: 700; color: #64748b; border-bottom: 1px solid #1e293b; text-transform: uppercase;
}
.bt-disk-table-box .bt-disk-table td {
  padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle;
}
.bt-disk-table-box .col-mount { color: #f8fafc; }
.bt-disk-table-box .bt-row-gauge {
  display: flex; align-items: center; gap: 8px;
}
.bt-disk-table-box .bt-rg-bar {
  flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;
}
.bt-disk-table-box .bt-rg-fill {
  height: 100%; border-radius: 3px;
}
.bt-disk-table-box .fill-normal { background: #10b981; }
.bt-disk-table-box .fill-warning { background: #f59e0b; }
.bt-disk-table-box .fill-danger { background: #ef4444; }
.bt-disk-table-box .bt-rg-pct { font-size: 11px; min-width: 38px; text-align: right; }`
  },

  // 4. TONER & SUPRIMENTOS SNMP
  {
    id: 'snmp-toner-gauges',
    name: 'Níveis de Toner CMYK (SNMP Impressoras)',
    category: 'gauges',
    description: 'Barras verticais ou horizontais dos níveis de toner Cyan, Magenta, Yellow e Black com aviso de substituição.',
    sampleData: {
      printer_name: "HP LaserJet Enterprise MFP M630",
      ip_address: "192.168.10.45",
      cyan: 82,
      magenta: 45,
      yellow: 12,
      black: 94
    },
    htmlSnippet: `<div class="bt-toner-card">
  <div class="bt-toner-header">
    <span class="bt-toner-title">{{#if printer_name}}{{printer_name}}{{else}}Impressora SNMP{{/if}}</span>
    <span class="bt-toner-ip">{{#if ip_address}}{{ip_address}}{{else}}127.0.0.1{{/if}}</span>
  </div>
  <div class="bt-toner-grid">
    <!-- Black -->
    <div class="bt-toner-item">
      <div class="bt-toner-col-label"><span class="toner-dot dot-k"></span> K (Preto)</div>
      <div class="bt-toner-track">
        <div class="bt-toner-bar bg-k {{#if (lt black 15)}}pulse-low{{/if}}" style="width: {{black}}%"></div>
      </div>
      <span class="bt-toner-val">{{black}}%</span>
    </div>
    <!-- Cyan -->
    <div class="bt-toner-item">
      <div class="bt-toner-col-label"><span class="toner-dot dot-c"></span> C (Ciano)</div>
      <div class="bt-toner-track">
        <div class="bt-toner-bar bg-c {{#if (lt cyan 15)}}pulse-low{{/if}}" style="width: {{cyan}}%"></div>
      </div>
      <span class="bt-toner-val">{{cyan}}%</span>
    </div>
    <!-- Magenta -->
    <div class="bt-toner-item">
      <div class="bt-toner-col-label"><span class="toner-dot dot-m"></span> M (Magenta)</div>
      <div class="bt-toner-track">
        <div class="bt-toner-bar bg-m {{#if (lt magenta 15)}}pulse-low{{/if}}" style="width: {{magenta}}%"></div>
      </div>
      <span class="bt-toner-val">{{magenta}}%</span>
    </div>
    <!-- Yellow -->
    <div class="bt-toner-item">
      <div class="bt-toner-col-label"><span class="toner-dot dot-y"></span> Y (Amarelo)</div>
      <div class="bt-toner-track">
        <div class="bt-toner-bar bg-y {{#if (lt yellow 15)}}pulse-low{{/if}}" style="width: {{yellow}}%"></div>
      </div>
      <span class="bt-toner-val {{#if (lt yellow 15)}}text-red-400 font-bold{{/if}}">{{yellow}}%</span>
    </div>
  </div>
</div>`,
    cssSnippet: `.bt-toner-card {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #c9d1d9;
}
.bt-toner-card .bt-toner-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
}
.bt-toner-card .bt-toner-title { font-size: 13px; font-weight: 700; color: #f0f6fc; }
.bt-toner-card .bt-toner-ip { font-size: 11px; font-family: monospace; color: #8b949e; }
.bt-toner-card .bt-toner-grid { display: flex; flex-direction: column; gap: 8px; }
.bt-toner-card .bt-toner-item { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.bt-toner-card .bt-toner-col-label { width: 95px; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; }
.bt-toner-card .toner-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.bt-toner-card .dot-k { background: #ffffff; }
.bt-toner-card .dot-c { background: #00e5ff; }
.bt-toner-card .dot-m { background: #ff007f; }
.bt-toner-card .dot-y { background: #ffeb3b; }
.bt-toner-card .bt-toner-track { flex: 1; height: 8px; background: #21262d; border-radius: 4px; overflow: hidden; }
.bt-toner-card .bt-toner-bar { height: 100%; border-radius: 4px; transition: width 0.3s ease; }
.bt-toner-card .bg-k { background: #f0f6fc; }
.bt-toner-card .bg-c { background: #00e5ff; }
.bt-toner-card .bg-m { background: #ff007f; }
.bt-toner-card .bg-y { background: #ffeb3b; }
.bt-toner-card .bt-toner-val { width: 38px; text-align: right; font-family: monospace; font-size: 11px; }
.bt-toner-card .pulse-low { animation: bt-toner-blink 1.5s infinite; }
@keyframes bt-toner-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`
  },

  // 5. STATUS & SAÚDE DE CLUSTERS
  {
    id: 'health-matrix-grid',
    name: 'Matriz de Status de Microsserviços (Health Dots)',
    category: 'status',
    description: 'Grid visual corporativo de alta densidade com luzes de status coloridas (Verde/Amarelo/Vermelho) e latências.',
    sampleData: {
      services: [
        { name: "Auth Service", status: "ok", latency: "12ms" },
        { name: "Payments API", status: "ok", latency: "24ms" },
        { name: "Redis Cluster", status: "ok", latency: "1.2ms" },
        { name: "Order Processor", status: "warn", latency: "148ms" },
        { name: "Notification Push", status: "ok", latency: "38ms" },
        { name: "Elasticsearch", status: "ok", latency: "18ms" }
      ]
    },
    htmlSnippet: `<div class="bt-health-matrix">
  <div class="bt-matrix-title">ESTADO DOS MICROSSERVIÇOS &amp; APIS</div>
  <div class="bt-matrix-grid">
    {{#each services}}
    <div class="bt-matrix-item">
      <span class="bt-dot dot-{{#if this.status}}{{this.status}}{{else}}ok{{/if}}"></span>
      <span class="bt-service-name">{{#if this.name}}{{this.name}}{{else}}Serviço{{/if}}</span>
      <span class="bt-latency">{{#if this.latency}}{{this.latency}}{{else}}N/D{{/if}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssSnippet: `.bt-health-matrix {
  background: #090e17;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.bt-health-matrix .bt-matrix-title {
  font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 12px; letter-spacing: 0.6px; text-transform: uppercase;
}
.bt-health-matrix .bt-matrix-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;
}
.bt-health-matrix .bt-matrix-item {
  display: flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05); padding: 8px 10px; border-radius: 6px;
}
.bt-health-matrix .bt-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.bt-health-matrix .dot-ok { background: #10b981; box-shadow: 0 0 8px #10b981; }
.bt-health-matrix .dot-warn { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.bt-health-matrix .dot-crit { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
.bt-health-matrix .bt-service-name { font-size: 12px; font-weight: 600; color: #e2e8f0; flex: 1; }
.bt-health-matrix .bt-latency { font-size: 11px; color: #64748b; font-family: monospace; }`
  },

  // 6. AD DOMAIN CONTROLLER EVENT STATS
  {
    id: 'ad-security-kpi-strip',
    name: 'Faixa de Segurança Active Directory (Lockouts & Kerberos)',
    category: 'enterprise',
    description: 'Faixa tática para SOC/SysAdmin monitorando contas bloqueadas (Event 4740), tentativas incorretas e status de replicação.',
    sampleData: {
      domain_name: "CORP.ENTERPRISE.LOCAL",
      locked_accounts: 3,
      bad_password_attempts: 142,
      replication_status: "SYNC_OK",
      krbtgt_age_days: 84
    },
    htmlSnippet: `<div class="bt-ad-strip">
  <div class="bt-ad-domain">
    <span class="bt-ad-icon">🛡️</span>
    <div>
      <span class="bt-ad-lbl">DOMÍNIO AD DS</span>
      <span class="bt-ad-name">{{#if domain_name}}{{domain_name}}{{else}}CORP.LOCAL{{/if}}</span>
    </div>
  </div>
  <div class="bt-ad-stat-box {{#if (gt locked_accounts 0)}}box-alert{{/if}}">
    <span class="bt-ad-num">{{#if locked_accounts}}{{locked_accounts}}{{else}}0{{/if}}</span>
    <span class="bt-ad-sub">Contas Bloqueadas (4740)</span>
  </div>
  <div class="bt-ad-stat-box">
    <span class="bt-ad-num">{{#if bad_password_attempts}}{{bad_password_attempts}}{{else}}0{{/if}}</span>
    <span class="bt-ad-sub">Senhas Incorretas (1h)</span>
  </div>
  <div class="bt-ad-stat-box">
    <span class="bt-ad-status-txt {{#if (eq replication_status 'SYNC_OK')}}text-emerald-400{{else}}text-red-400{{/if}}">
      {{#if replication_status}}{{replication_status}}{{else}}OK{{/if}}
    </span>
    <span class="bt-ad-sub">Replicação FSMO</span>
  </div>
</div>`,
    cssSnippet: `.bt-ad-strip {
  background: #0b0f19;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.bt-ad-strip .bt-ad-domain { display: flex; align-items: center; gap: 10px; }
.bt-ad-strip .bt-ad-icon { font-size: 20px; }
.bt-ad-strip .bt-ad-lbl { font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; display: block; }
.bt-ad-strip .bt-ad-name { font-size: 13px; font-weight: 800; color: #38bdf8; font-family: monospace; }
.bt-ad-strip .bt-ad-stat-box {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
  padding: 8px 14px; border-radius: 6px; text-align: center; min-width: 130px;
}
.bt-ad-strip .box-alert { border-color: rgba(239,68,68,0.5); background: rgba(239,68,68,0.08); }
.bt-ad-strip .bt-ad-num { font-size: 18px; font-weight: 800; color: #f8fafc; font-family: monospace; display: block; }
.bt-ad-strip .bt-ad-sub { font-size: 10px; color: #94a3b8; font-weight: 600; }
.bt-ad-strip .bt-ad-status-txt { font-size: 13px; font-weight: 800; font-family: monospace; display: block; }`
  },

  // 7. GAUGES & PROGRESSO CIRCULAR
  {
    id: 'circular-speedometer-gauge',
    name: 'Medidor Circular SVG (CPU / Memória Working Set)',
    category: 'gauges',
    description: 'Gauge circular puro SVG sem dependências externas, com gradiente dinâmico e porcentagem central.',
    sampleData: {
      title: "CLUSTER CPU CORE LOAD",
      percentage: 78.4,
      cores_active: "64 / 64 Cores",
      clock_avg: "3.4 GHz"
    },
    htmlSnippet: `<div class="bt-circ-gauge-card">
  <div class="bt-cg-left">
    <svg class="bt-cg-svg" viewBox="0 0 100 100">
      <circle class="bt-cg-bg" cx="50" cy="50" r="40" />
      <circle class="bt-cg-val" cx="50" cy="50" r="40" 
              stroke-dasharray="251.2" 
              stroke-dashoffset="55" />
    </svg>
    <div class="bt-cg-center-txt">
      <span class="bt-cg-num">{{#if percentage}}{{percentage}}%{{else}}0%{{/if}}</span>
    </div>
  </div>
  <div class="bt-cg-right">
    <span class="bt-cg-title">{{#if title}}{{title}}{{else}}LOAD{{/if}}</span>
    <div class="bt-cg-detail">
      <span>Alocação: <strong>{{#if cores_active}}{{cores_active}}{{else}}N/D{{/if}}</strong></span>
      <span>Clock Médio: <strong>{{#if clock_avg}}{{clock_avg}}{{else}}N/D{{/if}}</strong></span>
    </div>
  </div>
</div>`,
    cssSnippet: `.bt-circ-gauge-card {
  background: #090e17;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.bt-circ-gauge-card .bt-cg-left { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
.bt-circ-gauge-card .bt-cg-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.bt-circ-gauge-card .bt-cg-bg { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 8; }
.bt-circ-gauge-card .bt-cg-val {
  fill: none; stroke: #f97316; stroke-width: 8; stroke-linecap: round;
  transition: stroke-dashoffset 0.6s ease;
}
.bt-circ-gauge-card .bt-cg-center-txt {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
}
.bt-circ-gauge-card .bt-cg-num { font-size: 14px; font-weight: 800; font-family: monospace; color: #fff; }
.bt-circ-gauge-card .bt-cg-right { flex: 1; }
.bt-circ-gauge-card .bt-cg-title { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.6px; display: block; margin-bottom: 6px; }
.bt-circ-gauge-card .bt-cg-detail { font-size: 11px; color: #64748b; display: flex; flex-direction: column; gap: 2px; }
.bt-circ-gauge-card .bt-cg-detail strong { color: #e2e8f0; font-family: monospace; }`
  },

  // 8. BANNERS DE ALERTA & INCIDENTES
  {
    id: 'alert-incident-banner',
    name: 'Banner de Alerta Crítico Pulsante (SOC / NOC)',
    category: 'alerts',
    description: 'Faixa de alerta de alta visibilidade com animação pulsante para incidentes, queda de VPN ou degradação de SLA.',
    sampleData: {
      alert_title: "DEGRADAÇÃO DETECTADA NO GATEWAY PIX",
      alert_details: "Latência acima de 500ms no conector Bacen (P99 = 1.2s)",
      started_at: "há 3 minutos",
      severity: "CRITICAL"
    },
    htmlSnippet: `<div class="bt-alert-banner">
  <div class="bt-alert-pulse">!</div>
  <div class="bt-alert-text">
    <div class="bt-alert-title">[{{#if severity}}{{severity}}{{else}}ALERTA{{/if}}] {{#if alert_title}}{{alert_title}}{{else}}Incidente Ativo{{/if}}</div>
    <div class="bt-alert-desc">{{#if alert_details}}{{alert_details}}{{else}}Verifique os logs{{/if}} • Iniciado {{#if started_at}}{{started_at}}{{else}}agora{{/if}}</div>
  </div>
  <button class="bt-alert-btn">ACKNOWLEDGE</button>
</div>`,
    cssSnippet: `.bt-alert-banner {
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.2), rgba(15, 23, 42, 0.95));
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.bt-alert-banner .bt-alert-pulse {
  width: 32px; height: 32px; border-radius: 50%; background: #ef4444;
  display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px;
  box-shadow: 0 0 14px #ef4444; flex-shrink: 0;
}
.bt-alert-banner .bt-alert-text { flex: 1; }
.bt-alert-banner .bt-alert-title { font-size: 13px; font-weight: 700; color: #fecaca; }
.bt-alert-banner .bt-alert-desc { font-size: 11px; color: #fca5a5; margin-top: 2px; }
.bt-alert-banner .bt-alert-btn {
  background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5;
  font-size: 10px; font-weight: 800; padding: 6px 14px; border-radius: 4px; cursor: pointer;
}`
  },

  // 9. LOGS & CONSOLES
  {
    id: 'live-terminal-stream',
    name: 'Console Terminal de Logs em Tempo Real',
    category: 'logs',
    description: 'Caixa de logs com tema escuro estilo terminal UNIX, cores ANSI por severidade e timestamps.',
    sampleData: {
      log_lines: [
        { time: "16:51:02.104", level: "INFO", msg: "HTTP POST /v1/auth/login 200 OK in 14ms" },
        { time: "16:51:03.491", level: "WARN", msg: "Slow query detected in connection pool (id=42)" },
        { time: "16:51:04.012", level: "INFO", msg: "Kafka consumer rebalance completed on topic: orders" }
      ]
    },
    htmlSnippet: `<div class="bt-term-box">
  <div class="bt-term-top">
    <span class="bt-term-dots"></span>
    <span class="bt-term-title">LIVE APPLICATION LOG STREAM</span>
  </div>
  <div class="bt-term-lines">
    {{#each log_lines}}
    <div class="bt-term-row">
      <span class="t-time">{{#if this.time}}{{this.time}}{{else}}--:--:--{{/if}}</span>
      <span class="t-level {{#if (eq this.level 'WARN')}}lvl-warn{{else if (eq this.level 'ERROR')}}lvl-err{{else}}lvl-info{{/if}}">[{{#if this.level}}{{this.level}}{{else}}LOG{{/if}}]</span>
      <span class="t-msg">{{#if this.msg}}{{this.msg}}{{else}}N/D{{/if}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssSnippet: `.bt-term-box {
  background: #030712;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
}
.bt-term-box .bt-term-top {
  display: flex; align-items: center; gap: 8px; margin-bottom: 8px; border-bottom: 1px solid #1f2937; padding-bottom: 6px;
}
.bt-term-box .bt-term-dots {
  width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px #22c55e;
}
.bt-term-box .bt-term-title { font-size: 10px; font-weight: 700; color: #6b7280; }
.bt-term-box .bt-term-lines { display: flex; flex-direction: column; gap: 4px; }
.bt-term-box .bt-term-row { display: flex; gap: 8px; }
.bt-term-box .t-time { color: #6b7280; }
.bt-term-box .lvl-info { color: #38bdf8; font-weight: 700; }
.bt-term-box .lvl-warn { color: #fbbf24; font-weight: 700; }
.bt-term-box .lvl-err { color: #ef4444; font-weight: 700; }
.bt-term-box .t-msg { color: #e5e7eb; }`
  }
];
