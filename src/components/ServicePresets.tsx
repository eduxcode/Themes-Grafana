import React, { useState } from 'react';
import { ServicePreset, ServiceCategory } from '../types';
import { 
  Database, 
  Zap, 
  Layers, 
  Globe, 
  Server, 
  Play, 
  Code, 
  Terminal, 
  Download,
  Info,
  Monitor
} from 'lucide-react';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';

interface ServicePresetsProps {
  presets: ServicePreset[];
  onSelectPreset: (preset: ServicePreset) => void;
  onExportPreset: (preset: ServicePreset) => void;
  onOpenAiGenerator: (prefillServiceName?: string) => void;
}

export const ServicePresets: React.FC<ServicePresetsProps> = ({
  presets,
  onSelectPreset,
  onExportPreset,
  onOpenAiGenerator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activePresetPreview, setActivePresetPreview] = useState<ServicePreset>(presets[0]);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'Todos os Serviços' },
    { id: 'enterprise-infra', label: 'Infra & Active Directory & Impressoras' },
    { id: 'security', label: 'Segurança & Fortinet' },
    { id: 'containers', label: 'Docker & Kubernetes' },
    { id: 'database', label: 'Bancos de Dados' },
    { id: 'networking', label: 'Redes & Edge' },
    { id: 'system', label: 'Linux, Windows & Hypervisors' },
  ];

  const filteredPresets = presets.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const getServiceIcon = (logo: string) => {
    switch (logo) {
      case 'Database': return <Database className="w-4 h-4 text-orange-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'Layers': return <Layers className="w-4 h-4 text-orange-500" />;
      case 'Globe': return <Globe className="w-4 h-4 text-orange-500" />;
      case 'Server': return <Server className="w-4 h-4 text-orange-500" />;
      default: return <Database className="w-4 h-4 text-orange-500" />;
    }
  };

  const currentPreviewHtml = renderBusinessTemplate(
    activePresetPreview.htmlContent,
    activePresetPreview.mockData,
    { db_instance: 'pg-prod-01', database_name: 'production_main', redis_cluster: 'redis-cache-01', namespace: 'production', gateway_host: 'api.empresa.com.br', pve_node: 'pve-host-01' }
  );

  return (
    <div id="service-presets-container" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <Server className="w-3 h-3" />
            <span>Padrões de Engenharia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic text-white">
            SERVICE <span className="text-orange-500">PRESETS</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
            Painéis concebidos especificamente para métricas-chave (Postgres TPS, Redis Hit Rate, Pods Kubernetes, Cloudflare WAF e Proxmox Hypervisors).
          </p>
        </div>

        <button
          onClick={() => onOpenAiGenerator()}
          className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Criar Outro Serviço com IA</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-orange-500 text-black shadow-sm'
                : 'bg-[#0c0c0e] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Split Grid: Left Service Selector List | Right Interactive Preview & PromQL inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Service Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredPresets.map((preset) => {
            const isSelected = activePresetPreview.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => setActivePresetPreview(preset)}
                className={`p-4 rounded-sm border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#18181b] border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.2)]'
                    : 'bg-[#0c0c0e] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-sm bg-zinc-900 border border-zinc-800">
                      {getServiceIcon(preset.serviceLogo)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight text-white">{preset.serviceName}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{preset.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    {preset.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded-sm border border-zinc-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPreset(preset);
                      }}
                      className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-orange-500 text-zinc-200 hover:text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm border border-zinc-800 hover:border-orange-500 transition-all"
                    >
                      <Play className="w-2.5 h-2.5" />
                      <span>Playground</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportPreset(preset);
                      }}
                      className="p-1 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                      title="Exportar Painel"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Render & Suggested Metric Queries */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Preset Preview Box */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm overflow-hidden">
            <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500"></span>
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  PREVIEW: {activePresetPreview.serviceName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectPreset(activePresetPreview)}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all shadow-sm"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Simular no Grafana</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-black overflow-x-auto min-h-[260px]">
              <style>{activePresetPreview.cssContent}</style>
              <div dangerouslySetInnerHTML={{ __html: currentPreviewHtml }} />
            </div>

            {/* Suggested Prometheus Queries / Data Source Tips */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-orange-500" />
                <span>Métricas Sugeridas (Prometheus / SQL / InfluxDB):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePresetPreview.suggestedMetrics.map((metric) => (
                  <div key={metric} className="bg-[#0c0c0e] border border-zinc-800 rounded-sm px-2.5 py-1.5 text-[10px] font-mono text-zinc-300 flex items-center justify-between">
                    <span className="truncate">{metric}</span>
                    <span className="text-[9px] text-orange-400 font-mono font-bold">QUERY A</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
