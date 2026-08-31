import { ServicePreset } from '../types';

export const SERVICE_PRESETS: ServicePreset[] = [
  {
    id: 'postgres-engine',
    serviceName: 'PostgreSQL Database Engine',
    serviceLogo: 'Database',
    category: 'database',
    description: 'Painel completo para instâncias PostgreSQL: TPS, Conexões ativas vs max_connections, Cache Hit Ratio, Lag de replicação e Slow Queries.',
    defaultThemeId: 'enterprise-slate',
    grafanaPanelTitle: 'PostgreSQL Telemetry & Buffer Stats',
    tags: ['Postgres', 'SQL', 'Database', 'Cache Ratio', 'Replication'],
    suggestedMetrics: [
      'pg_stat_database_tps',
      'pg_stat_database_cache_hit_ratio',
      'pg_stat_activity_connections',
      'pg_replication_lag_bytes',
      'pg_stat_statements_mean_exec_time'
    ],
    dynamicVariables: [
      { name: 'db_instance', description: 'Host ou Instância Postgres', defaultValue: 'pg-cluster-prod-primary' },
      { name: 'database_name', description: 'Banco de Dados', defaultValue: 'app_production' }
    ],
    mockData: {
      db_version: "PostgreSQL 16.3 on x86_64",
      tps_commit: "4,912",
      tps_rollback: "3",
      cache_hit_ratio: "99.82%",
      active_connections: 142,
      max_connections: 400,
      replication_lag_ms: "1.2ms",
      database_size: "482 GB",
      table_locks: 0,
      slow_queries: [
        { query: "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC", calls: "14.2k", avg_time: "142ms", total_time: "33.6m" },
        { query: "UPDATE inventory SET stock = stock - 1 WHERE sku = $1", calls: "8.9k", avg_time: "48ms", total_time: "7.1m" },
        { query: "VACUUM ANALYZE audit_events", calls: "12", avg_time: "820ms", total_time: "9.8s" }
      ]
    },
    htmlContent: `<div class="pg-dashboard">
  <!-- DB Header -->
  <div class="pg-header">
    <div class="pg-title-box">
      <span class="pg-icon">🐘</span>
      <div>
        <h3 class="pg-title">PostgreSQL // \${db_instance}</h3>
        <p class="pg-meta">DB: \${database_name} • {{db_version}}</p>
      </div>
    </div>
    <div class="pg-health-badge">● STREAMING REPLICATION OK</div>
  </div>

  <!-- Metric Gauges Grid -->
  <div class="pg-metrics-grid">
    <div class="pg-metric-card">
      <span class="pg-label">TRANSAÇÕES / SEG (TPS)</span>
      <div class="pg-val text-blue">{{tps_commit}} <span class="pg-unit">commit/s</span></div>
      <div class="pg-sub">Rollbacks: {{tps_rollback}}/s</div>
    </div>

    <div class="pg-metric-card">
      <span class="pg-label">CACHE BUFFER HIT RATIO</span>
      <div class="pg-val text-emerald">{{cache_hit_ratio}}</div>
      <div class="pg-sub">Target &gt; 99% (SRAM / Shared Buffers)</div>
    </div>

    <div class="pg-metric-card">
      <span class="pg-label">CONEXÕES ATIVAS</span>
      <div class="pg-val text-amber">{{active_connections}} <span class="pg-unit">/ {{max_connections}}</span></div>
      <div class="pg-bar-track">
        <div class="pg-bar-fill" style="width: 35.5%"></div>
      </div>
    </div>

    <div class="pg-metric-card">
      <span class="pg-label">REPLICATION LAG</span>
      <div class="pg-val text-purple">{{replication_lag_ms}}</div>
      <div class="pg-sub">Tamanho DB: {{database_size}}</div>
    </div>
  </div>

  <!-- Slow Query Inspector -->
  <div class="pg-slow-queries">
    <div class="pg-table-title">TOP PG_STAT_STATEMENTS (MAIOR TEMPO TOTAL)</div>
    <table class="pg-table">
      <thead>
        <tr>
          <th>SQL QUERY EXECUTADA</th>
          <th>EXECUÇÕES</th>
          <th>TEMPO MÉDIO</th>
          <th>TEMPO TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {{#each slow_queries}}
        <tr>
          <td class="pg-query-code"><code>{{this.query}}</code></td>
          <td>{{this.calls}}</td>
          <td class="text-amber">{{this.avg_time}}</td>
          <td>{{this.total_time}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</div>`,
    cssContent: `.pg-dashboard {
  background: #0a0e17;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  color: #f1f5f9;
}

.pg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #1e293b;
}

.pg-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pg-icon {
  font-size: 24px;
}

.pg-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #38bdf8;
}

.pg-meta {
  margin: 2px 0 0 0;
  font-size: 11px;
  color: #64748b;
}

.pg-health-badge {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  color: #34d399;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
}

.pg-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.pg-metric-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 12px;
}

.pg-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.6px;
}

.pg-val {
  font-size: 22px;
  font-weight: 800;
  margin: 4px 0;
}

.pg-unit {
  font-size: 12px;
  font-weight: 400;
  color: #64748b;
}

.pg-sub {
  font-size: 11px;
  color: #94a3b8;
}

.text-blue { color: #38bdf8; }
.text-emerald { color: #34d399; }
.text-amber { color: #fbbf24; }
.text-purple { color: #c084fc; }

.pg-bar-track {
  height: 4px;
  background: #1e293b;
  border-radius: 2px;
  margin-top: 6px;
}

.pg-bar-fill {
  height: 100%;
  background: #fbbf24;
  border-radius: 2px;
}

.pg-slow-queries {
  background: #0d1322;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 12px;
}

.pg-table-title {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 10px;
  letter-spacing: 0.6px;
}

.pg-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.pg-table th {
  text-align: left;
  padding: 6px 8px;
  color: #64748b;
  font-size: 10px;
  border-bottom: 1px solid #1e293b;
}

.pg-table td {
  padding: 8px;
  border-bottom: 1px solid #1e293b;
}

.pg-query-code code {
  font-family: monospace;
  font-size: 11px;
  color: #cbd5e1;
  background: rgba(0,0,0,0.3);
  padding: 2px 6px;
  border-radius: 3px;
  max-width: 400px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`
  },
  {
    id: 'redis-cache-cluster',
    serviceName: 'Redis In-Memory Cache',
    serviceLogo: 'Zap',
    category: 'database',
    description: 'Telemetria em tempo real para instâncias Redis: Comandos por segundo (OPS), Memória utilizada vs maxmemory, Hit Rate de chaves e Clientes conectados.',
    defaultThemeId: 'cyberpunk-hud',
    grafanaPanelTitle: 'Redis Cache Performance & Evictions',
    tags: ['Redis', 'Cache', 'In-Memory', 'Latency', 'Key Hit Ratio'],
    suggestedMetrics: [
      'redis_instantaneous_ops_per_sec',
      'redis_memory_used_bytes',
      'redis_keyspace_hits_total',
      'redis_connected_clients'
    ],
    dynamicVariables: [
      { name: 'redis_cluster', description: 'Cluster Redis', defaultValue: 'redis-cache-cluster-01' }
    ],
    mockData: {
      ops_per_sec: "28,450",
      used_memory_human: "14.2 GB",
      maxmemory_human: "32.0 GB",
      mem_fragmentation_ratio: "1.08",
      keyspace_hit_rate: "98.4%",
      connected_clients: 412,
      blocked_clients: 0,
      evicted_keys_sec: 0,
      total_keys: "1,420,890"
    },
    htmlContent: `<div class="redis-card">
  <div class="redis-head">
    <div class="redis-title-wrap">
      <span class="redis-dot"></span>
      <h3 class="redis-title">REDIS CLUSTER // \${redis_cluster}</h3>
    </div>
    <span class="redis-pill-green">ALL NODES SYNCHRONIZED</span>
  </div>

  <div class="redis-grid">
    <div class="redis-stat-box red-accent">
      <div class="stat-lbl">OPERAÇÕES / SEG (OPS)</div>
      <div class="stat-num text-red">{{ops_per_sec}} <span class="unit">cmd/s</span></div>
      <div class="stat-sub">Zero Blocked Clients</div>
    </div>

    <div class="redis-stat-box">
      <div class="stat-lbl">CACHE HIT RATE</div>
      <div class="stat-num text-emerald">{{keyspace_hit_rate}}</div>
      <div class="stat-sub">Total Chaves: {{total_keys}}</div>
    </div>

    <div class="redis-stat-box">
      <div class="stat-lbl">MEMÓRIA UTILIZADA</div>
      <div class="stat-num text-cyan">{{used_memory_human}} <span class="unit">/ {{maxmemory_human}}</span></div>
      <div class="stat-sub">Frag Ratio: {{mem_fragmentation_ratio}} (Ideal ~1.0)</div>
    </div>

    <div class="redis-stat-box">
      <div class="stat-lbl">CLIENTES CONECTADOS</div>
      <div class="stat-num text-amber">{{connected_clients}}</div>
      <div class="stat-sub">Evicted Keys: {{evicted_keys_sec}}/s</div>
    </div>
  </div>
</div>`,
    cssContent: `.redis-card {
  background: #090b10;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #e2e8f0;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.08);
}
.redis-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  border-bottom: 1px dashed rgba(239, 68, 68, 0.2);
  padding-bottom: 10px;
}
.redis-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.redis-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}
.redis-title { margin: 0; font-size: 15px; font-weight: 700; color: #fff; }
.redis-pill-green {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid #10b981;
  color: #10b981;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}
.redis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
}
.redis-stat-box {
  background: #0f1420;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 12px;
}
.red-accent { border-color: rgba(239, 68, 68, 0.4); }
.stat-lbl { font-size: 10px; color: #94a3b8; font-weight: 700; }
.stat-num { font-size: 20px; font-weight: 800; margin: 4px 0; }
.text-red { color: #f87171; text-shadow: 0 0 8px rgba(239, 68, 68, 0.3); }
.text-emerald { color: #34d399; }
.text-cyan { color: #38bdf8; }
.text-amber { color: #fbbf24; }
.unit { font-size: 11px; font-weight: 400; color: #64748b; }
.stat-sub { font-size: 10px; color: #64748b; }`
  },
  {
    id: 'k8s-pod-overview',
    serviceName: 'Kubernetes Cluster & Workloads',
    serviceLogo: 'Layers',
    category: 'containers',
    description: 'Monitoramento detalhado de pods, deployments, namespaces, CPU & Memory requests vs limites e contagem de restarts.',
    defaultThemeId: 'cyberpunk-hud',
    grafanaPanelTitle: 'Kubernetes Workload & Pod Health Matrix',
    tags: ['Kubernetes', 'K8s', 'Pods', 'Containers', 'Namespaces'],
    suggestedMetrics: [
      'kube_pod_container_status_running',
      'container_cpu_usage_seconds_total',
      'container_memory_working_set_bytes',
      'kube_pod_container_status_restarts_total'
    ],
    dynamicVariables: [
      { name: 'namespace', description: 'Namespace K8s', defaultValue: 'production' }
    ],
    mockData: {
      cluster_nodes: "12 / 12 Ready",
      total_pods: 148,
      running_pods: 146,
      pending_pods: 2,
      failed_pods: 0,
      cpu_capacity: "96 Cores",
      cpu_used_pct: "64.2%",
      mem_capacity: "384 GB",
      mem_used_pct: "72.8%",
      workloads: [
        { name: "auth-service-v2", replicas: "4/4", restarts: 0, cpu: "280m", mem: "512Mi", status: "Healthy" },
        { name: "billing-gateway", replicas: "6/6", restarts: 0, cpu: "820m", mem: "1.4Gi", status: "Healthy" },
        { name: "data-ingest-worker", replicas: "12/12", restarts: 1, cpu: "2400m", mem: "8.2Gi", status: "Healthy" },
        { name: "image-resizer", replicas: "2/3", restarts: 4, cpu: "1800m", mem: "3.1Gi", status: "Warning" }
      ]
    },
    htmlContent: `<div class="k8s-panel">
  <div class="k8s-bar">
    <div class="k8s-title-group">
      <span class="k8s-wheel">☸</span>
      <h3 class="k8s-h3">KUBERNETES // NS: \${namespace}</h3>
    </div>
    <div class="k8s-node-status">{{cluster_nodes}}</div>
  </div>

  <div class="k8s-stats">
    <div class="k8s-card">
      <span class="k8s-lbl">PODS ATIVOS</span>
      <div class="k8s-num text-cyan">{{running_pods}} <span class="k8s-sub">/ {{total_pods}}</span></div>
      <div class="k8s-flags">Pending: {{pending_pods}} • Failed: {{failed_pods}}</div>
    </div>
    <div class="k8s-card">
      <span class="k8s-lbl">CPU ALLOCATION</span>
      <div class="k8s-num text-amber">{{cpu_used_pct}}</div>
      <div class="k8s-flags">Capacidade: {{cpu_capacity}}</div>
    </div>
    <div class="k8s-card">
      <span class="k8s-lbl">MEMORY ALLOCATION</span>
      <div class="k8s-num text-purple">{{mem_used_pct}}</div>
      <div class="k8s-flags">Capacidade: {{mem_capacity}}</div>
    </div>
  </div>

  <div class="k8s-workloads-list">
    <div class="k8s-list-head">DEPLOYMENTS &amp; REPLICAS</div>
    {{#each workloads}}
    <div class="k8s-workload-row">
      <span class="wl-name">📦 {{this.name}}</span>
      <span class="wl-rep">{{this.replicas}} Replicas</span>
      <span class="wl-res">CPU: {{this.cpu}} | RAM: {{this.mem}}</span>
      <span class="wl-pill {{#if (eq this.status 'Healthy')}}wl-green{{else}}wl-amber{{/if}}">
        {{this.status}} ({{this.restarts}} restarts)
      </span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.k8s-panel {
  background: #080d1a;
  border: 1px solid #1e3a8a;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #e2e8f0;
}
.k8s-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 10px;
}
.k8s-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.k8s-wheel { font-size: 20px; color: #38bdf8; }
.k8s-h3 { margin: 0; font-size: 15px; font-weight: 700; color: #fff; }
.k8s-node-status {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
}
.k8s-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}
.k8s-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 12px;
}
.k8s-lbl { font-size: 10px; font-weight: 700; color: #64748b; }
.k8s-num { font-size: 22px; font-weight: 800; margin: 4px 0; }
.text-cyan { color: #38bdf8; }
.text-amber { color: #fbbf24; }
.text-purple { color: #c084fc; }
.k8s-sub { font-size: 12px; color: #64748b; font-weight: 400; }
.k8s-flags { font-size: 11px; color: #94a3b8; }
.k8s-workloads-list {
  background: #0b1120;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 12px;
}
.k8s-list-head {
  font-size: 10px; font-weight: 700; color: #64748b; margin-bottom: 8px; letter-spacing: 0.6px;
}
.k8s-workload-row {
  display: flex; justify-content: space-between; align-items: center; padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 12px;
}
.k8s-workload-row:last-child { border-bottom: none; }
.wl-name { font-weight: 600; color: #f1f5f9; }
.wl-rep { color: #94a3b8; }
.wl-res { color: #64748b; font-family: monospace; }
.wl-pill { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; }
.wl-green { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.wl-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }`
  },
  {
    id: 'nginx-cloudflare-gateway',
    serviceName: 'Nginx & Cloudflare Edge Gateway',
    serviceLogo: 'Globe',
    category: 'networking',
    description: 'Distribuição de status HTTP 2xx / 4xx / 5xx, latência em percentis P95 / P99, largura de banda e requisições bloqueadas por WAF.',
    defaultThemeId: 'nordic-aurora',
    grafanaPanelTitle: 'Edge Ingress & HTTP Traffic Analytics',
    tags: ['Nginx', 'Cloudflare', 'WAF', 'HTTP Codes', 'Ingress'],
    suggestedMetrics: [
      'nginx_http_requests_total',
      'nginx_http_request_duration_seconds',
      'cloudflare_zone_requests_status'
    ],
    dynamicVariables: [
      { name: 'gateway_host', description: 'VHost Nginx', defaultValue: 'api.meuservico.com' }
    ],
    mockData: {
      requests_per_sec: "14,820",
      status_2xx: "98.84%",
      status_4xx: "1.12%",
      status_5xx: "0.04%",
      p95_latency: "24.2ms",
      p99_latency: "48.1ms",
      bandwidth_mbps: "482.4 Mbps",
      waf_threats_blocked: 84
    },
    htmlContent: `<div class="edge-panel">
  <div class="edge-top">
    <div class="edge-brand">
      <span class="edge-icon">⚡</span>
      <h3 class="edge-title">EDGE GATEWAY // \${gateway_host}</h3>
    </div>
    <span class="edge-tag-ok">WAF ACTIVE &amp; HEALTHY</span>
  </div>

  <div class="edge-grid">
    <div class="edge-card">
      <span class="edge-lbl">TOTAL THROUGHPUT</span>
      <div class="edge-stat text-cyan">{{requests_per_sec}} <span class="edge-sub">req/s</span></div>
      <div class="edge-note">Largura de banda: {{bandwidth_mbps}}</div>
    </div>
    <div class="edge-card">
      <span class="edge-lbl">HTTP 2XX (SUCESSO)</span>
      <div class="edge-stat text-green">{{status_2xx}}</div>
      <div class="edge-note">4xx: {{status_4xx}} | 5xx: {{status_5xx}}</div>
    </div>
    <div class="edge-card">
      <span class="edge-lbl">LATÊNCIA P95 / P99</span>
      <div class="edge-stat text-amber">{{p95_latency}} <span class="edge-sub">/ {{p99_latency}}</span></div>
      <div class="edge-note">Threats Bloqueadas: {{waf_threats_blocked}}</div>
    </div>
  </div>
</div>`,
    cssContent: `.edge-panel {
  background: #071018;
  border: 1px solid #0284c7;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #f0f9ff;
}
.edge-top {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
  border-bottom: 1px solid #0c4a6e; padding-bottom: 10px;
}
.edge-brand { display: flex; align-items: center; gap: 8px; }
.edge-icon { font-size: 18px; }
.edge-title { margin: 0; font-size: 15px; font-weight: 700; color: #38bdf8; }
.edge-tag-ok {
  background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;
  font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px;
}
.edge-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;
}
.edge-card {
  background: #082f49; border: 1px solid #0369a1; border-radius: 6px; padding: 12px;
}
.edge-lbl { font-size: 10px; font-weight: 700; color: #7dd3fc; }
.edge-stat { font-size: 22px; font-weight: 800; margin: 4px 0; }
.text-cyan { color: #38bdf8; }
.text-green { color: #4ade80; }
.text-amber { color: #fde047; }
.edge-sub { font-size: 12px; color: #bae6fd; font-weight: 400; }
.edge-note { font-size: 11px; color: #7dd3fc; }`
  },
  {
    id: 'proxmox-hypervisor',
    serviceName: 'Proxmox VE Hypervisor',
    serviceLogo: 'Server',
    category: 'system',
    description: 'Gestão de nós de virtualização Proxmox VE: VMs ativas, LXC Containers, CPU/RAM alocados, pools ZFS e temperaturas de sensores.',
    defaultThemeId: 'enterprise-slate',
    grafanaPanelTitle: 'Proxmox Virtual Environment Cluster',
    tags: ['Proxmox', 'Virtualization', 'VM', 'LXC', 'ZFS'],
    suggestedMetrics: [
      'pve_node_cpu_usage_ratio',
      'pve_node_memory_used_bytes',
      'pve_guest_status_running'
    ],
    dynamicVariables: [
      { name: 'pve_node', description: 'Nó Proxmox', defaultValue: 'pve-node-01' }
    ],
    mockData: {
      pve_version: "pve-manager/8.2-4",
      running_vms: 18,
      running_lxcs: 14,
      cpu_cores: "32 Cores (AMD EPYC)",
      cpu_usage_pct: "41.8%",
      ram_allocated: "98.4 GB / 128 GB",
      zfs_pool_health: "ONLINE",
      zfs_pool_used: "4.2 TB / 16 TB",
      guests: [
        { id: "101", name: "vm-k8s-control-01", type: "QEMU", ram: "16GB", cpu: "24%", status: "RUNNING" },
        { id: "102", name: "vm-postgres-primary", type: "QEMU", ram: "32GB", cpu: "62%", status: "RUNNING" },
        { id: "201", name: "ct-nginx-ingress", type: "LXC", ram: "4GB", cpu: "12%", status: "RUNNING" }
      ]
    },
    htmlContent: `<div class="pve-container">
  <div class="pve-head">
    <div>
      <div class="pve-kicker">PROXMOX VE CLUSTER • {{pve_version}}</div>
      <h3 class="pve-title">\${pve_node} // Hypervisor Node</h3>
    </div>
    <div class="pve-zfs-badge">ZFS POOL: {{zfs_pool_health}}</div>
  </div>

  <div class="pve-stats">
    <div class="pve-card">
      <span class="pve-lbl">GUESTS ATIVOS</span>
      <div class="pve-num">{{running_vms}} VMs <span class="pve-sub">+ {{running_lxcs}} LXC</span></div>
      <div class="pve-subtext">32 Instâncias operando</div>
    </div>
    <div class="pve-card">
      <span class="pve-lbl">USO DE CPU</span>
      <div class="pve-num text-orange">{{cpu_usage_pct}}</div>
      <div class="pve-subtext">{{cpu_cores}}</div>
    </div>
    <div class="pve-card">
      <span class="pve-lbl">MEMÓRIA RAM</span>
      <div class="pve-num text-amber">{{ram_allocated}}</div>
      <div class="pve-subtext">Pool ZFS: {{zfs_pool_used}}</div>
    </div>
  </div>

  <div class="pve-guest-table">
    <div class="pve-table-head">GUESTS VIRTUALIZADOS (VM / LXC)</div>
    {{#each guests}}
    <div class="pve-guest-row">
      <span class="pve-gid">#{{this.id}}</span>
      <span class="pve-gname">{{this.name}}</span>
      <span class="pve-gtype">{{this.type}}</span>
      <span>{{this.ram}}</span>
      <span class="text-orange">{{this.cpu}}</span>
      <span class="pve-badge-run">{{this.status}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.pve-container {
  background: #111827;
  border: 1px solid #e11d48;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #f3f4f6;
}
.pve-head {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
  border-bottom: 1px solid #374151; padding-bottom: 10px;
}
.pve-kicker { font-size: 10px; font-weight: 700; color: #f43f5e; letter-spacing: 0.6px; }
.pve-title { margin: 2px 0 0 0; font-size: 16px; font-weight: 700; color: #fff; }
.pve-zfs-badge {
  background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399;
  font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px;
}
.pve-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 14px;
}
.pve-card {
  background: #1f2937; border: 1px solid #374151; border-radius: 6px; padding: 12px;
}
.pve-lbl { font-size: 10px; font-weight: 700; color: #9ca3af; }
.pve-num { font-size: 20px; font-weight: 800; margin: 4px 0; }
.text-orange { color: #fb923c; }
.text-amber { color: #fbbf24; }
.pve-sub { font-size: 12px; color: #9ca3af; font-weight: 400; }
.pve-subtext { font-size: 11px; color: #6b7280; }
.pve-guest-table {
  background: #182234; border: 1px solid #374151; border-radius: 6px; padding: 10px;
}
.pve-table-head { font-size: 10px; font-weight: 700; color: #9ca3af; margin-bottom: 8px; }
.pve-guest-row {
  display: grid; grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr;
  padding: 6px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; align-items: center;
}
.pve-guest-row:last-child { border-bottom: none; }
.pve-gid { color: #f43f5e; font-weight: 700; font-family: monospace; }
.pve-gname { font-weight: 600; }
.pve-gtype { font-size: 10px; background: #374151; padding: 2px 6px; border-radius: 3px; width: fit-content; }
.pve-badge-run { background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 700; font-size: 10px; padding: 2px 6px; border-radius: 3px; }`
  },
  {
    id: 'active-directory-dc',
    serviceName: 'Microsoft Active Directory (AD DS)',
    serviceLogo: 'Server',
    category: 'enterprise-infra',
    description: 'Monitoramento corporativo de Controladores de Domínio (DC): Contas bloqueadas, falhas de autenticação Kerberos/NTLM, replicações pendentes e queries LDAP.',
    defaultThemeId: 'enterprise-slate',
    grafanaPanelTitle: 'Active Directory Domain Services // Telemetry',
    tags: ['Active Directory', 'Windows Server', 'LDAP', 'Kerberos', 'Security', 'Domain Controller'],
    suggestedMetrics: [
      'windows_ad_replication_pending',
      'windows_ad_ldap_search_time_ms',
      'windows_ad_locked_out_accounts_total',
      'windows_ad_kerberos_auth_failures',
      'windows_ad_bind_rate_per_sec'
    ],
    dynamicVariables: [
      { name: 'domain_name', description: 'Nome do Domínio Corporativo', defaultValue: 'corp.empresa.local' },
      { name: 'dc_hostname', description: 'Domain Controller Primário', defaultValue: 'DC01-PROD' }
    ],
    mockData: {
      dc_status: 'HEALTHY // FSMO HOLDER',
      domain: 'corp.empresa.local',
      forest_mode: 'Windows Server 2022 Forest Functional Level',
      active_sessions: '1,840',
      locked_accounts: 3,
      ldap_binds_per_sec: '420 binds/s',
      ldap_search_latency: '4.2ms',
      kerberos_failures: 12,
      replication_partner: 'DC02-BACKUP',
      replication_status: 'SYNCED (0s LAG)',
      recent_locked_users: [
        { user: 'joao.silva@corp', reason: 'BadPassword (3x)', workstation: 'WS-FIN-042', time: '10:21:04' },
        { user: 'service_scanner@corp', reason: 'ExpiredKey', workstation: 'SRV-SCAN-01', time: '09:44:12' },
        { user: 'maria.souza@corp', reason: 'BadPassword (3x)', workstation: 'WS-RH-019', time: '08:15:30' }
      ]
    },
    htmlContent: `<div class="ad-container">
  <!-- Header AD -->
  <div class="ad-header">
    <div class="ad-title-block">
      <span class="ad-icon">🛡️</span>
      <div>
        <h3 class="ad-title">\${dc_hostname} // Active Directory Domain Services</h3>
        <p class="ad-sub">Domínio: \${domain_name} • {{forest_mode}}</p>
      </div>
    </div>
    <div class="ad-status-pill">● {{dc_status}}</div>
  </div>

  <!-- KPI Grid -->
  <div class="ad-grid">
    <div class="ad-card">
      <span class="ad-label">SESSÕES / LOGONS ATIVOS</span>
      <div class="ad-val text-cyan">{{active_sessions}}</div>
      <div class="ad-meta">LDAP Binds: {{ldap_binds_per_sec}}</div>
    </div>
    <div class="ad-card">
      <span class="ad-label">CONTAS BLOQUEADAS (LOCKOUT)</span>
      <div class="ad-val text-red">{{locked_accounts}} <span class="ad-unit">usuários</span></div>
      <div class="ad-meta text-amber">{{kerberos_failures}} falhas Kerberos nas últimas 24h</div>
    </div>
    <div class="ad-card">
      <span class="ad-label">LATÊNCIA SEARCH LDAP</span>
      <div class="ad-val text-emerald">{{ldap_search_latency}}</div>
      <div class="ad-meta">SLA Máximo Permitido: 20ms</div>
    </div>
    <div class="ad-card">
      <span class="ad-label">REPLICAÇÃO MULTI-MASTER</span>
      <div class="ad-val text-blue">{{replication_status}}</div>
      <div class="ad-meta">Parceiro: {{replication_partner}}</div>
    </div>
  </div>

  <!-- Locked Accounts Log Table -->
  <div class="ad-table-box">
    <div class="ad-table-header">CONTAS COM BLOQUEIO RECENTE DE AUTENTICAÇÃO (SECURITY EVENT 4740)</div>
    {{#each recent_locked_users}}
    <div class="ad-row">
      <span class="ad-user">{{this.user}}</span>
      <span class="ad-workstation">{{this.workstation}}</span>
      <span class="ad-reason">{{this.reason}}</span>
      <span class="ad-time">{{this.time}}</span>
      <span class="ad-action-pill">BLOQUEADO</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.ad-container {
  background: #090d16;
  border: 1px solid #1e3a8a;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #f8fafc;
}
.ad-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #1e293b; padding-bottom: 12px; margin-bottom: 14px;
}
.ad-title-block { display: flex; align-items: center; gap: 10px; }
.ad-icon { font-size: 22px; }
.ad-title { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.ad-sub { margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; }
.ad-status-pill {
  background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-family: monospace;
}
.ad-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 14px; }
.ad-card {
  background: #0f172a; border: 1px solid #1e293b; border-radius: 6px; padding: 12px;
}
.ad-label { font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
.ad-val { font-size: 20px; font-weight: 800; margin: 4px 0; font-family: 'JetBrains Mono', monospace; }
.ad-unit { font-size: 11px; font-weight: 400; color: #94a3b8; }
.ad-meta { font-size: 10px; color: #94a3b8; font-family: monospace; }
.text-cyan { color: #38bdf8; }
.text-red { color: #f87171; }
.text-emerald { color: #34d399; }
.text-blue { color: #60a5fa; }
.text-amber { color: #fbbf24; }
.ad-table-box {
  background: #0b1120; border: 1px solid #1e293b; border-radius: 6px; padding: 10px;
}
.ad-table-header { font-size: 10px; font-weight: 800; color: #94a3b8; margin-bottom: 8px; font-family: monospace; }
.ad-row {
  display: grid; grid-template-columns: 2fr 1.5fr 1.5fr 1fr 1fr;
  padding: 6px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; align-items: center; font-family: monospace;
}
.ad-row:last-child { border-bottom: none; }
.ad-user { font-weight: 700; color: #fff; }
.ad-workstation { color: #94a3b8; }
.ad-reason { color: #fca5a5; }
.ad-time { color: #64748b; }
.ad-action-pill {
  background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5;
  font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; width: fit-content;
}`
  },
  {
    id: 'fortinet-fortigate',
    serviceName: 'Fortinet FortiGate Firewall',
    serviceLogo: 'Globe',
    category: 'security',
    description: 'Segurança perimetral empresarial FortiGate NGFW: Túneis VPN IPsec/SSL, Throughput de WAN, Bloqueios IPS/WAF, Sessões ativas e status de HA.',
    defaultThemeId: 'crimson-soc',
    grafanaPanelTitle: 'Fortinet FortiGate // Perimeter Security',
    tags: ['Fortinet', 'FortiGate', 'Firewall', 'VPN', 'IPsec', 'IPS', 'Security', 'WAN'],
    suggestedMetrics: [
      'fortigate_cpu_usage_pct',
      'fortigate_active_sessions_count',
      'fortigate_wan_bandwidth_bps',
      'fortigate_vpn_tunnels_active',
      'fortigate_threats_blocked_total'
    ],
    dynamicVariables: [
      { name: 'firewall_hostname', description: 'Hostname do Firewall', defaultValue: 'FG-CORP-CLUSTER-01' },
      { name: 'wan_interface', description: 'Interface WAN', defaultValue: 'wan1 (ISP Primário)' }
    ],
    mockData: {
      firmware_version: 'FortiOS v7.4.3 build2480',
      ha_status: 'HA CLUSTER A-P (IN SYNC)',
      active_sessions: '48,290 / 2,000,000',
      wan_rx: '840 Mbps',
      wan_tx: '320 Mbps',
      vpn_ipsec_tunnels: '24 / 24 UP',
      vpn_ssl_users: '142 conectados',
      threats_blocked_today: '1,429',
      ips_engine_status: 'IPS ENGINE ENABLED (Signatures: v28.910)',
      blocked_events: [
        { threat: 'SSL-VPN Brute Force Attack', src: '185.220.101.4', country: 'RU', action: 'IP BANNED (24h)', hits: '4,812' },
        { threat: 'CVE-2024-21762 Exploit Probe', src: '45.154.255.89', country: 'NL', action: 'DROPPED BY WAF', hits: '210' },
        { threat: 'DNS Amplification Attempt', src: '194.38.20.12', country: 'CN', action: 'RATE LIMITED', hits: '1,024' }
      ]
    },
    htmlContent: `<div class="fg-box">
  <div class="fg-top">
    <div class="fg-title-wrap">
      <span class="fg-shield">🛡️</span>
      <div>
        <h3 class="fg-h3">\${firewall_hostname} // FORTINET FORTIGATE</h3>
        <p class="fg-ver">{{firmware_version}} • WAN: \${wan_interface}</p>
      </div>
    </div>
    <div class="fg-ha-pill">● {{ha_status}}</div>
  </div>

  <div class="fg-metrics">
    <div class="fg-card">
      <span class="fg-lbl">SESSÕES DE FIREWALL</span>
      <div class="fg-val text-blue">{{active_sessions}}</div>
      <div class="fg-meta">Uso da tabela de estados: 2.4%</div>
    </div>
    <div class="fg-card">
      <span class="fg-lbl">TRÁFEGO WAN (RX / TX)</span>
      <div class="fg-val text-cyan">↓ {{wan_rx}} <span class="fg-sub-val">↑ {{wan_tx}}</span></div>
      <div class="fg-meta">Interface: 1 Gbps Full Duplex</div>
    </div>
    <div class="fg-card">
      <span class="fg-lbl">TÚNEIS VPN (IPSEC & SSL)</span>
      <div class="fg-val text-emerald">{{vpn_ipsec_tunnels}}</div>
      <div class="fg-meta">SSL-VPN: {{vpn_ssl_users}}</div>
    </div>
    <div class="fg-card">
      <span class="fg-lbl">AMEAÇAS BLOQUEADAS HOJE</span>
      <div class="fg-val text-red">{{threats_blocked_today}}</div>
      <div class="fg-meta">{{ips_engine_status}}</div>
    </div>
  </div>

  <div class="fg-threat-box">
    <div class="fg-threat-head">EVENTOS RECENTES DE MITIGAÇÃO PERIMETRAL (IPS / WAF / GEO-BLOCK)</div>
    {{#each blocked_events}}
    <div class="fg-threat-row">
      <span class="fg-threat-name">{{this.threat}}</span>
      <span class="fg-threat-ip">{{this.src}} [{{this.country}}]</span>
      <span class="fg-threat-hits">{{this.hits}} req</span>
      <span class="fg-threat-act">{{this.action}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.fg-box {
  background: #0d0608;
  border: 1px solid #dc2626;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.fg-top {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #271115; padding-bottom: 12px; margin-bottom: 14px;
}
.fg-title-wrap { display: flex; align-items: center; gap: 10px; }
.fg-shield { font-size: 22px; }
.fg-h3 { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.fg-ver { margin: 2px 0 0 0; font-size: 11px; color: #f87171; font-family: monospace; }
.fg-ha-pill {
  background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-family: monospace;
}
.fg-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 14px; }
.fg-card {
  background: #170b0e; border: 1px solid #2f1218; border-radius: 6px; padding: 12px;
}
.fg-lbl { font-size: 9px; font-weight: 800; color: #a1a1aa; letter-spacing: 0.5px; text-transform: uppercase; }
.fg-val { font-size: 19px; font-weight: 800; margin: 4px 0; font-family: 'JetBrains Mono', monospace; }
.fg-sub-val { font-size: 14px; color: #93c5fd; }
.fg-meta { font-size: 10px; color: #71717a; font-family: monospace; }
.fg-threat-box {
  background: #14080b; border: 1px solid #33131a; border-radius: 6px; padding: 10px;
}
.fg-threat-head { font-size: 10px; font-weight: 800; color: #f87171; margin-bottom: 8px; font-family: monospace; }
.fg-threat-row {
  display: grid; grid-template-columns: 2.5fr 1.5fr 1fr 1.5fr;
  padding: 6px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; align-items: center; font-family: monospace;
}
.fg-threat-row:last-child { border-bottom: none; }
.fg-threat-name { font-weight: 700; color: #fff; }
.fg-threat-ip { color: #cbd5e1; }
.fg-threat-hits { color: #fbbf24; }
.fg-threat-act {
  background: rgba(220, 38, 38, 0.3); border: 1px solid #dc2626; color: #fca5a5;
  font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; width: fit-content;
}`
  },
  {
    id: 'docker-host-engine',
    serviceName: 'Docker Standalone & Compose Hosts',
    serviceLogo: 'Layers',
    category: 'containers',
    description: 'Gestão de containers Docker em hosts Linux/Windows: Containers em execução/parados, consumo de memória por container, restarts e volumes.',
    defaultThemeId: 'cyberpunk-neon',
    grafanaPanelTitle: 'Docker Engine // Host Containers Overview',
    tags: ['Docker', 'Containers', 'Docker Compose', 'Linux', 'cAdvisor'],
    suggestedMetrics: [
      'container_cpu_usage_seconds_total',
      'container_memory_working_set_bytes',
      'docker_containers_running_total',
      'docker_containers_stopped_total',
      'docker_restart_count'
    ],
    dynamicVariables: [
      { name: 'docker_host', description: 'Servidor Docker', defaultValue: 'srv-docker-prod-01' },
      { name: 'environment', description: 'Ambiente', defaultValue: 'Production' }
    ],
    mockData: {
      docker_version: 'Docker 26.1.4 (Engine Community)',
      running_containers: 28,
      stopped_containers: 2,
      paused_containers: 0,
      total_images: 42,
      memory_used: '18.4 GB / 32 GB (57%)',
      cpu_load: '34.2%',
      containers: [
        { name: 'nginx-reverse-proxy', image: 'nginx:1.25-alpine', status: 'Up 14 days', cpu: '1.2%', ram: '48 MB', ports: '80:80, 443:443' },
        { name: 'api-gateway-node', image: 'app/api:v3.1.2', status: 'Up 3 days', cpu: '14.8%', ram: '512 MB', ports: '3000:3000' },
        { name: 'redis-cache', image: 'redis:7.2-alpine', status: 'Up 14 days', cpu: '0.8%', ram: '1.2 GB', ports: '6379:6379' },
        { name: 'worker-queue-celery', image: 'app/worker:v3.1.2', status: 'Up 3 days', cpu: '18.4%', ram: '840 MB', ports: '-' }
      ]
    },
    htmlContent: `<div class="dk-wrap">
  <div class="dk-top">
    <div class="dk-brand">
      <span class="dk-icon">🐳</span>
      <div>
        <h3 class="dk-h3">\${docker_host} // DOCKER ENGINE</h3>
        <p class="dk-sub">{{docker_version}} • Env: \${environment}</p>
      </div>
    </div>
    <div class="dk-pill">● {{running_containers}} CONTAINERS ATIVOS</div>
  </div>

  <div class="dk-stats">
    <div class="dk-card">
      <span class="dk-label">CONTAINERS EM EXECUÇÃO</span>
      <div class="dk-val text-cyan">{{running_containers}} <span class="dk-unit">de {{total_images}} imagens</span></div>
      <div class="dk-meta">Parados: {{stopped_containers}} • Pausados: {{paused_containers}}</div>
    </div>
    <div class="dk-card">
      <span class="dk-label">CONSUMO DE MEMÓRIA (RAM)</span>
      <div class="dk-val text-purple">{{memory_used}}</div>
      <div class="dk-meta">Limite Total: 32 GB ECC</div>
    </div>
    <div class="dk-card">
      <span class="dk-label">CARGA DE CPU DO HOST</span>
      <div class="dk-val text-emerald">{{cpu_load}}</div>
      <div class="dk-meta">8 Cores x86_64</div>
    </div>
  </div>

  <div class="dk-table">
    <div class="dk-th">CONTAINERS PRINCIPAIS (STATUS & RECURSOS)</div>
    {{#each containers}}
    <div class="dk-tr">
      <span class="dk-name">{{this.name}}</span>
      <span class="dk-img">{{this.image}}</span>
      <span class="dk-ports">{{this.ports}}</span>
      <span class="dk-res text-cyan">{{this.cpu}}</span>
      <span class="dk-res text-purple">{{this.ram}}</span>
      <span class="dk-st">{{this.status}}</span>
    </div>
    {{/each}}
  </div>
</div>`,
    cssContent: `.dk-wrap {
  background: #070b14;
  border: 1px solid #0284c7;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.dk-top {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #1e293b; padding-bottom: 12px; margin-bottom: 14px;
}
.dk-brand { display: flex; align-items: center; gap: 10px; }
.dk-icon { font-size: 24px; }
.dk-h3 { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.dk-sub { margin: 2px 0 0 0; font-size: 11px; color: #38bdf8; font-family: monospace; }
.dk-pill {
  background: rgba(2, 132, 199, 0.2); border: 1px solid #0284c7; color: #38bdf8;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-family: monospace;
}
.dk-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 14px; }
.dk-card {
  background: #0c1527; border: 1px solid #1e293b; border-radius: 6px; padding: 12px;
}
.dk-label { font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase; }
.dk-val { font-size: 19px; font-weight: 800; margin: 4px 0; font-family: 'JetBrains Mono', monospace; }
.dk-unit { font-size: 11px; font-weight: 400; color: #64748b; }
.dk-meta { font-size: 10px; color: #64748b; font-family: monospace; }
.text-purple { color: #c084fc; }
.dk-table {
  background: #0a1120; border: 1px solid #1e293b; border-radius: 6px; padding: 10px;
}
.dk-th { font-size: 10px; font-weight: 800; color: #38bdf8; margin-bottom: 8px; font-family: monospace; }
.dk-tr {
  display: grid; grid-template-columns: 2fr 2fr 1.5fr 1fr 1fr 1.5fr;
  padding: 6px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; align-items: center; font-family: monospace;
}
.dk-tr:last-child { border-bottom: none; }
.dk-name { font-weight: 700; color: #fff; }
.dk-img { color: #94a3b8; }
.dk-ports { color: #64748b; }
.dk-st {
  background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;
  font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; width: fit-content;
}`
  },
  {
    id: 'linux-server-node',
    serviceName: 'Linux Enterprise Servers (RHEL / Ubuntu / Debian)',
    serviceLogo: 'Server',
    category: 'system',
    description: 'Monitoramento detalhado de nós Linux corporativos via Node Exporter: Carga (1m/5m/15m), I/O de disco (iowait), swap, uptime e status do systemd.',
    defaultThemeId: 'terminal-green',
    grafanaPanelTitle: 'Linux Host // System & Kernel Telemetry',
    tags: ['Linux', 'Ubuntu', 'RHEL', 'Debian', 'Node Exporter', 'Systemd', 'Disk IO'],
    suggestedMetrics: [
      'node_load1',
      'node_memory_MemAvailable_bytes',
      'node_filesystem_avail_bytes',
      'node_disk_io_time_seconds_total',
      'node_systemd_unit_state'
    ],
    dynamicVariables: [
      { name: 'hostname', description: 'Nome do Host Linux', defaultValue: 'app-srv-linux-01' },
      { name: 'mount_point', description: 'Ponto de Montagem', defaultValue: '/' }
    ],
    mockData: {
      kernel: 'Linux 6.8.0-40-generic x86_64 (Ubuntu 24.04 LTS)',
      uptime: '142 dias, 6 horas',
      load_avg: '0.42, 0.68, 0.55',
      cpu_cores: 16,
      ram_used: '14.2 GB / 64 GB (22%)',
      disk_root: '142 GB / 500 GB (28% Usado)',
      disk_iowait: '0.04%',
      failed_services: 0,
      open_files: '4,120 / 1,048,576',
      tcp_connections: '890 ESTABLISHED'
    },
    htmlContent: `<div class="lx-wrap">
  <div class="lx-head">
    <div class="lx-title-box">
      <span class="lx-term">🐧</span>
      <div>
        <h3 class="lx-h3">\${hostname} // LINUX SYSTEM NODE</h3>
        <p class="lx-sub">{{kernel}} • Uptime: {{uptime}}</p>
      </div>
    </div>
    <div class="lx-badge">● SYSTEMD ALL UNITS OK (0 FAILED)</div>
  </div>

  <div class="lx-cards">
    <div class="lx-card">
      <span class="lx-lbl">LOAD AVERAGE (1m / 5m / 15m)</span>
      <div class="lx-val text-emerald">{{load_avg}}</div>
      <div class="lx-meta">16 Cores • Capacidade normal</div>
    </div>
    <div class="lx-card">
      <span class="lx-lbl">MEMÓRIA RAM LIVRE</span>
      <div class="lx-val text-cyan">{{ram_used}}</div>
      <div class="lx-meta">Buffers / Cache: 18.2 GB</div>
    </div>
    <div class="lx-card">
      <span class="lx-lbl">DISCO RAIZ (\${mount_point})</span>
      <div class="lx-val text-amber">{{disk_root}}</div>
      <div class="lx-meta">NVMe I/O Wait: {{disk_iowait}}</div>
    </div>
    <div class="lx-card">
      <span class="lx-lbl">CONEXÕES & DESCRITORES</span>
      <div class="lx-val text-blue">{{tcp_connections}}</div>
      <div class="lx-meta">Open File Handles: {{open_files}}</div>
    </div>
  </div>
</div>`,
    cssContent: `.lx-wrap {
  background: #090a0f;
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #f8fafc;
}
.lx-head {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #1f2937; padding-bottom: 12px; margin-bottom: 14px;
}
.lx-title-box { display: flex; align-items: center; gap: 10px; }
.lx-term { font-size: 24px; }
.lx-h3 { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.lx-sub { margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; }
.lx-badge {
  background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px;
}
.lx-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.lx-card {
  background: #111420; border: 1px solid #1f2937; border-radius: 6px; padding: 12px;
}
.lx-lbl { font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
.lx-val { font-size: 18px; font-weight: 800; margin: 4px 0; }
.lx-meta { font-size: 10px; color: #94a3b8; }`
  },
  {
    id: 'windows-server-node',
    serviceName: 'Windows Server (WMI / Windows Exporter)',
    serviceLogo: 'Server',
    category: 'system',
    description: 'Telemetria para instâncias Windows Server: IIS Web Server, Serviços Windows, CPU, Pool de Memória Paginada e Latência de Disco C:/D:.',
    defaultThemeId: 'enterprise-slate',
    grafanaPanelTitle: 'Windows Server // OS & IIS Telemetry',
    tags: ['Windows', 'Windows Server', 'IIS', 'WMI', 'Windows Exporter', 'Services'],
    suggestedMetrics: [
      'windows_cpu_time_total',
      'windows_os_physical_memory_free_bytes',
      'windows_logical_disk_free_bytes',
      'windows_service_status',
      'windows_iis_current_connections'
    ],
    dynamicVariables: [
      { name: 'server_name', description: 'Nome do Servidor Windows', defaultValue: 'SRV-APP-WIN01' }
    ],
    mockData: {
      os_version: 'Windows Server 2022 Datacenter Edition',
      uptime: '48 dias, 12 horas',
      cpu_usage: '18.4%',
      ram_used: '22.8 GB / 32 GB (71%)',
      disk_c: '45 GB Livre de 120 GB',
      disk_d: '420 GB Livre de 1 TB',
      iis_connections: '342 conexões HTTP/S',
      critical_services_running: '18 / 18 Running'
    },
    htmlContent: `<div class="win-box">
  <div class="win-header">
    <div class="win-brand">
      <span class="win-logo">🪟</span>
      <div>
        <h3 class="win-h3">\${server_name} // WINDOWS SERVER</h3>
        <p class="win-sub">{{os_version}} • Uptime: {{uptime}}</p>
      </div>
    </div>
    <div class="win-status">● {{critical_services_running}}</div>
  </div>

  <div class="win-grid">
    <div class="win-card">
      <span class="win-label">USO DE CPU</span>
      <div class="win-val text-blue">{{cpu_usage}}</div>
      <div class="win-meta">Processos: 148 ativos</div>
    </div>
    <div class="win-card">
      <span class="win-label">MEMÓRIA RAM ALOCADA</span>
      <div class="win-val text-amber">{{ram_used}}</div>
      <div class="win-meta">Pagefile: 4.2 GB</div>
    </div>
    <div class="win-card">
      <span class="win-label">ARMAZENAMENTO C: & D:</span>
      <div class="win-val text-cyan">C: {{disk_c}}</div>
      <div class="win-meta">D: {{disk_d}}</div>
    </div>
    <div class="win-card">
      <span class="win-label">IIS WEB SERVER SESSIONS</span>
      <div class="win-val text-emerald">{{iis_connections}}</div>
      <div class="win-meta">AppPools: 4 Saudáveis</div>
    </div>
  </div>
</div>`,
    cssContent: `.win-box {
  background: #0b1120;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.win-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #1e293b; padding-bottom: 12px; margin-bottom: 14px;
}
.win-brand { display: flex; align-items: center; gap: 10px; }
.win-logo { font-size: 22px; }
.win-h3 { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.win-sub { margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; }
.win-status {
  background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; color: #60a5fa;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-family: monospace;
}
.win-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.win-card {
  background: #0f172a; border: 1px solid #1e293b; border-radius: 6px; padding: 12px;
}
.win-label { font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
.win-val { font-size: 19px; font-weight: 800; margin: 4px 0; font-family: 'JetBrains Mono', monospace; }
.win-meta { font-size: 10px; color: #94a3b8; font-family: monospace; }`
  },
  {
    id: 'network-printers-snmp',
    serviceName: 'Impressoras de Rede Corporativas (SNMP MIB)',
    serviceLogo: 'Server',
    category: 'enterprise-infra',
    description: 'Telemetria de parque de impressoras multifuncionais (HP / Kyocera / Ricoh / Xerox / Brother) via SNMP: Níveis de Toner CMYK, Papel nas bandejas, Contador de páginas e alertas de atolamento.',
    defaultThemeId: 'minimal-light',
    grafanaPanelTitle: 'Corporate Print Fleet // SNMP Status',
    tags: ['Impressoras', 'Printers', 'SNMP', 'Toner', 'Paper Tray', 'Hardware', 'Kyocera', 'HP', 'Ricoh', 'Xerox'],
    suggestedMetrics: [
      'snmp_printer_toner_black_pct',
      'snmp_printer_toner_cyan_pct',
      'snmp_printer_toner_magenta_pct',
      'snmp_printer_toner_yellow_pct',
      'snmp_printer_pages_printed_total',
      'snmp_printer_paper_tray_status'
    ],
    dynamicVariables: [
      { name: 'printer_ip', description: 'Endereço IP da Impressora', defaultValue: '192.168.10.150' },
      { name: 'department', description: 'Departamento / Andar', defaultValue: '3º Andar - Financeiro' }
    ],
    mockData: {
      model: 'Ricoh Aficio MP C3504 Multifuncional',
      location: 'Prédio Central • 3º Andar - Financeiro',
      status: 'PRONTA PARA IMPRESSÃO',
      total_pages: '148,920 páginas',
      paper_tray1: 'OK (A4 - 80% cheio)',
      paper_tray2: 'OK (A3 - 45% cheio)',
      toner_black: 82,
      toner_cyan: 64,
      toner_magenta: 28,
      toner_yellow: 14,
      alerts: 'Toner Amarelo Baixo (<15%) - Solicitar reposição'
    },
    htmlContent: `<div class="pr-box">
  <div class="pr-head">
    <div class="pr-title-block">
      <span class="pr-icon">🖨️</span>
      <div>
        <h3 class="pr-h3">{{model}} // \${printer_ip}</h3>
        <p class="pr-loc">\${department} • Total: {{total_pages}}</p>
      </div>
    </div>
    <div class="pr-status-ok">● {{status}}</div>
  </div>

  <!-- Toner Gauges Grid -->
  <div class="pr-toners-grid">
    <div class="pr-toner-card">
      <div class="pr-toner-top">
        <span class="pr-dot bg-black"></span>
        <span class="pr-toner-name">PRETO (K)</span>
        <span class="pr-toner-pct">{{toner_black}}%</span>
      </div>
      <div class="pr-bar-bg"><div class="pr-bar bg-black" style="width: {{toner_black}}%"></div></div>
    </div>

    <div class="pr-toner-card">
      <div class="pr-toner-top">
        <span class="pr-dot bg-cyan"></span>
        <span class="pr-toner-name">CIANO (C)</span>
        <span class="pr-toner-pct text-cyan">{{toner_cyan}}%</span>
      </div>
      <div class="pr-bar-bg"><div class="pr-bar bg-cyan" style="width: {{toner_cyan}}%"></div></div>
    </div>

    <div class="pr-toner-card">
      <div class="pr-toner-top">
        <span class="pr-dot bg-magenta"></span>
        <span class="pr-toner-name">MAGENTA (M)</span>
        <span class="pr-toner-pct text-magenta">{{toner_magenta}}%</span>
      </div>
      <div class="pr-bar-bg"><div class="pr-bar bg-magenta" style="width: {{toner_magenta}}%"></div></div>
    </div>

    <div class="pr-toner-card">
      <div class="pr-toner-top">
        <span class="pr-dot bg-yellow"></span>
        <span class="pr-toner-name">AMARELO (Y)</span>
        <span class="pr-toner-pct text-yellow">{{toner_yellow}}%</span>
      </div>
      <div class="pr-bar-bg"><div class="pr-bar bg-yellow" style="width: {{toner_yellow}}%"></div></div>
    </div>
  </div>

  <!-- Paper & Tray Info -->
  <div class="pr-footer">
    <div class="pr-tray-info">
      <span>📄 Bandeja 1: <strong>{{paper_tray1}}</strong></span>
      <span>📄 Bandeja 2: <strong>{{paper_tray2}}</strong></span>
    </div>
    {{#if alerts}}
    <div class="pr-alert-pill">⚠️ {{alerts}}</div>
    {{/if}}
  </div>
</div>`,
    cssContent: `.pr-box {
  background: #0f1117;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}
.pr-head {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #1e293b; padding-bottom: 12px; margin-bottom: 14px;
}
.pr-title-block { display: flex; align-items: center; gap: 10px; }
.pr-icon { font-size: 22px; }
.pr-h3 { margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #fff; }
.pr-loc { margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; }
.pr-status-ok {
  background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399;
  font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; font-family: monospace;
}
.pr-toners-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 14px; }
.pr-toner-card {
  background: #182234; border: 1px solid #1e293b; border-radius: 6px; padding: 10px;
}
.pr-toner-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.pr-toner-name { font-size: 10px; font-weight: 800; color: #cbd5e1; }
.pr-toner-pct { font-size: 11px; font-weight: 800; font-family: monospace; }
.pr-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.pr-bar-bg { height: 6px; background: #0b1120; border-radius: 3px; overflow: hidden; }
.pr-bar { height: 100%; border-radius: 3px; }
.bg-black { background: #94a3b8; }
.bg-cyan { background: #06b6d4; }
.bg-magenta { background: #ec4899; }
.bg-yellow { background: #eab308; }
.text-cyan { color: #06b6d4; }
.text-magenta { color: #ec4899; }
.text-yellow { color: #eab308; }
.pr-footer {
  display: flex; flex-direction: column; sm:flex-row; justify-content: space-between; align-items: flex-start; sm:items-center; gap: 8px;
  background: #090e17; padding: 8px 12px; border-radius: 6px; border: 1px solid #1e293b; font-size: 11px;
}
.pr-tray-info { display: flex; gap: 14px; color: #94a3b8; font-family: monospace; }
.pr-alert-pill { color: #f59e0b; font-weight: 700; font-size: 10px; font-family: monospace; }`
  }
];
