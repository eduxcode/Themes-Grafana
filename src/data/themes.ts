import { GrafanaTheme } from '../types';

export const PREBUILT_THEMES: GrafanaTheme[] = [
  {
    id: 'cyberpunk-hud',
    name: 'Cyberpunk HUD Neon',
    tagline: 'Glow elétrico, estética sci-fi e telemetria de alta densidade',
    description: 'Painel com estilo cibernético futurista, bordas iluminadas a néon ciano/magenta, status pills pulsantes e tipografia mono estilizada.',
    category: 'cyberpunk',
    accentColor: '#00f2fe',
    secondaryColor: '#fe0979',
    backgroundColor: '#0a0d14',
    textColor: '#e2e8f0',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    borderRadius: '8px',
    isDark: true,
    tags: ['Cyberpunk', 'Neon', 'HUD', 'Sci-Fi', 'DevOps'],
    recommendedFor: ['Kubernetes', 'Gaming Servers', 'Microservices', 'Live Event Ops'],
    dynamicVariables: [
      { name: 'cluster', description: 'Nome do Cluster ou Região', defaultValue: 'k8s-prod-sa-east-1' },
      { name: 'env', description: 'Ambiente de execução', defaultValue: 'production' },
      { name: 'refresh_rate', description: 'Taxa de polling', defaultValue: '5s' }
    ],
    mockData: {
      cluster_name: "CYBER-NODE-X9",
      status: "OPERATIONAL",
      uptime: "99.98%",
      tps: 4820,
      tps_trend: "+14.2%",
      latency_p99: "18.4ms",
      cpu_usage: 68.4,
      memory_usage: 81.2,
      error_rate: "0.002%",
      active_nodes: [
        { name: "pod-auth-01", status: "HEALTHY", cpu: 42, mem: "1.2GB", ping: "8ms" },
        { name: "pod-stream-02", status: "HEALTHY", cpu: 78, mem: "3.8GB", ping: "14ms" },
        { name: "pod-payment-09", status: "WARN", cpu: 91, mem: "5.4GB", ping: "45ms" },
        { name: "pod-cache-04", status: "HEALTHY", cpu: 33, mem: "8.1GB", ping: "4ms" }
      ]
    },
    htmlContent: `<div class="cyber-hud-container">
  <!-- Top Header Bar -->
  <div class="cyber-header">
    <div class="cyber-title-group">
      <span class="cyber-badge-live"><span class="pulse-dot"></span> LIVE TELEMETRY</span>
      <h2 class="cyber-title">\${cluster} // {{cluster_name}}</h2>
      <span class="cyber-env-tag">ENV: \${env}</span>
    </div>
    <div class="cyber-status-badge {{#if (eq status 'OPERATIONAL')}}status-ok{{else}}status-crit{{/if}}">
      {{status}}
    </div>
  </div>

  <!-- KPI Metric Matrix -->
  <div class="cyber-grid-kpis">
    <div class="cyber-card">
      <div class="cyber-card-label">THROUGHPUT (TPS)</div>
      <div class="cyber-card-val text-cyan">{{tps}} <span class="cyber-unit">req/s</span></div>
      <div class="cyber-trend-up">▲ {{tps_trend}} vs 1h</div>
      <div class="cyber-glow-bar bar-cyan"></div>
    </div>

    <div class="cyber-card">
      <div class="cyber-card-label">LATENCY P99</div>
      <div class="cyber-card-val text-pink">{{latency_p99}}</div>
      <div class="cyber-subtext">SLA Target &lt; 50ms</div>
      <div class="cyber-glow-bar bar-pink"></div>
    </div>

    <div class="cyber-card">
      <div class="cyber-card-label">CPU LOAD</div>
      <div class="cyber-card-val text-amber">{{cpu_usage}}%</div>
      <div class="cyber-progress-track">
        <div class="cyber-progress-fill" style="width: {{cpu_usage}}%"></div>
      </div>
      <div class="cyber-glow-bar bar-amber"></div>
    </div>

    <div class="cyber-card">
      <div class="cyber-card-label">MEMORY CLUSTER</div>
      <div class="cyber-card-val text-purple">{{memory_usage}}%</div>
      <div class="cyber-progress-track">
        <div class="cyber-progress-fill fill-purple" style="width: {{memory_usage}}%"></div>
      </div>
      <div class="cyber-glow-bar bar-purple"></div>
    </div>
  </div>

  <!-- Active Pods Table -->
  <div class="cyber-table-wrapper">
    <div class="cyber-table-header">
      <span>CONTAINER / POD ID</span>
      <span>STATUS</span>
      <span>CPU</span>
      <span>MEM</span>
      <span>PING</span>
    </div>
    <div class="cyber-table-body">
      {{#each active_nodes}}
      <div class="cyber-table-row">
        <span class="row-pod-id">◈ {{this.name}}</span>
        <span>
          <span class="cyber-pill {{#if (eq this.status 'HEALTHY')}}pill-green{{else}}pill-amber{{/if}}">
            {{this.status}}
          </span>
        </span>
        <span class="text-cyan">{{this.cpu}}%</span>
        <span>{{this.mem}}</span>
        <span class="text-pink">{{this.ping}}</span>
      </div>
      {{/each}}
    </div>
  </div>
</div>`,
    cssContent: `.cyber-hud-container {
  background: radial-gradient(circle at 10% 20%, rgba(0, 242, 254, 0.05) 0%, rgba(10, 13, 20, 0.95) 90%), #07090e;
  border: 1px solid rgba(0, 242, 254, 0.25);
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: #e2e8f0;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.08), inset 0 0 15px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
}

.cyber-hud-container::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #00f2fe, #fe0979, transparent);
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(0, 242, 254, 0.2);
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.cyber-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cyber-badge-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 242, 254, 0.1);
  border: 1px solid rgba(0, 242, 254, 0.4);
  color: #00f2fe;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 8px #00f2fe;
  animation: pulseAnim 1.5s infinite;
}

@keyframes pulseAnim {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
  100% { opacity: 1; transform: scale(1); }
}

.cyber-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
}

.cyber-env-tag {
  background: rgba(254, 9, 121, 0.12);
  border: 1px solid rgba(254, 9, 121, 0.4);
  color: #fe0979;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
}

.cyber-status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
}

.status-ok {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  color: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.25);
}

.cyber-grid-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.cyber-card {
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.cyber-card-label {
  font-size: 10px;
  letter-spacing: 1px;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 4px;
}

.cyber-card-val {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.cyber-unit {
  font-size: 11px;
  font-weight: 400;
  color: #64748b;
}

.text-cyan { color: #00f2fe; text-shadow: 0 0 8px rgba(0, 242, 254, 0.3); }
.text-pink { color: #fe0979; text-shadow: 0 0 8px rgba(254, 9, 121, 0.3); }
.text-amber { color: #f59e0b; }
.text-purple { color: #a855f7; }

.cyber-trend-up {
  font-size: 11px;
  color: #10b981;
  margin-top: 4px;
}

.cyber-subtext {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
}

.cyber-progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.cyber-progress-fill {
  height: 100%;
  background: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.fill-purple {
  background: #a855f7;
  box-shadow: 0 0 8px #a855f7;
}

.cyber-glow-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
}
.bar-cyan { background: #00f2fe; }
.bar-pink { background: #fe0979; }
.bar-amber { background: #f59e0b; }
.bar-purple { background: #a855f7; }

.cyber-table-wrapper {
  background: rgba(10, 15, 26, 0.8);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 6px;
  overflow: hidden;
}

.cyber-table-header {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr;
  padding: 8px 12px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
}

.cyber-table-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr 1fr;
  padding: 8px 12px;
  font-size: 12px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.cyber-table-row:last-child {
  border-bottom: none;
}

.row-pod-id {
  font-weight: 600;
  color: #cbd5e1;
}

.cyber-pill {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}

.pill-green {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.pill-amber {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}`
  },
  {
    id: 'glassmorphism-frost',
    name: 'Glassmorphic Frost UI',
    tagline: 'Vidro fosco refinado, bordas translúcidas e estética Apple / macOS',
    description: 'Interface ultra elegante com efeito de vidro frosted, desfoque de fundo avançado, gradientes suaves e hierarquia visual perfeita para dashboards executivos.',
    category: 'glassmorphism',
    accentColor: '#38bdf8',
    secondaryColor: '#818cf8',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    borderRadius: '12px',
    isDark: true,
    tags: ['Glassmorphic', 'Frost', 'Modern', 'Executive', 'SaaS'],
    recommendedFor: ['Executive Overview', 'SaaS Metrics', 'Financial KPIs', 'Cloud Spend'],
    dynamicVariables: [
      { name: 'service_region', description: 'Região Cloud', defaultValue: 'us-east-1 (N. Virginia)' },
      { name: 'timeframe', description: 'Janela de Análise', defaultValue: 'Últimas 24 horas' }
    ],
    mockData: {
      tenant_name: "FinTech Cloud Gateway",
      global_status: "Operational",
      total_volume: "$1,482,900",
      volume_change: "+18.4%",
      success_rate: "99.94%",
      p95_latency: "32ms",
      active_connections: "48,210",
      services: [
        { name: "Payment Core Engine", status: "Healthy", tps: "3,120", latency: "14ms", load: "42%" },
        { name: "Fraud Detection AI", status: "Healthy", tps: "3,118", latency: "8ms", load: "61%" },
        { name: "Webhook Dispatcher", status: "Degraded", tps: "840", latency: "112ms", load: "89%" },
        { name: "Banking Ledger Sync", status: "Healthy", tps: "410", latency: "24ms", load: "34%" }
      ]
    },
    htmlContent: `<div class="glass-frost-card">
  <!-- Top Navigation & Title -->
  <div class="glass-topbar">
    <div class="glass-brand">
      <div class="glass-icon-box">
        <span class="glass-dot"></span>
      </div>
      <div>
        <h3 class="glass-title">{{tenant_name}}</h3>
        <p class="glass-subtitle">\${service_region} • \${timeframe}</p>
      </div>
    </div>
    <div class="glass-tag-badge">
      <span class="badge-ring"></span> {{global_status}}
    </div>
  </div>

  <!-- Key Metrics Bento Grid -->
  <div class="glass-bento-grid">
    <div class="glass-metric-card primary-gradient">
      <span class="glass-label">VOLUME TOTAL PROCESSADO</span>
      <div class="glass-stat">{{total_volume}}</div>
      <div class="glass-delta-positive">▲ {{volume_change}} <span>vs ontem</span></div>
    </div>

    <div class="glass-metric-card">
      <span class="glass-label">TAXA DE SUCESSO</span>
      <div class="glass-stat text-emerald">{{success_rate}}</div>
      <span class="glass-caption">Target SLA: 99.9%</span>
    </div>

    <div class="glass-metric-card">
      <span class="glass-label">LATÊNCIA P95</span>
      <div class="glass-stat text-sky">{{p95_latency}}</div>
      <span class="glass-caption">Edge Response Time</span>
    </div>

    <div class="glass-metric-card">
      <span class="glass-label">CONEXÕES ATIVAS</span>
      <div class="glass-stat text-indigo">{{active_connections}}</div>
      <span class="glass-caption">WebSockets &amp; HTTP/2</span>
    </div>
  </div>

  <!-- Microservices Health List -->
  <div class="glass-list-section">
    <div class="glass-section-title">STATUS DOS MICROSSERVIÇOS</div>
    <div class="glass-list-rows">
      {{#each services}}
      <div class="glass-row">
        <div class="glass-row-info">
          <span class="glass-status-indicator {{#if (eq this.status 'Healthy')}}ind-green{{else}}ind-amber{{/if}}"></span>
          <span class="glass-row-name">{{this.name}}</span>
        </div>
        <div class="glass-row-stats">
          <span class="stat-pill">{{this.tps}} req/s</span>
          <span class="stat-pill text-sky">{{this.latency}}</span>
          <span class="stat-pill text-indigo">Load {{this.load}}</span>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
</div>`,
    cssContent: `.glass-frost-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 18px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  color: #f8fafc;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15);
}

.glass-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 16px;
}

.glass-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.glass-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
}

.glass-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
}

.glass-subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #94a3b8;
}

.glass-tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.badge-ring {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
}

.glass-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.glass-metric-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.glass-metric-card:hover {
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

.primary-gradient {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.04));
  border-color: rgba(56, 189, 248, 0.2);
}

.glass-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.glass-stat {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #ffffff;
}

.text-emerald { color: #34d399; }
.text-sky { color: #38bdf8; }
.text-indigo { color: #a5b4fc; }

.glass-delta-positive {
  font-size: 12px;
  font-weight: 600;
  color: #34d399;
  margin-top: 4px;
}

.glass-delta-positive span {
  color: #64748b;
  font-weight: 400;
}

.glass-caption {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
}

.glass-list-section {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
}

.glass-section-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #64748b;
  margin-bottom: 10px;
}

.glass-list-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.glass-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.glass-row-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.glass-status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ind-green { background: #34d399; box-shadow: 0 0 6px #34d399; }
.ind-amber { background: #fbbf24; box-shadow: 0 0 6px #fbbf24; }

.glass-row-name {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.glass-row-stats {
  display: flex;
  gap: 8px;
}

.stat-pill {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
  color: #cbd5e1;
}`
  },
  {
    id: 'enterprise-slate',
    name: 'Enterprise Swiss Slate',
    tagline: 'Máxima densidade, sobriedade corporativa e legibilidade suíça',
    description: 'Design limpo, de alto contraste e foco total na informação pura. Ideal para NOCs corporativos, auditorias, relatórios regulatórios e infraestrutura crítica.',
    category: 'enterprise',
    accentColor: '#3b82f6',
    secondaryColor: '#64748b',
    backgroundColor: '#0b0f19',
    textColor: '#f1f5f9',
    fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    borderRadius: '6px',
    isDark: true,
    tags: ['Enterprise', 'Corporate', 'Clean', 'NOC', 'Minimal'],
    recommendedFor: ['PostgreSQL', 'Oracle DB', 'Enterprise Networks', 'Compliance Dashboards'],
    dynamicVariables: [
      { name: 'datacenter', description: 'Data Center ID', defaultValue: 'DC-SA-01' },
      { name: 'tier', description: 'Nível de Criticidade', defaultValue: 'Tier-1 Critical' }
    ],
    mockData: {
      dc_title: "Central Core Gateway",
      nodes_online: "48/48",
      avg_cpu: "38.2%",
      network_in: "12.4 Gbps",
      network_out: "18.9 Gbps",
      active_incidents: 0,
      sla_month: "99.998%",
      nodes: [
        { host: "node-core-01", role: "Primary DB", ip: "10.0.1.14", load: "1.42", temp: "42°C", state: "OK" },
        { host: "node-core-02", role: "Replica Standby", ip: "10.0.1.15", load: "0.88", temp: "39°C", state: "OK" },
        { host: "node-edge-01", role: "BGP Router", ip: "10.0.2.1", load: "2.10", temp: "45°C", state: "OK" }
      ]
    },
    htmlContent: `<div class="swiss-container">
  <div class="swiss-header">
    <div>
      <span class="swiss-badge">\${datacenter} • \${tier}</span>
      <h2 class="swiss-h2">{{dc_title}}</h2>
    </div>
    <div class="swiss-incidents {{#if (eq active_incidents 0)}}incidents-clean{{else}}incidents-alert{{/if}}">
      {{#if (eq active_incidents 0)}}
      ● ZERO INCIDENTES ATIVOS
      {{else}}
      ▲ {{active_incidents}} ALERTA PENDENTE
      {{/if}}
    </div>
  </div>

  <div class="swiss-stat-row">
    <div class="swiss-cell">
      <div class="cell-label">SISTEMAS ONLINE</div>
      <div class="cell-number text-blue">{{nodes_online}}</div>
      <div class="cell-sub">100% Capacidade</div>
    </div>
    <div class="swiss-cell">
      <div class="cell-label">CPU MÉDIA</div>
      <div class="cell-number">{{avg_cpu}}</div>
      <div class="cell-sub">Estável &lt; 70%</div>
    </div>
    <div class="swiss-cell">
      <div class="cell-label">TRÁFEGO IN / OUT</div>
      <div class="cell-number">{{network_in}}</div>
      <div class="cell-sub">OUT: {{network_out}}</div>
    </div>
    <div class="swiss-cell">
      <div class="cell-label">SLA MENSAL</div>
      <div class="cell-number text-emerald">{{sla_month}}</div>
      <div class="cell-sub">Meta 99.95%</div>
    </div>
  </div>

  <table class="swiss-table">
    <thead>
      <tr>
        <th>HOSTNAME</th>
        <th>FUNÇÃO</th>
        <th>ENDEREÇO IP</th>
        <th>LOAD AVG</th>
        <th>TEMP</th>
        <th>ESTADO</th>
      </tr>
    </thead>
    <tbody>
      {{#each nodes}}
      <tr>
        <td class="font-bold">{{this.host}}</td>
        <td><span class="role-tag">{{this.role}}</span></td>
        <td class="font-mono">{{this.ip}}</td>
        <td>{{this.load}}</td>
        <td>{{this.temp}}</td>
        <td><span class="swiss-ok-badge">{{this.state}}</span></td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</div>`,
    cssContent: `.swiss-container {
  background: #0d121f;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 16px;
  font-family: 'Outfit', sans-serif;
  color: #f1f5f9;
}

.swiss-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #1e293b;
}

.swiss-badge {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.swiss-h2 {
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}

.swiss-incidents {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 4px;
}

.incidents-clean {
  background: #064e3b;
  color: #34d399;
}

.swiss-stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  background: #1e293b;
  border: 1px solid #1e293b;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.swiss-cell {
  background: #0f172a;
  padding: 12px;
}

.cell-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.5px;
}

.cell-number {
  font-size: 20px;
  font-weight: 800;
  margin: 4px 0 2px 0;
}

.cell-sub {
  font-size: 11px;
  color: #94a3b8;
}

.text-blue { color: #38bdf8; }
.text-emerald { color: #34d399; }

.swiss-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.swiss-table th {
  text-align: left;
  padding: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  border-bottom: 1px solid #1e293b;
}

.swiss-table td {
  padding: 8px;
  border-bottom: 1px solid #1e293b;
}

.font-bold { font-weight: 600; color: #fff; }
.font-mono { font-family: monospace; color: #94a3b8; }

.role-tag {
  background: #1e293b;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  color: #cbd5e1;
}

.swiss-ok-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
}`
  },
  {
    id: 'terminal-matrix',
    name: 'Retro CRT Terminal Matrix',
    tagline: 'Fósforo verde, scanlines CRT e estética de hacker clássico',
    description: 'Painel com efeito de monitor de tubo de raios catódicos vintage, tipografia de terminal verde esmeralda, bordas ASCII e scanlines animadas.',
    category: 'terminal',
    accentColor: '#22c55e',
    secondaryColor: '#15803d',
    backgroundColor: '#020b05',
    textColor: '#86efac',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    borderRadius: '4px',
    isDark: true,
    tags: ['Retro', 'CRT', 'Matrix', 'Terminal', 'Monochrome'],
    recommendedFor: ['Linux Sysadmin', 'Security Operations', 'SSH Sessions', 'Database Logs'],
    dynamicVariables: [
      { name: 'server_host', description: 'Servidor Alvo', defaultValue: 'srv-matrix-core-01' },
      { name: 'kernel', description: 'Versão do Kernel', defaultValue: 'Linux 6.8.0-45-generic' }
    ],
    mockData: {
      sys_time: "2026-08-31 16:48:02 UTC",
      load_avg: "0.45, 0.62, 0.78",
      processes_total: 218,
      tasks_running: 3,
      mem_total: "32768 MB",
      mem_used: "14210 MB",
      disk_root: "42% [/dev/nvme0n1p2]",
      journal_logs: [
        "[16:47:59] nginx.service: Active (running) since 14 days 2h",
        "[16:48:00] postgresql@16-main: CHECKPOINT completed in 1.4s",
        "[16:48:01] kernel: [UFW BLOCK] IN=eth0 OUT= SRC=185.220.101.4 PROTO=TCP DPT=22",
        "[16:48:02] systemd[1]: Reached target Slices & Network Sockets."
      ]
    },
    htmlContent: `<div class="crt-terminal-screen">
  <div class="crt-scanline"></div>
  
  <div class="crt-header">
    <span class="crt-prompt">&gt; ROOT@\${server_host}:~# uname -r</span>
    <span class="crt-cursor">_</span>
    <div class="crt-time">\${kernel} • {{sys_time}}</div>
  </div>

  <div class="crt-box-stats">
    <div class="crt-stat-line">
      <span class="crt-lbl">LOAD AVERAGE:</span> <span class="crt-val">{{load_avg}}</span>
    </div>
    <div class="crt-stat-line">
      <span class="crt-lbl">MEMORY:</span> <span class="crt-val">{{mem_used}} / {{mem_total}}</span>
    </div>
    <div class="crt-stat-line">
      <span class="crt-lbl">STORAGE:</span> <span class="crt-val">{{disk_root}}</span>
    </div>
    <div class="crt-stat-line">
      <span class="crt-lbl">PROCESSES:</span> <span class="crt-val">{{processes_total}} total, {{tasks_running}} running</span>
    </div>
  </div>

  <div class="crt-log-box">
    <div class="crt-log-title">[ SYSTEM JOURNAL STREAM - REALTIME ]</div>
    {{#each journal_logs}}
    <div class="crt-log-entry">{{this}}</div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.crt-terminal-screen {
  background: #020b05;
  border: 2px solid #22c55e;
  border-radius: 4px;
  padding: 14px;
  font-family: 'Fira Code', 'Courier New', monospace;
  color: #86efac;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.8);
}

.crt-scanline {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.7;
}

.crt-header {
  font-size: 13px;
  margin-bottom: 12px;
  border-bottom: 1px solid #15803d;
  padding-bottom: 8px;
}

.crt-prompt {
  color: #4ade80;
  font-weight: 700;
}

.crt-cursor {
  animation: crtBlink 1s infinite;
}

@keyframes crtBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.crt-time {
  font-size: 10px;
  color: #15803d;
  margin-top: 2px;
}

.crt-box-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  background: rgba(34, 197, 94, 0.05);
  border: 1px dashed #15803d;
  padding: 10px;
  margin-bottom: 12px;
}

.crt-stat-line {
  font-size: 11px;
}

.crt-lbl {
  color: #22c55e;
  font-weight: 700;
}

.crt-val {
  color: #bbf7d0;
}

.crt-log-box {
  background: #010502;
  border: 1px solid #166534;
  padding: 10px;
  font-size: 11px;
}

.crt-log-title {
  color: #4ade80;
  font-weight: 700;
  margin-bottom: 6px;
  border-bottom: 1px solid #14532d;
  padding-bottom: 4px;
}

.crt-log-entry {
  color: #86efac;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
}`
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Amber Luxury',
    tagline: 'Preto ônix profundo com toques de ouro champanhe e acabamento premium',
    description: 'Design de luxo para dashboards de alto escalão, faturamento financeiro e relatórios executivos com estética sombria e refinada.',
    category: 'dark-luxury',
    accentColor: '#f59e0b',
    secondaryColor: '#d97706',
    backgroundColor: '#09090b',
    textColor: '#fef3c7',
    fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    borderRadius: '10px',
    isDark: true,
    tags: ['Luxury', 'Gold', 'Amber', 'Obsidian', 'Dark'],
    recommendedFor: ['Financial Dashboards', 'Stripe Billing', 'Crypto Assets', 'Executive C-Level'],
    dynamicVariables: [
      { name: 'currency', description: 'Moeda Principal', defaultValue: 'BRL (R$)' },
      { name: 'org_division', description: 'Divisão Corporativa', defaultValue: 'Enterprise Tech' }
    ],
    mockData: {
      mrr_value: "R$ 482.950",
      mrr_growth: "+22.4%",
      arr_projected: "R$ 5.79M",
      active_subscribers: "1,248",
      churn_rate: "0.42%",
      top_plans: [
        { name: "Enterprise Dedicated Tier", revenue: "R$ 290.000", clients: 24, share: "60%" },
        { name: "Pro Team Scale", revenue: "R$ 145.500", clients: 410, share: "30%" },
        { name: "Starter Core", revenue: "R$ 47.450", clients: 814, share: "10%" }
      ]
    },
    htmlContent: `<div class="obsidian-panel">
  <div class="obsidian-header">
    <div>
      <div class="obsidian-kicker">EXECUTIVE REVENUE OVERVIEW • \${org_division}</div>
      <h2 class="obsidian-title">Receita Recorrente Mensal (MRR)</h2>
    </div>
    <div class="obsidian-currency-pill">\${currency}</div>
  </div>

  <div class="obsidian-grid">
    <div class="obsidian-card highlight-gold">
      <span class="card-tag">MRR CONSOLIDADO</span>
      <div class="obsidian-big-num">{{mrr_value}}</div>
      <div class="obsidian-trend">▲ {{mrr_growth}} MoM</div>
    </div>

    <div class="obsidian-card">
      <span class="card-tag">ARR PROJETADO</span>
      <div class="obsidian-big-num text-amber">{{arr_projected}}</div>
      <div class="card-sub">Base anualizada</div>
    </div>

    <div class="obsidian-card">
      <span class="card-tag">ASSINANTES ATIVOS</span>
      <div class="obsidian-big-num">{{active_subscribers}}</div>
      <div class="card-sub">Churn: {{churn_rate}}</div>
    </div>
  </div>

  <div class="obsidian-tiers">
    <div class="tier-head">DISTRIBUIÇÃO POR PLANO</div>
    {{#each top_plans}}
    <div class="tier-row">
      <span class="tier-name">{{this.name}}</span>
      <span class="tier-clients">{{this.clients}} clientes</span>
      <span class="tier-rev">{{this.revenue}}</span>
      <span class="tier-badge">{{this.share}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.obsidian-panel {
  background: radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.06), rgba(9, 9, 11, 0.98) 70%), #070709;
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 10px;
  padding: 18px;
  font-family: 'Outfit', sans-serif;
  color: #fef3c7;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.obsidian-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(245, 158, 11, 0.15);
}

.obsidian-kicker {
  font-size: 10px;
  font-weight: 700;
  color: #d97706;
  letter-spacing: 1px;
}

.obsidian-title {
  margin: 2px 0 0 0;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.obsidian-currency-pill {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #f59e0b;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}

.obsidian-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.obsidian-card {
  background: rgba(20, 20, 25, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 14px;
}

.highlight-gold {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(20, 20, 25, 0.8));
  border-color: rgba(245, 158, 11, 0.35);
}

.card-tag {
  font-size: 10px;
  font-weight: 700;
  color: #92400e;
  letter-spacing: 0.8px;
}

.obsidian-big-num {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin: 4px 0;
}

.text-amber { color: #f59e0b; }

.obsidian-trend {
  font-size: 12px;
  font-weight: 700;
  color: #10b981;
}

.card-sub {
  font-size: 11px;
  color: #78716c;
}

.obsidian-tiers {
  background: rgba(15, 15, 18, 0.6);
  border: 1px solid rgba(245, 158, 11, 0.1);
  border-radius: 6px;
  padding: 12px;
}

.tier-head {
  font-size: 10px;
  font-weight: 700;
  color: #d97706;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}

.tier-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 12px;
}

.tier-row:last-child {
  border-bottom: none;
}

.tier-name { color: #f5f5f4; font-weight: 600; }
.tier-clients { color: #a8a29e; }
.tier-rev { color: #f59e0b; font-weight: 700; }
.tier-badge {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
}`
  },
  {
    id: 'nordic-aurora',
    name: 'Nordic Aurora Teal',
    tagline: 'Tons de gelo polar, gradiente aurora boreal e alto contraste',
    description: 'Estética nórdica moderna com tons de azul marinho profundo, verde-azulado aurora e linhas elegantes.',
    category: 'aurora',
    accentColor: '#2dd4bf',
    secondaryColor: '#38bdf8',
    backgroundColor: '#07131b',
    textColor: '#e0f2fe',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    borderRadius: '12px',
    isDark: true,
    tags: ['Aurora', 'Nordic', 'Teal', 'Clean', 'Modern'],
    recommendedFor: ['Network Operations', 'Edge Caching', 'Cloudflare Analytics'],
    dynamicVariables: [
      { name: 'cdn_zone', description: 'Zona Cloudflare', defaultValue: 'app.empresa.com.br' }
    ],
    mockData: {
      cached_requests: "89.4%",
      bandwidth_saved: "4.8 TB",
      threats_blocked: "1,420",
      origin_response_time: "48ms"
    },
    htmlContent: `<div class="aurora-panel">
  <div class="aurora-header">
    <span class="aurora-glow-dot"></span>
    <h3 class="aurora-title">Edge Acceleration // \${cdn_zone}</h3>
  </div>
  <div class="aurora-grid">
    <div class="aurora-metric">
      <div class="aurora-lbl">HIT RATIO (CACHE)</div>
      <div class="aurora-val text-teal">{{cached_requests}}</div>
    </div>
    <div class="aurora-metric">
      <div class="aurora-lbl">BANDWIDTH ECONOMIZADO</div>
      <div class="aurora-val text-sky">{{bandwidth_saved}}</div>
    </div>
    <div class="aurora-metric">
      <div class="aurora-lbl">AMEAÇAS BLOQUEADAS</div>
      <div class="aurora-val text-violet">{{threats_blocked}}</div>
    </div>
    <div class="aurora-metric">
      <div class="aurora-lbl">ORIGIN LATENCY</div>
      <div class="aurora-val text-teal">{{origin_response_time}}</div>
    </div>
  </div>
</div>`,
    cssContent: `.aurora-panel {
  background: radial-gradient(ellipse at top right, rgba(45, 212, 191, 0.15), rgba(7, 19, 27, 0.95) 70%), #050d13;
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 12px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #e0f2fe;
}
.aurora-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.aurora-glow-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 10px #2dd4bf;
}
.aurora-title { margin: 0; font-size: 15px; font-weight: 700; color: #fff; }
.aurora-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}
.aurora-metric {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(45, 212, 191, 0.15);
  border-radius: 8px;
  padding: 12px;
}
.aurora-lbl { font-size: 10px; font-weight: 700; color: #7dd3fc; }
.aurora-val { font-size: 20px; font-weight: 800; margin-top: 4px; }
.text-teal { color: #2dd4bf; }
.text-sky { color: #38bdf8; }
.text-violet { color: #a78bfa; }`
  },
  {
    id: 'tactical-military-hud',
    name: 'Tactical Aerospace & Defense HUD',
    tagline: 'Retículo de mira vetorial, horizonte artificial, pitch ladder e telemetria militar',
    description: 'Interface tática de nível militar inspirada em cockpits de caças stealth de 5ª geração. Inclui mira vetorial animada, escalas de altitude/velocidade, pitch ladder e indicadores IFF (amigo/inimigo).',
    category: 'tactical-hud',
    accentColor: '#10b981',
    secondaryColor: '#f59e0b',
    backgroundColor: '#030a06',
    textColor: '#a7f3d0',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    borderRadius: '2px',
    isDark: true,
    tags: ['Tactical', 'Military', 'Aerospace', 'HUD', 'Defense', 'IoT Telemetry'],
    recommendedFor: ['Drone Fleets', 'IoT Satellite Links', 'Mission Critical Ops', 'Robotics Telemetry'],
    dynamicVariables: [
      { name: 'callsign', description: 'Callsign da Unidade / Drone', defaultValue: 'VIPER-04' },
      { name: 'mission_grid', description: 'Coordenadas de Missão (MGRS)', defaultValue: '31U DQ 4821 9912' },
      { name: 'radar_mode', description: 'Modo do Radar', defaultValue: 'AESA-TRACK-LOCK' }
    ],
    mockData: {
      target_lock: "ENGAGED // TARGET-ALPHA",
      alt_feet: "34,850 FT",
      mach_speed: "MACH 1.84",
      g_force: "+4.2 G",
      heading: "042° NNE",
      fuel_pct: 78,
      ammo_count: "8 / 8 AIM-120D",
      iff_status: "IFF CONFIRMED FRIENDLY",
      radar_targets: [
        { id: "TGT-01", type: "SU-57", dist: "42.1 NM", brg: "038°", alt: "28k", status: "HOSTILE" },
        { id: "TGT-02", type: "AN-124", dist: "78.4 NM", brg: "112°", alt: "32k", status: "NEUTRAL" },
        { id: "TGT-03", type: "WINGMAN", dist: "2.4 NM", brg: "270°", alt: "35k", status: "FRIENDLY" }
      ]
    },
    htmlContent: `<div class="tac-hud-canvas">
  <!-- Corner Tactical Brackets -->
  <div class="tac-corner-tl"></div>
  <div class="tac-corner-tr"></div>
  <div class="tac-corner-bl"></div>
  <div class="tac-corner-br"></div>

  <!-- Top Tactical Telemetry Header -->
  <div class="tac-header">
    <div class="tac-unit-box">
      <span class="tac-rec-blink">● ARMED</span>
      <span class="tac-callsign">UNIT: \${callsign}</span>
      <span class="tac-grid-tag">GRID: \${mission_grid}</span>
    </div>
    <div class="tac-radar-status">
      <span class="tac-radar-label">RADAR:</span>
      <span class="tac-radar-val">\${radar_mode}</span>
    </div>
  </div>

  <!-- Central HUD Flight & Combat Display -->
  <div class="tac-hud-center">
    <!-- Left Scale: Airspeed / Mach -->
    <div class="tac-ladder-left">
      <div class="tac-scale-title">SPD // IAS</div>
      <div class="tac-ladder-ticks">
        <span>650</span>
        <span>600</span>
        <span class="tac-cur-tick">► 580 KT</span>
        <span>550</span>
        <span>500</span>
      </div>
      <div class="tac-box-val text-green">{{mach_speed}}</div>
    </div>

    <!-- Center Reticle & Artificial Pitch Ladder -->
    <div class="tac-reticle-zone">
      <div class="tac-reticle-circle">
        <div class="tac-crosshair-h"></div>
        <div class="tac-crosshair-v"></div>
        <div class="tac-pitch-bar bar-pos">+10 ─── ─── +10</div>
        <div class="tac-pitch-bar bar-zero">─── [ 0° ] ───</div>
        <div class="tac-pitch-bar bar-neg">-10 - - - - - - -10</div>
      </div>
      <div class="tac-target-box">
        <span class="tac-lock-text">{{target_lock}}</span>
        <span class="tac-heading-text">HDG: {{heading}} • {{g_force}}</span>
      </div>
    </div>

    <!-- Right Scale: Altitude (FT) -->
    <div class="tac-ladder-right">
      <div class="tac-scale-title">ALT // BARO</div>
      <div class="tac-ladder-ticks">
        <span>36,000</span>
        <span>35,500</span>
        <span class="tac-cur-tick">34,850 ◄</span>
        <span>34,000</span>
        <span>33,500</span>
      </div>
      <div class="tac-box-val text-amber">{{alt_feet}}</div>
    </div>
  </div>

  <!-- Bottom Weaponry & Radar Targets Track -->
  <div class="tac-bottom-grid">
    <div class="tac-status-card">
      <div class="tac-card-label">FUEL CAPACITY</div>
      <div class="tac-fuel-bar">
        <div class="tac-fuel-fill" style="width: {{fuel_pct}}%"></div>
      </div>
      <div class="tac-fuel-sub">{{fuel_pct}}% REMAINING • BINGO 25%</div>
    </div>

    <div class="tac-status-card">
      <div class="tac-card-label">STORES &amp; ORDNANCE</div>
      <div class="tac-val-ord">{{ammo_count}}</div>
      <div class="tac-iff-badge">{{iff_status}}</div>
    </div>
  </div>

  <!-- Contact Matrix -->
  <div class="tac-contacts-table">
    <div class="tac-c-head">
      <span>TRACK ID</span>
      <span>TYPE</span>
      <span>DISTANCE</span>
      <span>BEARING</span>
      <span>ALT</span>
      <span>CLASSIFICATION</span>
    </div>
    {{#each radar_targets}}
    <div class="tac-c-row">
      <span class="font-bold">{{this.id}}</span>
      <span>{{this.type}}</span>
      <span>{{this.dist}}</span>
      <span>{{this.brg}}</span>
      <span>{{this.alt}}</span>
      <span>
        <span class="tac-class-pill {{#if (eq this.status 'HOSTILE')}}pill-hostile{{else if (eq this.status 'FRIENDLY')}}pill-friendly{{else}}pill-neutral{{/if}}">
          {{this.status}}
        </span>
      </span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.tac-hud-canvas {
  background: radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.08) 0%, rgba(3, 10, 6, 0.98) 85%), #020804;
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 2px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #a7f3d0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(16, 185, 129, 0.15);
}

.tac-corner-tl { position: absolute; top: 4px; left: 4px; width: 10px; height: 10px; border-top: 2px solid #10b981; border-left: 2px solid #10b981; }
.tac-corner-tr { position: absolute; top: 4px; right: 4px; width: 10px; height: 10px; border-top: 2px solid #10b981; border-right: 2px solid #10b981; }
.tac-corner-bl { position: absolute; bottom: 4px; left: 4px; width: 10px; height: 10px; border-bottom: 2px solid #10b981; border-left: 2px solid #10b981; }
.tac-corner-br { position: absolute; bottom: 4px; right: 4px; width: 10px; height: 10px; border-bottom: 2px solid #10b981; border-right: 2px solid #10b981; }

.tac-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(16, 185, 129, 0.25);
  padding-bottom: 8px;
  margin-bottom: 14px;
}

.tac-unit-box {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}

.tac-rec-blink {
  color: #ef4444;
  font-weight: 800;
  animation: tacBlink 1.2s infinite;
}

@keyframes tacBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.tac-callsign {
  color: #ffffff;
  font-weight: 800;
  background: rgba(16, 185, 129, 0.15);
  padding: 2px 6px;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.tac-grid-tag {
  color: #6ee7b7;
  font-size: 10px;
}

.tac-radar-status {
  font-size: 11px;
  font-weight: 700;
  color: #10b981;
}

.tac-hud-center {
  display: grid;
  grid-template-columns: 90px 1fr 90px;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
  padding: 10px 0;
  background: rgba(0, 0, 0, 0.35);
  border: 1px dashed rgba(16, 185, 129, 0.2);
}

.tac-ladder-left, .tac-ladder-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
}

.tac-scale-title {
  font-weight: 800;
  color: #059669;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.tac-ladder-ticks {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #047857;
  font-size: 9px;
}

.tac-cur-tick {
  color: #34d399 !important;
  font-weight: 800;
  font-size: 10px;
}

.tac-box-val {
  margin-top: 6px;
  font-weight: 800;
  font-size: 11px;
  padding: 2px 6px;
  border: 1px solid rgba(16, 185, 129, 0.4);
  background: rgba(0, 0, 0, 0.5);
}

.text-green { color: #34d399; }
.text-amber { color: #fbbf24; }

.tac-reticle-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.tac-reticle-circle {
  width: 130px;
  height: 130px;
  border: 1px dashed rgba(16, 185, 129, 0.5);
  border-radius: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}

.tac-crosshair-h {
  position: absolute;
  top: 50%; left: -10px; right: -10px; height: 1px;
  background: rgba(16, 185, 129, 0.3);
}

.tac-crosshair-v {
  position: absolute;
  left: 50%; top: -10px; bottom: -10px; width: 1px;
  background: rgba(16, 185, 129, 0.3);
}

.tac-pitch-bar {
  font-size: 9px;
  font-weight: 700;
  color: #34d399;
  letter-spacing: 0.5px;
  z-index: 2;
}

.tac-target-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.tac-lock-text {
  font-size: 11px;
  font-weight: 800;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  padding: 2px 8px;
  letter-spacing: 1px;
}

.tac-heading-text {
  font-size: 10px;
  color: #6ee7b7;
}

.tac-bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.tac-status-card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 8px 10px;
}

.tac-card-label {
  font-size: 9px;
  font-weight: 800;
  color: #059669;
  margin-bottom: 4px;
}

.tac-fuel-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.4);
  overflow: hidden;
}

.tac-fuel-fill {
  height: 100%;
  background: #10b981;
}

.tac-fuel-sub {
  font-size: 9px;
  color: #6ee7b7;
  margin-top: 4px;
}

.tac-val-ord {
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
}

.tac-iff-badge {
  font-size: 9px;
  color: #34d399;
  margin-top: 2px;
}

.tac-contacts-table {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-size: 10px;
}

.tac-c-head {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 1.2fr;
  padding: 6px 8px;
  font-weight: 800;
  color: #059669;
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  background: rgba(16, 185, 129, 0.05);
}

.tac-c-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 1.2fr;
  padding: 5px 8px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  align-items: center;
}

.tac-class-pill {
  padding: 1px 4px;
  font-weight: 800;
  font-size: 9px;
}

.pill-hostile { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
.pill-friendly { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #34d399; }
.pill-neutral { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #fbbf24; }`
  },
  {
    id: 'neo-tokyo-cyber',
    name: 'Neo-Tokyo Shinjuku Midnight',
    tagline: 'Letreiros neon japoneses, micro-densidade urbana e estética cyberpunk densa',
    description: 'Visual inspirado na metrópole cibernética de Tóquio. Utiliza tipografia kanji estilizada, avisos diagonais em magenta/ciano vibrantes, blocos assimétricos e telemetria de microsserviços de altíssima densidade.',
    category: 'neo-tokyo',
    accentColor: '#ff0055',
    secondaryColor: '#00ffff',
    backgroundColor: '#0a0912',
    textColor: '#f1f1f5',
    fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', sans-serif",
    borderRadius: '0px',
    isDark: true,
    tags: ['Neo-Tokyo', 'Cyberpunk', 'Kanji', 'HFT', 'High Density', 'Neon'],
    recommendedFor: ['High-Frequency Trading', 'Payment Gateway Routing', 'Global Edge Mesh', 'Tokyo Region Ops'],
    dynamicVariables: [
      { name: 'exchange', description: 'Exchange / Hub', defaultValue: 'TYO-EQUINIX-TY8' },
      { name: 'zone', description: 'Zona de Disponibilidade', defaultValue: 'ap-northeast-1a' }
    ],
    mockData: {
      gateway_status: "正常稼働中 (NORMAL)",
      orders_per_sec: "128,490",
      tick_latency_ns: "412ns",
      fill_ratio: "99.82%",
      matching_engine: "NINJA-CORE-V5",
      order_book_depth: "$42.8M",
      active_channels: [
        { pair: "USD/JPY-HFT", spread: "0.001", vol: "¥8.4B", status: "OPTIMAL", kanji: "優良" },
        { pair: "BTC/JPY-PERP", spread: "¥120", vol: "¥14.2B", status: "OPTIMAL", kanji: "優良" },
        { pair: "EUR/JPY-DIRECT", spread: "0.002", vol: "¥3.1B", status: "LOW_VOL", kanji: "注意" }
      ]
    },
    htmlContent: `<div class="tokyo-container">
  <!-- Tokyo Neon Banner Header -->
  <div class="tokyo-header">
    <div class="tokyo-brand">
      <span class="tokyo-kanji-title">新宿電網 // NEO-TOKYO</span>
      <h2 class="tokyo-title">\${exchange} <span>[\${zone}]</span></h2>
    </div>
    <div class="tokyo-status-badge">
      <span class="tokyo-pulse-magenta"></span>
      <span>{{gateway_status}}</span>
    </div>
  </div>

  <!-- Diagonal Warning Accent Bar -->
  <div class="tokyo-hazard-stripe"></div>

  <!-- Ultra High Density Metrics Grid -->
  <div class="tokyo-grid">
    <div class="tokyo-card border-magenta">
      <div class="tokyo-card-head">
        <span class="tokyo-kicker">注文頻度 (ORDERS/SEC)</span>
        <span class="tokyo-badge-mini">LIVE</span>
      </div>
      <div class="tokyo-big-val text-magenta">{{orders_per_sec}} <span class="tokyo-unit">ops</span></div>
      <div class="tokyo-sub-text">Matching Engine: {{matching_engine}}</div>
    </div>

    <div class="tokyo-card border-cyan">
      <div class="tokyo-card-head">
        <span class="tokyo-kicker">超低遅延 (P99.9 LATENCY)</span>
        <span class="tokyo-badge-cyan">ASIC</span>
      </div>
      <div class="tokyo-big-val text-cyan">{{tick_latency_ns}}</div>
      <div class="tokyo-sub-text">Direct Fiber Interconnect</div>
    </div>

    <div class="tokyo-card border-purple">
      <div class="tokyo-card-head">
        <span class="tokyo-kicker">約定率 (FILL RATIO)</span>
        <span class="tokyo-badge-purple">99.8%</span>
      </div>
      <div class="tokyo-big-val text-purple">{{fill_ratio}}</div>
      <div class="tokyo-sub-text">Depth Book: {{order_book_depth}}</div>
    </div>
  </div>

  <!-- Shinjuku Order Routing Matrix -->
  <div class="tokyo-table-box">
    <div class="tokyo-table-title">
      <span>通貨ペア / 注文ルーティング (ACTIVE PAIR ROUTING)</span>
      <span class="tokyo-table-tag">TOKYO ENGINE TY-8</span>
    </div>
    <div class="tokyo-table">
      <div class="tokyo-t-head">
        <span>TRADING PAIR</span>
        <span>SPREAD</span>
        <span>24H VOLUME</span>
        <span>STATUS</span>
        <span>状態判定</span>
      </div>
      {{#each active_channels}}
      <div class="tokyo-t-row">
        <span class="font-bold text-white">◈ {{this.pair}}</span>
        <span class="text-cyan font-mono">{{this.spread}}</span>
        <span class="font-mono">{{this.vol}}</span>
        <span>
          <span class="tokyo-pill {{#if (eq this.status 'OPTIMAL')}}pill-opt{{else}}pill-warn{{/if}}">
            {{this.status}}
          </span>
        </span>
        <span class="tokyo-kanji-stat">{{this.kanji}}</span>
      </div>
      {{/each}}
    </div>
  </div>
</div>`,
    cssContent: `.tokyo-container {
  background: radial-gradient(circle at 10% 10%, rgba(255, 0, 85, 0.08) 0%, rgba(10, 9, 18, 0.98) 70%), #07060c;
  border: 1px solid rgba(255, 0, 85, 0.35);
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #f1f1f5;
  box-shadow: 0 0 30px rgba(255, 0, 85, 0.08), inset 0 0 20px rgba(0, 0, 0, 0.8);
  position: relative;
}

.tokyo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.tokyo-kanji-title {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #ff0055;
}

.tokyo-title {
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.tokyo-title span {
  font-size: 12px;
  color: #00ffff;
  font-weight: 600;
}

.tokyo-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid #00ffff;
  color: #00ffff;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
}

.tokyo-pulse-magenta {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff0055;
  box-shadow: 0 0 8px #ff0055;
  animation: tokyoGlow 1.2s infinite alternate;
}

@keyframes tokyoGlow {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 1; }
}

.tokyo-hazard-stripe {
  height: 3px;
  background: repeating-linear-gradient(45deg, #ff0055, #ff0055 10px, #00ffff 10px, #00ffff 20px);
  margin-bottom: 14px;
}

.tokyo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.tokyo-card {
  background: rgba(18, 15, 28, 0.8);
  padding: 12px;
  position: relative;
}

.border-magenta { border: 1px solid rgba(255, 0, 85, 0.4); border-left: 4px solid #ff0055; }
.border-cyan { border: 1px solid rgba(0, 255, 255, 0.4); border-left: 4px solid #00ffff; }
.border-purple { border: 1px solid rgba(168, 85, 247, 0.4); border-left: 4px solid #a855f7; }

.tokyo-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.tokyo-kicker {
  font-size: 9px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.5px;
}

.tokyo-badge-mini {
  font-size: 8px;
  font-weight: 800;
  background: #ff0055;
  color: #000;
  padding: 1px 4px;
}

.tokyo-badge-cyan {
  font-size: 8px;
  font-weight: 800;
  background: #00ffff;
  color: #000;
  padding: 1px 4px;
}

.tokyo-badge-purple {
  font-size: 8px;
  font-weight: 800;
  background: #a855f7;
  color: #000;
  padding: 1px 4px;
}

.tokyo-big-val {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.tokyo-unit { font-size: 10px; color: #64748b; font-weight: 400; }
.text-magenta { color: #ff0055; text-shadow: 0 0 10px rgba(255, 0, 85, 0.4); }
.text-cyan { color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.4); }
.text-purple { color: #c084fc; }

.tokyo-sub-text {
  font-size: 10px;
  color: #64748b;
  margin-top: 4px;
}

.tokyo-table-box {
  background: rgba(12, 10, 20, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tokyo-table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 0, 85, 0.08);
  border-bottom: 1px solid rgba(255, 0, 85, 0.2);
  font-size: 10px;
  font-weight: 800;
  color: #ff0055;
  letter-spacing: 0.8px;
}

.tokyo-table-tag {
  color: #00ffff;
  font-size: 9px;
}

.tokyo-table {
  font-size: 11px;
}

.tokyo-t-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1fr 0.8fr;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 800;
  color: #64748b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tokyo-t-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1fr 0.8fr;
  padding: 8px 10px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.tokyo-pill {
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
}

.pill-opt { background: rgba(0, 255, 255, 0.15); color: #00ffff; border: 1px solid #00ffff; }
.pill-warn { background: rgba(255, 0, 85, 0.15); color: #ff0055; border: 1px solid #ff0055; }

.tokyo-kanji-stat {
  font-weight: 900;
  color: #ff0055;
  font-size: 12px;
}`
  },
  {
    id: 'synthwave-outrun-80s',
    name: 'Synthwave Sunset 1984',
    tagline: 'Grid wireframe retrofuturista, gradiente neon poente e estética arcade de 16 bits',
    description: 'Visual nostálgico dos anos 80 inspirado em Outrun, synthwave e computadores de 16 bits. Possui grid em perspectiva no horizonte, degradê pôr do sol rosa/laranja elétrico, barras de VU-meter LED e tipografia arcade.',
    category: 'synthwave',
    accentColor: '#ec4899',
    secondaryColor: '#f97316',
    backgroundColor: '#0c0714',
    textColor: '#fdf2f8',
    fontFamily: "'Orbitron', 'JetBrains Mono', monospace",
    borderRadius: '4px',
    isDark: true,
    tags: ['Synthwave', 'Outrun', '80s', 'Retro', 'Arcade', 'Neon Sunset'],
    recommendedFor: ['Media Streaming', 'Video Transcoding', 'Gaming Platforms', 'Audio Pipelines'],
    dynamicVariables: [
      { name: 'channel_id', description: 'Canal de Transmissão', defaultValue: 'RETROWAVE-RADIO-01' },
      { name: 'bitrate_target', description: 'Taxa de Bitrate Alvo', defaultValue: '8,500 Kbps (4K 60FPS)' }
    ],
    mockData: {
      stream_health: "EXCELLENT // 60 FPS",
      stream_bps: "8,420 kbps",
      encoder_fps: 59.94,
      drop_frames: "0 (0.00%)",
      audio_vu_l: "-6.2 dB",
      audio_vu_r: "-6.4 dB",
      concurrent_viewers: "18,420",
      render_engine: "NVENC H.265 / AV1",
      channels_live: [
        { name: "Main 4K Stream", status: "LIVE", fps: "60.0", bitrate: "8.4 Mbps", codec: "AV1" },
        { name: "Secondary 1080p", status: "LIVE", fps: "60.0", bitrate: "4.2 Mbps", codec: "H.264" },
        { name: "Audio Master WAV", status: "LIVE", fps: "48kHz", bitrate: "320 kbps", codec: "Opus" }
      ]
    },
    htmlContent: `<div class="synth-panel">
  <!-- Retro Sunset & Wireframe Horizon Background Header -->
  <div class="synth-top-banner">
    <div class="synth-sun"></div>
    <div class="synth-banner-content">
      <div class="synth-tag-row">
        <span class="synth-badge">SYNTH // OBS-LIVE</span>
        <span class="synth-stream-id">\${channel_id}</span>
      </div>
      <h2 class="synth-title">TRANSMISSÃO AO VIVO // 4K 60FPS</h2>
      <div class="synth-target-text">\${bitrate_target} • {{render_engine}}</div>
    </div>
    <div class="synth-live-box">
      <span class="synth-live-glow"></span>
      <span>{{stream_health}}</span>
    </div>
  </div>

  <!-- Metric Matrix with Retro Digital Displays -->
  <div class="synth-grid">
    <div class="synth-metric-card border-sunset">
      <div class="synth-card-lbl">BITRATE ATUAL</div>
      <div class="synth-big-stat text-pink">{{stream_bps}}</div>
      <div class="synth-vu-bars">
        <span class="vu-segment on"></span><span class="vu-segment on"></span>
        <span class="vu-segment on"></span><span class="vu-segment on"></span>
        <span class="vu-segment on"></span><span class="vu-segment off"></span>
      </div>
    </div>

    <div class="synth-metric-card border-orange">
      <div class="synth-card-lbl">FRAME RATE</div>
      <div class="synth-big-stat text-orange">{{encoder_fps}} <span class="synth-sm-unit">FPS</span></div>
      <div class="synth-sub">Dropped: {{drop_frames}}</div>
    </div>

    <div class="synth-metric-card border-cyan">
      <div class="synth-card-lbl">ESPECTADORES ATIVOS</div>
      <div class="synth-big-stat text-cyan">{{concurrent_viewers}}</div>
      <div class="synth-sub">Peak Today: 24,190</div>
    </div>
  </div>

  <!-- Channel Stream Matrix -->
  <div class="synth-table-wrapper">
    <div class="synth-table-header">
      <span>ENCODER CHANNEL</span>
      <span>STATE</span>
      <span>FPS / SAMPLING</span>
      <span>BITRATE</span>
      <span>CODEC</span>
    </div>
    {{#each channels_live}}
    <div class="synth-table-row">
      <span class="font-bold text-pink">▲ {{this.name}}</span>
      <span><span class="synth-live-pill">{{this.status}}</span></span>
      <span class="text-orange">{{this.fps}}</span>
      <span class="text-cyan font-mono">{{this.bitrate}}</span>
      <span class="text-white">{{this.codec}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.synth-panel {
  background: linear-gradient(180deg, #180928 0%, #0c0714 60%, #06030a 100%);
  border: 1px solid rgba(236, 72, 153, 0.4);
  border-radius: 4px;
  padding: 16px;
  font-family: 'JetBrains Mono', 'Orbitron', monospace;
  color: #fdf2f8;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.8);
}

.synth-top-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, #ec4899, #f97316, #06b6d4) 1;
  position: relative;
}

.synth-sun {
  position: absolute;
  top: -20px;
  right: 180px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(180deg, #fbbf24 0%, #ec4899 100%);
  opacity: 0.25;
  filter: blur(10px);
  pointer-events: none;
}

.synth-banner-content {
  z-index: 2;
}

.synth-tag-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
}

.synth-badge {
  font-size: 9px;
  font-weight: 900;
  background: #ec4899;
  color: #000;
  padding: 2px 6px;
  letter-spacing: 1px;
}

.synth-stream-id {
  font-size: 10px;
  color: #f472b6;
  font-weight: 700;
}

.synth-title {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
}

.synth-target-text {
  font-size: 10px;
  color: #fb923c;
  margin-top: 2px;
}

.synth-live-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(236, 72, 153, 0.15);
  border: 1px solid #ec4899;
  color: #f472b6;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  box-shadow: 0 0 12px rgba(236, 72, 153, 0.3);
}

.synth-live-glow {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ec4899;
  box-shadow: 0 0 8px #ec4899;
}

.synth-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.synth-metric-card {
  background: rgba(26, 12, 40, 0.6);
  padding: 12px;
  border-radius: 2px;
}

.border-sunset { border: 1px solid rgba(236, 72, 153, 0.4); border-top: 3px solid #ec4899; }
.border-orange { border: 1px solid rgba(249, 115, 22, 0.4); border-top: 3px solid #f97316; }
.border-cyan { border: 1px solid rgba(6, 182, 212, 0.4); border-top: 3px solid #06b6d4; }

.synth-card-lbl {
  font-size: 9px;
  font-weight: 800;
  color: #a855f7;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.synth-big-stat {
  font-size: 22px;
  font-weight: 900;
}

.synth-sm-unit { font-size: 11px; color: #94a3b8; }
.text-pink { color: #f472b6; text-shadow: 0 0 8px rgba(236, 72, 153, 0.5); }
.text-orange { color: #fb923c; text-shadow: 0 0 8px rgba(249, 115, 22, 0.5); }
.text-cyan { color: #22d3ee; text-shadow: 0 0 8px rgba(6, 182, 212, 0.5); }

.synth-sub {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 4px;
}

.synth-vu-bars {
  display: flex;
  gap: 3px;
  margin-top: 6px;
}

.vu-segment {
  height: 4px;
  flex: 1;
  background: #33144a;
}

.vu-segment.on {
  background: #ec4899;
  box-shadow: 0 0 6px #ec4899;
}

.synth-table-wrapper {
  background: rgba(16, 7, 26, 0.85);
  border: 1px solid rgba(236, 72, 153, 0.2);
  font-size: 11px;
}

.synth-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr 1fr;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 800;
  color: #a855f7;
  background: rgba(236, 72, 153, 0.08);
  border-bottom: 1px solid rgba(236, 72, 153, 0.2);
}

.synth-table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr 1fr;
  padding: 8px 10px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.synth-live-pill {
  background: #ec4899;
  color: #000;
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
}`
  },
  {
    id: 'industrial-brutalist-hazard',
    name: 'Heavy Industrial Brutalism & SCADA',
    tagline: 'Faixas de alerta zebradas em amarelo/preto, carimbos mecânicos e robustez de chão de fábrica',
    description: 'Estética brutalista e industrial para telemetria de chão de fábrica, usinas de energia, turbinas, sensores Modbus/OPC-UA e sistemas SCADA de alta confiabilidade.',
    category: 'industrial-brutalist',
    accentColor: '#eab308',
    secondaryColor: '#000000',
    backgroundColor: '#121214',
    textColor: '#f4f4f5',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    borderRadius: '0px',
    isDark: true,
    tags: ['Industrial', 'Brutalism', 'SCADA', 'Hazard', 'Machinery', 'IoT Sensors'],
    recommendedFor: ['SCADA Systems', 'Power Grids', 'Manufacturing Lines', 'Ceph/MinIO Storage'],
    dynamicVariables: [
      { name: 'plant_sector', description: 'Setor da Planta / Fábrica', defaultValue: 'SECTOR-B // TURBINES' },
      { name: 'safety_status', description: 'Status de Segurança', defaultValue: 'LEVEL-1 ALL CLEAR' }
    ],
    mockData: {
      turbine_rpm: "3,600 RPM",
      boiler_temp_c: "542.8°C",
      psi_pressure: "1,840 PSI",
      vibration_hz: "24.2 Hz",
      emergency_override: "ARMED // STANDBY",
      flow_rate_lpm: "4,820 L/min",
      turbines: [
        { id: "TURBINE-01", rpm: "3,600", temp: "542°C", psi: "1,840", status: "OPERATIONAL" },
        { id: "TURBINE-02", rpm: "3,598", temp: "538°C", psi: "1,835", status: "OPERATIONAL" },
        { id: "GENERATOR-MAIN", rpm: "1,800", temp: "68°C", psi: "N/A", status: "ONLINE" }
      ]
    },
    htmlContent: `<div class="scada-panel">
  <!-- Industrial Hazard Top Stripe -->
  <div class="scada-hazard-bar"></div>

  <!-- Heavy Industrial Header -->
  <div class="scada-header">
    <div class="scada-stamp-box">
      <span class="scada-stamp">PLANT TELEMETRY</span>
      <h2 class="scada-title">\${plant_sector}</h2>
    </div>
    <div class="scada-safety-pill">
      <span>● \${safety_status}</span>
    </div>
  </div>

  <!-- Heavy Duty Mechanical Metrics -->
  <div class="scada-metrics-grid">
    <div class="scada-cell">
      <div class="scada-cell-header">
        <span>TURBINE ROTATION</span>
        <span class="scada-tag">RPM</span>
      </div>
      <div class="scada-huge-val text-yellow">{{turbine_rpm}}</div>
      <div class="scada-cell-footer">NOMINAL: 3,600 RPM (60Hz)</div>
    </div>

    <div class="scada-cell">
      <div class="scada-cell-header">
        <span>BOILER CORE TEMP</span>
        <span class="scada-tag">THERMAL</span>
      </div>
      <div class="scada-huge-val text-yellow">{{boiler_temp_c}}</div>
      <div class="scada-cell-footer">MAX SAFETY THRESHOLD: 600°C</div>
    </div>

    <div class="scada-cell">
      <div class="scada-cell-header">
        <span>HYDRAULIC PRESSURE</span>
        <span class="scada-tag">PSI</span>
      </div>
      <div class="scada-huge-val">{{psi_pressure}}</div>
      <div class="scada-cell-footer">FLOW: {{flow_rate_lpm}}</div>
    </div>
  </div>

  <!-- Machine Units Health Table -->
  <div class="scada-table-box">
    <div class="scada-t-title">SCADA SENSOR ARRAY // MODBUS RTU</div>
    <table class="scada-table">
      <thead>
        <tr>
          <th>EQUIPMENT ID</th>
          <th>RPM</th>
          <th>TEMPERATURE</th>
          <th>PRESSURE</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {{#each turbines}}
        <tr>
          <td class="font-bold text-yellow">■ {{this.id}}</td>
          <td>{{this.rpm}}</td>
          <td>{{this.temp}}</td>
          <td>{{this.psi}}</td>
          <td><span class="scada-status-tag">{{this.status}}</span></td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</div>`,
    cssContent: `.scada-panel {
  background: #121214;
  border: 2px solid #eab308;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #f4f4f5;
  box-shadow: 0 4px 0 #000;
  position: relative;
}

.scada-hazard-bar {
  height: 8px;
  background: repeating-linear-gradient(45deg, #eab308, #eab308 12px, #000000 12px, #000000 24px);
  margin-bottom: 12px;
  border: 1px solid #000;
}

.scada-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #27272a;
  padding-bottom: 10px;
  margin-bottom: 14px;
}

.scada-stamp-box {
  display: flex;
  flex-direction: column;
}

.scada-stamp {
  font-size: 9px;
  font-weight: 900;
  color: #eab308;
  letter-spacing: 2px;
}

.scada-title {
  margin: 2px 0 0 0;
  font-size: 17px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.scada-safety-pill {
  background: #eab308;
  color: #000000;
  font-size: 11px;
  font-weight: 900;
  padding: 4px 10px;
  border: 1px solid #000;
}

.scada-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.scada-cell {
  background: #18181b;
  border: 1px solid #3f3f46;
  border-left: 4px solid #eab308;
  padding: 12px;
}

.scada-cell-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9px;
  font-weight: 800;
  color: #a1a1aa;
  margin-bottom: 6px;
}

.scada-tag {
  background: #27272a;
  padding: 1px 4px;
  color: #eab308;
  font-size: 8px;
}

.scada-huge-val {
  font-size: 22px;
  font-weight: 900;
}

.text-yellow { color: #eab308; }

.scada-cell-footer {
  font-size: 9px;
  color: #71717a;
  margin-top: 6px;
}

.scada-table-box {
  background: #18181b;
  border: 1px solid #3f3f46;
}

.scada-t-title {
  background: #27272a;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 900;
  color: #eab308;
  letter-spacing: 1px;
  border-bottom: 1px solid #3f3f46;
}

.scada-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.scada-table th {
  text-align: left;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 800;
  color: #71717a;
  border-bottom: 1px solid #27272a;
}

.scada-table td {
  padding: 6px 10px;
  border-bottom: 1px solid #27272a;
}

.scada-status-tag {
  background: rgba(234, 179, 8, 0.15);
  border: 1px solid #eab308;
  color: #eab308;
  font-weight: 800;
  font-size: 9px;
  padding: 2px 6px;
}`
  },
  {
    id: 'crimson-soc-defense',
    name: 'Midnight Crimson SOC & Threat Hunter',
    tagline: 'DEFCON alarmes, radar de ameaças em tempo real e monitoramento de ataques DDoS',
    description: 'Painel especializado para SOC (Security Operations Center), Threat Hunting e firewalls perimetrais. Apresenta status DEFCON, mitigação de botnets, análise de anomalias e feed de incidentes com severidade crítica.',
    category: 'crimson-soc',
    accentColor: '#ff1744',
    secondaryColor: '#990000',
    backgroundColor: '#0b080d',
    textColor: '#ffebee',
    fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', sans-serif",
    borderRadius: '4px',
    isDark: true,
    tags: ['SOC', 'Security', 'Cyber Defense', 'DDoS', 'Threat Hunting', 'Crimson'],
    recommendedFor: ['Security Operations Center', 'WAF & DDoS Defense', 'SIEM Logs', 'IDS/IPS Snort'],
    dynamicVariables: [
      { name: 'soc_perimeter', description: 'Perímetro / VPC Alvo', defaultValue: 'DMZ-CORP-GATEWAY' },
      { name: 'defcon_state', description: 'Nível DEFCON', defaultValue: 'DEFCON-2 // ELEVATED' }
    ],
    mockData: {
      active_threat_level: "HIGH ALERT (DDoS MITIGATION ACTIVE)",
      blocked_ips_hr: "482,910",
      mitigated_attack_gbps: "48.2 Gbps",
      honeypot_triggers: "1,248",
      waf_rules_active: "2,490",
      threat_origins: [
        { ip: "185.220.101.5", attack: "SYN Flood / UDP Amplification", origin: "TOR-EXIT", sev: "CRITICAL" },
        { ip: "45.142.214.99", attack: "SQLi Bypass Attempt on /api/auth", origin: "NL-HOST", sev: "HIGH" },
        { ip: "194.26.29.112", attack: "SSH Brute-Force Key Exchange", origin: "RU-VPN", sev: "MEDIUM" }
      ]
    },
    htmlContent: `<div class="soc-container">
  <!-- Top Crimson Threat Banner -->
  <div class="soc-header">
    <div class="soc-brand">
      <span class="soc-kicker">THREAT INTELLIGENCE &amp; SOC CORE</span>
      <h2 class="soc-title">\${soc_perimeter}</h2>
    </div>
    <div class="soc-defcon-badge">
      <span class="soc-alert-dot"></span>
      <span>\${defcon_state}</span>
    </div>
  </div>

  <!-- Attack Volume & Defense Matrix -->
  <div class="soc-grid">
    <div class="soc-card border-crimson">
      <span class="soc-card-label">BLOQUEIOS / HORA</span>
      <div class="soc-stat text-crimson">{{blocked_ips_hr}}</div>
      <div class="soc-sub">WAF + eBPF XDP Layer</div>
    </div>

    <div class="soc-card border-crimson-subtle">
      <span class="soc-card-label">PICO MITIGADO (DDOS)</span>
      <div class="soc-stat text-crimson">{{mitigated_attack_gbps}}</div>
      <div class="soc-sub">BGP Anycast Scrubbing</div>
    </div>

    <div class="soc-card border-crimson-subtle">
      <span class="soc-card-label">HONEYPOT TRIGGERS</span>
      <div class="soc-stat text-crimson">{{honeypot_triggers}}</div>
      <div class="soc-sub">Zero Compromised Nodes</div>
    </div>
  </div>

  <!-- Realtime Threat Feed Table -->
  <div class="soc-feed-box">
    <div class="soc-feed-head">
      <span>IP / VETOR DE ATAQUE</span>
      <span>TIPO DE AMEAÇA</span>
      <span>ORIGEM</span>
      <span>SEVERIDADE</span>
    </div>
    {{#each threat_origins}}
    <div class="soc-feed-row">
      <span class="font-bold text-white">⚠ {{this.ip}}</span>
      <span class="text-crimson">{{this.attack}}</span>
      <span class="font-mono text-zinc-400">{{this.origin}}</span>
      <span>
        <span class="soc-sev-pill {{#if (eq this.sev 'CRITICAL')}}sev-crit{{else if (eq this.sev 'HIGH')}}sev-high{{else}}sev-med{{/if}}">
          {{this.sev}}
        </span>
      </span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.soc-container {
  background: radial-gradient(circle at 10% 10%, rgba(255, 23, 68, 0.08) 0%, rgba(11, 8, 13, 0.98) 75%), #080509;
  border: 1px solid rgba(255, 23, 68, 0.35);
  border-radius: 4px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #ffebee;
  box-shadow: 0 0 25px rgba(255, 23, 68, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.8);
}

.soc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 23, 68, 0.25);
  padding-bottom: 10px;
  margin-bottom: 14px;
}

.soc-kicker {
  font-size: 9px;
  font-weight: 800;
  color: #ff1744;
  letter-spacing: 1.5px;
}

.soc-title {
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
}

.soc-defcon-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 23, 68, 0.15);
  border: 1px solid #ff1744;
  color: #ff1744;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  box-shadow: 0 0 10px rgba(255, 23, 68, 0.3);
}

.soc-alert-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff1744;
  box-shadow: 0 0 8px #ff1744;
  animation: socPulse 1s infinite alternate;
}

@keyframes socPulse {
  0% { transform: scale(0.8); opacity: 0.4; }
  100% { transform: scale(1.3); opacity: 1; }
}

.soc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.soc-card {
  background: rgba(20, 10, 16, 0.7);
  padding: 12px;
  border-radius: 3px;
}

.border-crimson { border: 1px solid #ff1744; }
.border-crimson-subtle { border: 1px solid rgba(255, 23, 68, 0.25); }

.soc-card-label {
  font-size: 9px;
  font-weight: 800;
  color: #f87171;
  letter-spacing: 0.8px;
}

.soc-stat {
  font-size: 22px;
  font-weight: 900;
  margin: 4px 0 2px 0;
}

.text-crimson { color: #ff1744; text-shadow: 0 0 8px rgba(255, 23, 68, 0.4); }

.soc-sub {
  font-size: 10px;
  color: #71717a;
}

.soc-feed-box {
  background: rgba(14, 8, 12, 0.9);
  border: 1px solid rgba(255, 23, 68, 0.2);
  font-size: 11px;
}

.soc-feed-head {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr 1fr;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 800;
  color: #f87171;
  background: rgba(255, 23, 68, 0.08);
  border-bottom: 1px solid rgba(255, 23, 68, 0.2);
}

.soc-feed-row {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr 1fr;
  padding: 8px 10px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.soc-sev-pill {
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 2px;
}

.sev-crit { background: #ff1744; color: #000; }
.sev-high { background: rgba(255, 23, 68, 0.25); color: #ff1744; border: 1px solid #ff1744; }
.sev-med { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #fbbf24; }`
  },
  {
    id: 'monochrome-eink-paper',
    name: 'Swiss Monolithic E-Ink Telemetry',
    tagline: 'Contraste absoluto preto e branco, estética editorial de jornal e zero poluição visual',
    description: 'Inspirado no design tipográfico suíço e displays E-Ink de altíssima definição. Elimina gradientes e cores supérfluas, priorizando legibilidade sob luz solar direta, paredes de vídeo NOC e dashboards de máxima clareza.',
    category: 'monochrome-eink',
    accentColor: '#ffffff',
    secondaryColor: '#000000',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    fontFamily: "'JetBrains Mono', 'Outfit', sans-serif",
    borderRadius: '0px',
    isDark: true,
    tags: ['E-Ink', 'Monochrome', 'Swiss', 'Minimalist', 'High Contrast', 'Paper'],
    recommendedFor: ['Solar Power Stations', 'Wall Displays', 'Science Labs', 'Clean Telemetry'],
    dynamicVariables: [
      { name: 'station_id', description: 'ID da Estação / Medidor', defaultValue: 'SOLAR-GRID-SWISS-01' },
      { name: 'epoch', description: 'Timestamp de Medição', defaultValue: '2026-08-31 17:00 UTC' }
    ],
    mockData: {
      power_output_mw: "148.4 MW",
      grid_efficiency: "99.4%",
      clean_power_ratio: "100.0%",
      co2_offset_tons: "4,820 T",
      storage_mwh: "420 MWh",
      nodes: [
        { array: "PHOTOVOLTAIC-ALPHA", out: "48.2 MW", eff: "99.8%", status: "OPTIMAL" },
        { array: "WIND-TURBINE-VALLEY", out: "64.1 MW", eff: "99.1%", status: "OPTIMAL" },
        { array: "HYDRO-PUMP-STORAGE", out: "36.1 MW", eff: "99.3%", status: "OPERATIONAL" }
      ]
    },
    htmlContent: `<div class="eink-panel">
  <!-- Swiss Monolithic Header -->
  <div class="eink-header">
    <div>
      <div class="eink-kicker">TELEMETRIA MONOCROMÁTICA DE PRECISÃO // \${epoch}</div>
      <h2 class="eink-title">\${station_id}</h2>
    </div>
    <div class="eink-badge-inv">
      <span>100% OPERACIONAL</span>
    </div>
  </div>

  <!-- High-Contrast Metric Block Matrix -->
  <div class="eink-grid">
    <div class="eink-card inv-card">
      <span class="eink-card-lbl">POTÊNCIA ATUAL (MW)</span>
      <div class="eink-stat">{{power_output_mw}}</div>
      <div class="eink-sub">EFICIÊNCIA GLOBAL: {{grid_efficiency}}</div>
    </div>

    <div class="eink-card">
      <span class="eink-card-lbl">COMPENSAÇÃO DE CARBONO</span>
      <div class="eink-stat">{{co2_offset_tons}}</div>
      <div class="eink-sub">ENERGIA LIMPA: {{clean_power_ratio}}</div>
    </div>

    <div class="eink-card">
      <span class="eink-card-lbl">ARMAZENAMENTO BESS</span>
      <div class="eink-stat">{{storage_mwh}}</div>
      <div class="eink-sub">BATERIA EM CARGA MÁXIMA</div>
    </div>
  </div>

  <!-- Swiss Strict Data Table -->
  <div class="eink-table-box">
    <div class="eink-t-head">
      <span>GERAÇÃO / ARRAY</span>
      <span>OUTPUT</span>
      <span>EFICIÊNCIA</span>
      <span>ESTADO</span>
    </div>
    {{#each nodes}}
    <div class="eink-t-row">
      <span class="font-bold">■ {{this.array}}</span>
      <span class="font-bold">{{this.out}}</span>
      <span>{{this.eff}}</span>
      <span><span class="eink-pill">{{this.status}}</span></span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.eink-panel {
  background: #000000;
  border: 2px solid #ffffff;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #ffffff;
  box-shadow: none;
}

.eink-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
  margin-bottom: 14px;
}

.eink-kicker {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #a1a1aa;
}

.eink-title {
  margin: 2px 0 0 0;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
}

.eink-badge-inv {
  background: #ffffff;
  color: #000000;
  font-size: 10px;
  font-weight: 900;
  padding: 4px 8px;
}

.eink-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.eink-card {
  border: 1px solid #ffffff;
  padding: 12px;
  background: #000000;
}

.inv-card {
  background: #ffffff !important;
  color: #000000 !important;
}

.inv-card .eink-card-lbl { color: #000000; font-weight: 900; }
.inv-card .eink-stat { color: #000000; }
.inv-card .eink-sub { color: #52525b; }

.eink-card-lbl {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #a1a1aa;
}

.eink-stat {
  font-size: 22px;
  font-weight: 900;
  margin: 4px 0 2px 0;
}

.eink-sub {
  font-size: 9px;
  color: #a1a1aa;
}

.eink-table-box {
  border: 1px solid #ffffff;
  font-size: 11px;
}

.eink-t-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 900;
  background: #ffffff;
  color: #000000;
}

.eink-t-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 8px 10px;
  align-items: center;
  border-bottom: 1px solid #27272a;
}

.eink-t-row:last-child {
  border-bottom: none;
}

.eink-pill {
  border: 1px solid #ffffff;
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 900;
}`
  }
];
