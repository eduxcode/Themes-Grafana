import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GrafanaTheme, ServicePreset } from '../types';
import { 
  Monitor, 
  Play, 
  Pause, 
  RotateCw, 
  Sliders, 
  Sparkles, 
  Layers, 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Moon, 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Printer, 
  Server, 
  Clock, 
  Filter, 
  ChevronDown, 
  Settings, 
  Share2, 
  Eye, 
  Code, 
  Palette, 
  Database,
  Grid,
  Square,
  HelpCircle,
  ExternalLink,
  Flame,
  CheckCircle2,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';

interface GrafanaSimulatorProps {
  theme: GrafanaTheme;
  onUpdateTheme: (updatedTheme: GrafanaTheme) => void;
  onOpenExport: () => void;
  allThemes?: GrafanaTheme[];
  onSelectAnotherTheme?: (theme: GrafanaTheme) => void;
}

// Preset Simulation Scenarios with rich varied telemetry data
interface SimulationScenario {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  dataOverrides: Record<string, any>;
  variables: Record<string, string>;
}

export const GrafanaSimulator: React.FC<GrafanaSimulatorProps> = ({
  theme,
  onUpdateTheme,
  onOpenExport,
  allThemes = [],
  onSelectAnotherTheme
}) => {
  // Grafana Simulator View Modes
  const [viewMode, setViewMode] = useState<'single' | 'dashboard'>('single');
  const [grafanaTheme, setGrafanaTheme] = useState<'dark' | 'light'>('dark');
  const [isKioskMode, setIsKioskMode] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [activeEditorTab, setActiveEditorTab] = useState<'visual' | 'html' | 'css' | 'json' | 'metrics'>('metrics');

  // Time Picker & Refresh State
  const [timeRange, setTimeRange] = useState('Últimos 15 min');
  const [refreshInterval, setRefreshInterval] = useState<number | 'off'>(5);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [refreshPulse, setRefreshPulse] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());

  // Interactive Variables State
  const [variables, setVariables] = useState<Record<string, string>>({
    '__dashboard.name': 'Enterprise Infrastructure & NOC Observability',
    '__org.name': 'Principal Corp Ops',
    'env': 'production',
    'datacenter': 'sa-east-1 (São Paulo)',
    'cluster': 'k8s-core-prod',
    'server': 'srv-app-prod-01',
    'timeframe': '15m'
  });

  // Live Editable Code & Style State (Synchronized in real-time)
  const [htmlCode, setHtmlCode] = useState(theme.htmlContent);
  const [cssCode, setCssCode] = useState(theme.cssContent);
  const [accentColor, setAccentColor] = useState(theme.accentColor || '#f97316');
  const [backgroundColor, setBackgroundColor] = useState(theme.backgroundColor || '#090d16');
  const [fontFamily, setFontFamily] = useState(theme.fontFamily || "'Plus Jakarta Sans', sans-serif");
  const [borderRadius, setBorderRadius] = useState(parseInt(theme.borderRadius) || 8);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic Live Metric Sliders State
  const [cpuSlider, setCpuSlider] = useState(48);
  const [memSlider, setMemSlider] = useState(62);
  const [latencySlider, setLatencySlider] = useState(24);
  const [statusSlider, setStatusSlider] = useState<'HEALTHY' | 'WARNING' | 'CRITICAL'>('HEALTHY');
  const [errorCountSlider, setErrorCountSlider] = useState(0);

  // Active Scenario
  const [activeScenarioId, setActiveScenarioId] = useState<string>('healthy');

  // Keep state synchronized when parent theme changes
  useEffect(() => {
    setHtmlCode(theme.htmlContent);
    setCssCode(theme.cssContent);
    setAccentColor(theme.accentColor || '#f97316');
    setBackgroundColor(theme.backgroundColor || '#090d16');
    setFontFamily(theme.fontFamily || "'Plus Jakarta Sans', sans-serif");
    setBorderRadius(parseInt(theme.borderRadius) || 8);
  }, [theme.id]);

  // Scenarios with rich corporate telemetry
  const scenarios: SimulationScenario[] = useMemo(() => [
    {
      id: 'healthy',
      name: 'Produção Saudável (Green State / 100% SLA)',
      badge: '99.99% UPTIME',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
      description: 'Cenário nominal com baixa latência, todos os microsserviços online e uso balanceado.',
      variables: {
        'env': 'production',
        'datacenter': 'sa-east-1 (São Paulo)',
        'cluster': 'k8s-core-prod',
        'server': 'srv-app-prod-01'
      },
      dataOverrides: {
        status: 'HEALTHY',
        active_status: 'HEALTHY',
        cpu: 24.5,
        cpu_usage: 24.5,
        memory: 38.2,
        mem_usage: 38.2,
        latency: 14,
        uptime: '99.995%',
        error_rate: '0.001%',
        errors_total: 0,
        requests_per_sec: '14.8k req/s',
        total_requests: '1.42M',
        locked_accounts: 0,
        bad_password_attempts: 12,
        replication_status: 'SYNC_OK',
        active_sessions: 2840,
        threats_blocked: 142,
        vpn_tunnels_up: '8 / 8 TÚNEIS',
        disks: [
          { mount: '/ (root)', fstype: 'ext4', total: '100GB', free: '68GB', used_pct: 32 },
          { mount: '/var/log', fstype: 'xfs', total: '250GB', free: '185GB', used_pct: 26 },
          { mount: '/data/pg_wal', fstype: 'ext4', total: '500GB', free: '380GB', used_pct: 24 }
        ],
        services: [
          { name: 'Auth Service', status: 'ok', latency: '8ms' },
          { name: 'Payments API', status: 'ok', latency: '16ms' },
          { name: 'Redis Cache', status: 'ok', latency: '0.9ms' },
          { name: 'Order Engine', status: 'ok', latency: '22ms' },
          { name: 'Push Delivery', status: 'ok', latency: '12ms' }
        ]
      }
    },
    {
      id: 'critical-load',
      name: 'Incidente Crítico / Alta Sobrecarga (SOC Alert)',
      badge: 'ALERTA NÍVEL 1',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      icon: Flame,
      description: 'Sobrecarga de CPU acima de 95%, latência degradada e partição de logs quase esgotada.',
      variables: {
        'env': 'production',
        'datacenter': 'us-east-1 (N. Virginia)',
        'cluster': 'k8s-payments-cluster',
        'server': 'srv-app-prod-04'
      },
      dataOverrides: {
        status: 'CRITICAL',
        active_status: 'CRITICAL',
        cpu: 96.8,
        cpu_usage: 96.8,
        memory: 94.1,
        mem_usage: 94.1,
        latency: 480,
        uptime: '98.12%',
        error_rate: '4.82%',
        errors_total: 842,
        requests_per_sec: '48.9k req/s',
        total_requests: '4.85M',
        locked_accounts: 14,
        bad_password_attempts: 492,
        replication_status: 'LAG_DETECTED',
        active_sessions: 38400,
        threats_blocked: 1840,
        vpn_tunnels_up: '5 / 8 TÚNEIS',
        disks: [
          { mount: '/ (root)', fstype: 'ext4', total: '100GB', free: '8GB', used_pct: 92 },
          { mount: '/var/log', fstype: 'xfs', total: '250GB', free: '11GB', used_pct: 96 },
          { mount: '/data/pg_wal', fstype: 'ext4', total: '500GB', free: '45GB', used_pct: 91 }
        ],
        services: [
          { name: 'Auth Service', status: 'warn', latency: '185ms' },
          { name: 'Payments API', status: 'crit', latency: '680ms' },
          { name: 'Redis Cache', status: 'ok', latency: '4.2ms' },
          { name: 'Order Engine', status: 'crit', latency: '1240ms' },
          { name: 'Push Delivery', status: 'warn', latency: '340ms' }
        ]
      }
    },
    {
      id: 'high-traffic',
      name: 'Pico de Tráfego / Black Friday (Alta Concorrência)',
      badge: '2.4M REQ/MIN',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: Zap,
      description: 'Volume extremo de transações com cache otimizado e balanceamento ativo.',
      variables: {
        'env': 'production',
        'datacenter': 'sa-east-1 (São Paulo)',
        'cluster': 'k8s-edge-ingress',
        'server': 'edge-gateway-pool'
      },
      dataOverrides: {
        status: 'HEALTHY',
        active_status: 'HEALTHY',
        cpu: 72.4,
        cpu_usage: 72.4,
        memory: 78.5,
        mem_usage: 78.5,
        latency: 32,
        uptime: '99.98%',
        error_rate: '0.04%',
        errors_total: 18,
        requests_per_sec: '84.2k req/s',
        total_requests: '18.4M',
        active_sessions: 62400,
        cache_hit_ratio: '99.4%',
        throughput: '8.4 Gbps',
        disks: [
          { mount: '/ (root)', fstype: 'ext4', total: '100GB', free: '45GB', used_pct: 55 },
          { mount: '/var/log', fstype: 'xfs', total: '250GB', free: '80GB', used_pct: 68 }
        ]
      }
    },
    {
      id: 'security-ad-soc',
      name: 'Auditoria de Segurança AD DS & Firewall NGFW',
      badge: 'SOC AUDIT',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: ShieldAlert,
      description: 'Detecção de tentativas de força bruta Kerberos/NTLM e IPs em quarentena.',
      variables: {
        'env': 'production',
        'datacenter': 'dc-corp-datacenter',
        'cluster': 'ad-forest-root',
        'server': 'dc01.corp.enterprise.local'
      },
      dataOverrides: {
        domain_name: 'CORP.ENTERPRISE.LOCAL',
        locked_accounts: 7,
        bad_password_attempts: 348,
        replication_status: 'SYNC_OK',
        krbtgt_age_days: 94,
        status: 'WARNING',
        threats_blocked: 489,
        active_sessions: 4200,
        vpn_users_connected: 184
      }
    },
    {
      id: 'snmp-printers',
      name: 'Parque de Impressoras Corporativas (SNMP MIB)',
      badge: 'HARDWARE SNMP',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: Printer,
      description: 'Monitoramento de consumíveis, toner CMYK e bandejas de papel com alerta de substituição.',
      variables: {
        'env': 'corporate-lan',
        'datacenter': 'office-floor-03',
        'cluster': 'print-server-pool',
        'server': 'hp-m630-reception'
      },
      dataOverrides: {
        printer_name: 'HP LaserJet Enterprise MFP M630',
        ip_address: '192.168.10.45',
        status: 'WARNING',
        cyan: 68,
        magenta: 54,
        yellow: 8, // Alerta baixo!
        black: 91,
        pages_printed_total: '184.290',
        tray_status: 'Bandeja 2 (A4): VAZIA'
      }
    },
    {
      id: 'null-data-fallback',
      name: 'Falha Parcial / Dados Nulos (Teste de Resiliência Zabbix)',
      badge: 'RESILIÊNCIA N/D',
      badgeColor: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30',
      icon: AlertTriangle,
      description: 'Simula campos nulos/indefinidos para testar se os componentes exibem "N/D" sem quebrar.',
      variables: {
        'env': 'staging-dr',
        'datacenter': 'dr-site-backup',
        'cluster': 'zabbix-proxy-failover',
        'server': 'srv-standby-09'
      },
      dataOverrides: {
        status: undefined,
        active_status: null,
        cpu: undefined,
        cpu_usage: null,
        memory: undefined,
        mem_usage: null,
        latency: null,
        uptime: undefined,
        locked_accounts: null,
        bad_password_attempts: undefined,
        disks: []
      }
    }
  ], []);

  // Compute merged mock data combining active scenario + live slider overrides + theme base
  const mergedMockData = useMemo(() => {
    const scenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
    const base = { ...theme.mockData, ...scenario.dataOverrides };

    // Apply interactive slider overrides
    if (base.cpu !== undefined) base.cpu = cpuSlider;
    if (base.cpu_usage !== undefined) base.cpu_usage = cpuSlider;
    if (base.memory !== undefined) base.memory = memSlider;
    if (base.mem_usage !== undefined) base.mem_usage = memSlider;
    if (base.latency !== undefined) base.latency = latencySlider;
    if (base.errors_total !== undefined) base.errors_total = errorCountSlider;
    if (base.status !== undefined) base.status = statusSlider;
    if (base.active_status !== undefined) base.active_status = statusSlider;

    return base;
  }, [theme.mockData, activeScenarioId, scenarios, cpuSlider, memSlider, latencySlider, statusSlider, errorCountSlider]);

  // Evaluate template with current mockData and variables
  const renderedHtml = useMemo(() => {
    return renderBusinessTemplate(htmlCode, mergedMockData, variables);
  }, [htmlCode, mergedMockData, variables]);

  // Auto-refresh timer or live simulation tick
  useEffect(() => {
    if (refreshInterval === 'off' && !isLiveStreaming) return;

    const intervalMs = isLiveStreaming ? 2000 : (Number(refreshInterval) * 1000);
    const timer = setInterval(() => {
      setRefreshPulse(true);
      setLastRefreshedAt(new Date());

      // If live streaming, subtly oscillate CPU and Latency metrics
      if (isLiveStreaming) {
        setCpuSlider((prev) => {
          const delta = (Math.random() * 6 - 3);
          return Math.min(99, Math.max(10, Math.round(prev + delta)));
        });
        setLatencySlider((prev) => {
          const delta = (Math.random() * 8 - 4);
          return Math.min(600, Math.max(8, Math.round(prev + delta)));
        });
      }

      setTimeout(() => setRefreshPulse(false), 600);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [refreshInterval, isLiveStreaming]);

  // Handle Scenario Selection
  const handleSelectScenario = (scenario: SimulationScenario) => {
    setActiveScenarioId(scenario.id);
    setVariables((prev) => ({ ...prev, ...scenario.variables }));
    
    // Set slider presets from scenario
    if (scenario.dataOverrides.cpu !== undefined) {
      setCpuSlider(Number(scenario.dataOverrides.cpu));
    }
    if (scenario.dataOverrides.latency !== undefined) {
      setLatencySlider(Number(scenario.dataOverrides.latency));
    }
    if (scenario.dataOverrides.status !== undefined) {
      setStatusSlider(scenario.dataOverrides.status);
    }
  };

  // Sync edits back to parent theme in real time
  const handleSyncToTheme = (updatedProps: Partial<GrafanaTheme>) => {
    const updated: GrafanaTheme = {
      ...theme,
      htmlContent: htmlCode,
      cssContent: cssCode,
      accentColor,
      backgroundColor,
      fontFamily,
      borderRadius: `${borderRadius}px`,
      ...updatedProps
    };
    onUpdateTheme(updated);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="grafana-simulator-container" className="space-y-4">
      {/* Simulation Master Header Toolbar */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>Simulador de Painel Grafana v12+</span>
              <span className="text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-sm">
                Ambiente Realista
              </span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-normal">
            Visualize o tema exatamente como ele é renderizado dentro do Grafana. Edite códigos ou parâmetros e veja as alterações em <strong>tempo real</strong>.
          </p>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
          {/* Live Telemetry Streaming Toggle */}
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border transition-all ${
              isLiveStreaming
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'bg-black text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
            title="Simula streaming de dados contínuo a cada 2 segundos"
          >
            <Activity className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-bounce' : ''}`} />
            <span>{isLiveStreaming ? 'Live Stream Ativo' : 'Simular Telemetria'}</span>
          </button>

          {/* Grafana Light / Dark Theme Switcher */}
          <div className="flex items-center bg-black border border-zinc-800 rounded-sm p-0.5">
            <button
              onClick={() => setGrafanaTheme('dark')}
              className={`p-1.5 rounded-sm transition-colors ${
                grafanaTheme === 'dark' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Grafana Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setGrafanaTheme('light')}
              className={`p-1.5 rounded-sm transition-colors ${
                grafanaTheme === 'light' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Grafana Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Mode Toggle (Single vs Multi-Dashboard) */}
          <div className="flex items-center bg-black border border-zinc-800 rounded-sm p-0.5">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                viewMode === 'single' ? 'bg-orange-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Square className="w-3 h-3" />
              <span>Painel Foco</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                viewMode === 'dashboard' ? 'bg-orange-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Dashboard Completo</span>
            </button>
          </div>

          {/* Kiosk Mode */}
          <button
            onClick={() => setIsKioskMode(!isKioskMode)}
            className={`p-2 rounded-sm border text-xs font-black uppercase tracking-wider transition-colors ${
              isKioskMode ? 'bg-orange-500 text-black border-orange-400' : 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Modo Kiosk (TV / Telão de Monitoramento)"
          >
            {isKioskMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Toggle Live Editor Drawer */}
          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border transition-colors ${
              isEditorOpen ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-orange-500 text-black border-orange-400'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isEditorOpen ? 'Ocultar Editor' : 'Abrir Editor ao Vivo'}</span>
          </button>
        </div>
      </div>

      {/* Scenarios & Diverse Metrics Switcher Bar */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Cenários de Telemetria &amp; Casos Reais:</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Alterne entre estados saudáveis, picos de tráfego, incidentes e dados nulos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`flex flex-col text-left p-2 rounded-sm border transition-all ${
                  isSelected
                    ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.15)] ring-1 ring-orange-500'
                    : 'bg-black/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-zinc-500'}`} />
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-sm border ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                </div>
                <span className={`text-[11px] font-bold tracking-tight line-clamp-1 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {sc.name.split(' (')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Viewport + Interactive Editor Dock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Grafana Realistic UI Frame */}
        <div className={`${isEditorOpen ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-200`}>
          <div 
            className={`rounded-sm border overflow-hidden shadow-2xl transition-colors duration-200 ${
              grafanaTheme === 'dark' 
                ? 'bg-[#111217] border-zinc-800 text-[#c7d0d9]' 
                : 'bg-[#f4f5f7] border-zinc-300 text-[#22252b]'
            }`}
          >
            {/* Grafana Navigation Top Bar (unless Kiosk Mode) */}
            {!isKioskMode && (
              <div 
                className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
                  grafanaTheme === 'dark' ? 'bg-[#181b1f] border-[#22252b]' : 'bg-[#ffffff] border-[#d8d9da]'
                }`}
              >
                {/* Breadcrumb & Dashboard Title */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center font-black text-black text-[10px]">
                    G
                  </div>
                  <span className="opacity-60 text-xs font-medium">Dashboards /</span>
                  <span className="font-bold text-xs">{variables['__dashboard.name']}</span>
                </div>

                {/* Dashboard Controls (Time range, Auto-Refresh, Variables) */}
                <div className="flex items-center gap-2 text-xs">
                  {/* Time Range Selector */}
                  <div 
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-xs font-mono ${
                      grafanaTheme === 'dark' ? 'bg-[#111217] border-[#2c3235]' : 'bg-[#f4f5f7] border-[#d8d9da]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>{timeRange}</span>
                  </div>

                  {/* Refresh Interval Selector & Pulsing Spinner */}
                  <div 
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-xs font-mono ${
                      grafanaTheme === 'dark' ? 'bg-[#111217] border-[#2c3235]' : 'bg-[#f4f5f7] border-[#d8d9da]'
                    }`}
                  >
                    <RotateCw className={`w-3 h-3 text-orange-500 ${refreshPulse ? 'animate-spin text-orange-400' : ''}`} />
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(e.target.value === 'off' ? 'off' : Number(e.target.value))}
                      className="bg-transparent text-xs font-mono focus:outline-none cursor-pointer"
                    >
                      <option value={2} className="bg-[#181b1f] text-white">2s (Fast)</option>
                      <option value={5} className="bg-[#181b1f] text-white">5s (Padrão)</option>
                      <option value={10} className="bg-[#181b1f] text-white">10s</option>
                      <option value={30} className="bg-[#181b1f] text-white">30s</option>
                      <option value="off" className="bg-[#181b1f] text-white">Pausado</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Grafana Variables Dropdown Row */}
            {!isKioskMode && (
              <div 
                className={`px-4 py-2 border-b flex flex-wrap items-center gap-3 text-xs ${
                  grafanaTheme === 'dark' ? 'bg-[#14161a] border-[#22252b]' : 'bg-[#f9fafb] border-[#e5e7eb]'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px] font-mono opacity-70">
                  <Filter className="w-3 h-3 text-orange-500" />
                  <span>Variáveis:</span>
                </div>

                {/* Variable 1: Environment */}
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="opacity-60">$env:</span>
                  <select
                    value={variables['env']}
                    onChange={(e) => setVariables({ ...variables, env: e.target.value })}
                    className={`px-2 py-0.5 rounded-sm border font-mono text-xs focus:outline-none ${
                      grafanaTheme === 'dark' ? 'bg-[#111217] border-[#2c3235] text-orange-400' : 'bg-white border-[#d8d9da] text-orange-600'
                    }`}
                  >
                    <option value="production">production</option>
                    <option value="staging">staging</option>
                    <option value="dr-failover">dr-failover</option>
                  </select>
                </div>

                {/* Variable 2: Datacenter */}
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="opacity-60">$datacenter:</span>
                  <select
                    value={variables['datacenter']}
                    onChange={(e) => setVariables({ ...variables, datacenter: e.target.value })}
                    className={`px-2 py-0.5 rounded-sm border font-mono text-xs focus:outline-none ${
                      grafanaTheme === 'dark' ? 'bg-[#111217] border-[#2c3235] text-orange-400' : 'bg-white border-[#d8d9da] text-orange-600'
                    }`}
                  >
                    <option value="sa-east-1 (São Paulo)">sa-east-1 (São Paulo)</option>
                    <option value="us-east-1 (N. Virginia)">us-east-1 (N. Virginia)</option>
                    <option value="eu-west-1 (Frankfurt)">eu-west-1 (Frankfurt)</option>
                  </select>
                </div>

                {/* Variable 3: Host / Server */}
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <span className="opacity-60">$server:</span>
                  <select
                    value={variables['server']}
                    onChange={(e) => setVariables({ ...variables, server: e.target.value })}
                    className={`px-2 py-0.5 rounded-sm border font-mono text-xs focus:outline-none ${
                      grafanaTheme === 'dark' ? 'bg-[#111217] border-[#2c3235] text-orange-400' : 'bg-white border-[#d8d9da] text-orange-600'
                    }`}
                  >
                    <option value="srv-app-prod-01">srv-app-prod-01</option>
                    <option value="srv-app-prod-02">srv-app-prod-02</option>
                    <option value="fw-core-cluster">fw-core-cluster</option>
                    <option value="dc01.ad.local">dc01.ad.local</option>
                  </select>
                </div>
              </div>
            )}

            {/* Dashboard Canvas Area */}
            <div className="p-3 sm:p-4 space-y-4">
              {/* If Dashboard Mode: Show surrounding Grafana standard panels (TimeSeries & Gauge) */}
              {viewMode === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Mock TimeSeries Panel */}
                  <div 
                    className={`p-3 rounded-sm border ${
                      grafanaTheme === 'dark' ? 'bg-[#181b1f] border-[#22252b]' : 'bg-white border-[#e5e7eb]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        <span>Tráfego Ingress &amp; Latência P99 [Prometheus]</span>
                      </span>
                      <span className="text-[10px] font-mono opacity-60">avg: {latencySlider}ms</span>
                    </div>
                    {/* SVG Simulated TimeSeries Line */}
                    <div className="h-20 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="tsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M0,60 Q50,${80 - cpuSlider * 0.6} 100,${70 - cpuSlider * 0.4} T200,${85 - cpuSlider * 0.7} T300,${65 - cpuSlider * 0.5} L300,80 L0,80 Z`}
                          fill="url(#tsGrad)"
                        />
                        <path
                          d={`M0,60 Q50,${80 - cpuSlider * 0.6} 100,${70 - cpuSlider * 0.4} T200,${85 - cpuSlider * 0.7} T300,${65 - cpuSlider * 0.5}`}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Mock Stat Panel */}
                  <div 
                    className={`p-3 rounded-sm border flex items-center justify-between ${
                      grafanaTheme === 'dark' ? 'bg-[#181b1f] border-[#22252b]' : 'bg-white border-[#e5e7eb]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold mb-1">CONEXÕES ATIVAS TCP</div>
                      <div className="text-2xl font-black font-mono text-emerald-400">
                        {(cpuSlider * 140 + 1200).toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono opacity-60 mt-1">Pool PostgreSQL + Nginx Gateway</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] font-bold font-mono px-2 py-1 rounded-sm ${
                        statusSlider === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {statusSlider}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Simulated Panel (Volkov Labs Business Text) */}
              <div 
                className={`rounded-sm border relative shadow-md transition-all ${
                  grafanaTheme === 'dark' ? 'bg-[#181b1f] border-[#2c3235]' : 'bg-white border-[#d8d9da]'
                }`}
              >
                {/* Real Grafana Panel Header Chrome */}
                <div 
                  className={`px-3 py-2 border-b flex items-center justify-between text-xs select-none ${
                    grafanaTheme === 'dark' ? 'border-[#22252b] bg-[#1c2024]' : 'border-[#e5e7eb] bg-[#f9fafb]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="font-bold uppercase tracking-tight text-xs">
                      {theme.name}
                    </span>
                    <span className="text-[9px] font-mono opacity-50 border border-current px-1 rounded-sm">
                      Business Text
                    </span>
                  </div>

                  <div className="flex items-center gap-2 opacity-70 text-xs">
                    <span className="text-[10px] font-mono">24ms query</span>
                    <Settings className="w-3.5 h-3.5 cursor-pointer hover:opacity-100" title="Configurações do Painel" />
                  </div>
                </div>

                {/* Panel Body with Dynamic HTML & CSS Injected */}
                <div className="p-4 overflow-x-auto custom-scrollbar min-h-[160px]">
                  {/* Scoped CSS Injected Dynamically */}
                  <style>{cssCode}</style>
                  {/* Rendered HTML */}
                  <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                </div>

                {/* Panel Footer Toolbar / Query Info */}
                <div 
                  className={`px-3 py-1.5 border-t flex items-center justify-between text-[10px] font-mono select-none opacity-60 ${
                    grafanaTheme === 'dark' ? 'border-[#22252b] bg-[#14161a]' : 'border-[#e5e7eb] bg-[#f9fafb]'
                  }`}
                >
                  <span>Data Source: <strong>Prometheus-Enterprise-01</strong></span>
                  <span>Última atualização: {lastRefreshedAt.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Interactive Editor Dock */}
        {isEditorOpen && (
          <div className="lg:col-span-4 bg-[#0c0c0e] border border-zinc-800 rounded-sm overflow-hidden space-y-0">
            {/* Editor Tabs Navigation */}
            <div className="flex items-center bg-black border-b border-zinc-800 p-1">
              <button
                onClick={() => setActiveEditorTab('metrics')}
                className={`flex-1 py-1.5 px-2 text-center text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                  activeEditorTab === 'metrics' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Métricas
              </button>
              <button
                onClick={() => setActiveEditorTab('visual')}
                className={`flex-1 py-1.5 px-2 text-center text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                  activeEditorTab === 'visual' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Estilos
              </button>
              <button
                onClick={() => setActiveEditorTab('html')}
                className={`flex-1 py-1.5 px-2 text-center text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                  activeEditorTab === 'html' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveEditorTab('css')}
                className={`flex-1 py-1.5 px-2 text-center text-xs font-black uppercase tracking-wider rounded-sm transition-colors ${
                  activeEditorTab === 'css' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                CSS
              </button>
            </div>

            {/* TAB 1: Live Interactive Metrics Controls */}
            {activeEditorTab === 'metrics' && (
              <div className="p-4 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="font-black uppercase tracking-wider text-zinc-300">Controles de Métricas ao Vivo</span>
                  <span className="text-[10px] font-mono text-orange-400">Tempo Real</span>
                </div>

                {/* Slider: CPU */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Uso de CPU:</span>
                    <span className={`font-bold ${cpuSlider > 85 ? 'text-red-400' : cpuSlider > 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {cpuSlider}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={cpuSlider}
                    onChange={(e) => setCpuSlider(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-zinc-800 cursor-pointer h-1.5 rounded-sm"
                  />
                </div>

                {/* Slider: Memória */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Uso de Memória:</span>
                    <span className={`font-bold ${memSlider > 85 ? 'text-red-400' : 'text-blue-400'}`}>
                      {memSlider}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={memSlider}
                    onChange={(e) => setMemSlider(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-zinc-800 cursor-pointer h-1.5 rounded-sm"
                  />
                </div>

                {/* Slider: Latência */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Latência P99:</span>
                    <span className="font-bold text-orange-400 font-mono">{latencySlider} ms</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="600"
                    value={latencySlider}
                    onChange={(e) => setLatencySlider(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-zinc-800 cursor-pointer h-1.5 rounded-sm"
                  />
                </div>

                {/* Status Switcher */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-zinc-400 block font-mono">Status Operacional do Serviço:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['HEALTHY', 'WARNING', 'CRITICAL'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusSlider(st)}
                        className={`py-1.5 px-2 rounded-sm font-mono text-[10px] font-bold border transition-all ${
                          statusSlider === st
                            ? st === 'HEALTHY'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                              : st === 'WARNING'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                              : 'bg-red-500/20 text-red-300 border-red-500'
                            : 'bg-black text-zinc-500 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Theme Switcher in Simulation */}
                {allThemes.length > 0 && onSelectAnotherTheme && (
                  <div className="pt-3 border-t border-zinc-800 space-y-1.5">
                    <span className="text-zinc-400 block font-mono text-[11px]">Trocar Tema no Simulador:</span>
                    <select
                      value={theme.id}
                      onChange={(e) => {
                        const found = allThemes.find((t) => t.id === e.target.value);
                        if (found) onSelectAnotherTheme(found);
                      }}
                      className="w-full bg-black border border-zinc-800 rounded-sm p-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-orange-500"
                    >
                      {allThemes.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Visual Style Customizer */}
            {activeEditorTab === 'visual' && (
              <div className="p-4 space-y-4 text-xs">
                {/* Accent Color Palette */}
                <div className="space-y-2">
                  <span className="text-zinc-400 block font-mono">Cor de Destaque (Accent Color):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => {
                        setAccentColor(e.target.value);
                        handleSyncToTheme({ accentColor: e.target.value });
                      }}
                      className="w-8 h-8 rounded-sm bg-transparent cursor-pointer border border-zinc-700"
                    />
                    <span className="font-mono text-xs text-zinc-300 uppercase">{accentColor}</span>
                  </div>
                  {/* Preset color swatches */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['#f97316', '#38bdf8', '#10b981', '#ec4899', '#8b5cf6', '#eab308', '#00e5ff', '#ef4444'].map((col) => (
                      <button
                        key={col}
                        onClick={() => {
                          setAccentColor(col);
                          handleSyncToTheme({ accentColor: col });
                        }}
                        style={{ backgroundColor: col }}
                        className="w-5 h-5 rounded-sm border border-black/40 hover:scale-110 transition-transform"
                      />
                    ))}
                  </div>
                </div>

                {/* Font Family Selector */}
                <div className="space-y-1.5">
                  <span className="text-zinc-400 block font-mono">Família Tipográfica:</span>
                  <select
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value);
                      handleSyncToTheme({ fontFamily: e.target.value });
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-sm p-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-orange-500"
                  >
                    <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Moderna)</option>
                    <option value="'JetBrains Mono', monospace">JetBrains Mono (DevOps / SOC)</option>
                    <option value="'Inter', sans-serif">Inter (Limpa / Enterprise)</option>
                    <option value="'Fira Code', monospace">Fira Code (Terminal)</option>
                    <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech)</option>
                  </select>
                </div>

                {/* Border Radius */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">Cantos Arredondados:</span>
                    <span className="font-bold text-orange-400 font-mono">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={borderRadius}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBorderRadius(val);
                      handleSyncToTheme({ borderRadius: `${val}px` });
                    }}
                    className="w-full accent-orange-500 bg-zinc-800 cursor-pointer h-1.5 rounded-sm"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Live HTML Editor */}
            {activeEditorTab === 'html' && (
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Template Handlebars (Tempo Real):</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-orange-400 hover:underline"
                  >
                    {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <textarea
                  value={htmlCode}
                  onChange={(e) => {
                    setHtmlCode(e.target.value);
                    handleSyncToTheme({ htmlContent: e.target.value });
                  }}
                  rows={14}
                  className="w-full bg-black border border-zinc-800 rounded-sm p-2.5 font-mono text-[11px] text-zinc-200 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
                />
              </div>
            )}

            {/* TAB 4: Live CSS Editor */}
            {activeEditorTab === 'css' && (
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>CSS Scoped (Injeção Instantânea):</span>
                  <span className="text-[10px] text-emerald-400">✓ Scoped</span>
                </div>
                <textarea
                  value={cssCode}
                  onChange={(e) => {
                    setCssCode(e.target.value);
                    handleSyncToTheme({ cssContent: e.target.value });
                  }}
                  rows={14}
                  className="w-full bg-black border border-zinc-800 rounded-sm p-2.5 font-mono text-[11px] text-orange-300 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
                />
              </div>
            )}

            {/* Editor Footer Actions */}
            <div className="p-3 bg-black border-t border-zinc-800 flex items-center justify-between gap-2">
              <button
                onClick={onOpenExport}
                className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-wider py-2 px-3 rounded-sm text-xs transition-transform active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Painel JSON</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
