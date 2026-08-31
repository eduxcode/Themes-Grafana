import React, { useState } from 'react';
import { Sparkles, Loader2, Play, Download, Wand2, CheckCircle2, AlertCircle, RefreshCw, Palette, Layers } from 'lucide-react';
import { GrafanaTheme, ServicePreset } from '../types';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';
import { DataVizGradientSection } from './DataVizGradientSection';
import { DATA_VIZ_GRADIENT_PALETTES, GradientPalette, applyGradientToCss } from '../data/gradientPalettes';

interface AiThemeGeneratorProps {
  onApplyGeneratedTheme: (theme: GrafanaTheme) => void;
  onExportTheme: (theme: GrafanaTheme) => void;
  prefillServiceName?: string;
}

export const AiThemeGenerator: React.FC<AiThemeGeneratorProps> = ({
  onApplyGeneratedTheme,
  onExportTheme,
  prefillServiceName = ''
}) => {
  const [serviceName, setServiceName] = useState(prefillServiceName || '');
  const [serviceDescription, setServiceDescription] = useState('');
  const [designStyle, setDesignStyle] = useState('Modern Cyberpunk HUD / Sleek Dark');
  const [panelType, setPanelType] = useState('Multi-metric Status Dashboard');
  const [customMetrics, setCustomMetrics] = useState('');
  const [colorPalette, setColorPalette] = useState('Viridis Scientific (Perceptualmente Uniforme)');
  const [selectedPalette, setSelectedPalette] = useState<GradientPalette>(DATA_VIZ_GRADIENT_PALETTES[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);
  const [lastAppliedGradientName, setLastAppliedGradientName] = useState<string | null>(null);

  const popularSuggestions = [
    { name: 'Microsoft Active Directory (AD DS)', desc: 'Locked Accounts (Event 4740), Kerberos Failures, LDAP Search Latency, Replication Status', style: 'Enterprise Swiss Slate' },
    { name: 'Fortinet FortiGate Firewall NGFW', desc: 'Active Sessions, WAN Bandwidth (Mbps), VPN Tunnels UP, IPS Threat Mitigation Events', style: 'Modern Cyberpunk HUD / Sleek Dark' },
    { name: 'Docker Standalone & Compose Hosts', desc: 'Running vs Stopped Containers, Memory Working Set, Restart Counts, CPU Load', style: 'Modern Cyberpunk HUD / Sleek Dark' },
    { name: 'Linux Enterprise Servers (RHEL/Ubuntu)', desc: 'Load 1m/5m/15m, RAM Available, Disk I/O Wait, Systemd Failed Units', style: 'Retro CRT Terminal Matrix' },
    { name: 'Windows Server IIS & Services', desc: 'CPU Usage %, Physical Memory, IIS Active Connections, Disk Free C:/D:', style: 'Enterprise Swiss Slate' },
    { name: 'Impressoras de Rede (SNMP MIB)', desc: 'Níveis de Toner CMYK (0-100%), Papel na Bandeja, Contador de Páginas, Alertas', style: 'Nordic Aurora Teal' },
    { name: 'Apache Kafka Event Streams', desc: 'Consumer Lag, Partitions, Topic Throughput (msg/s), Broker Rebalances', style: 'Modern Cyberpunk HUD / Sleek Dark' },
    { name: 'Elasticsearch / OpenSearch', desc: 'Cluster Health (Green/Yellow), JVM Heap %, Indexing Rate, Doc Count', style: 'Glassmorphic Frost UI' }
  ];

  const designStyles = [
    'Modern Cyberpunk HUD / Sleek Dark',
    'Glassmorphic Frost UI (Translucent & Blur)',
    'Enterprise Swiss Slate (High-density Clean)',
    'Retro CRT Terminal Matrix (Green Phosphor)',
    'Obsidian Amber Luxury (Dark Gold & Velvet)',
    'Nordic Aurora Teal (Arctic Frost & Neon)'
  ];

  const panelTypes = [
    'Multi-metric Status Dashboard (Cards + Table)',
    'KPI Metrics Row with Delta & Sparks',
    'Health Status Matrix (Dot Grid & Tooltips)',
    'Service Dependency & Queue Depth Inspector',
    'Live Event Log Stream / Terminal'
  ];

  const handleSelectGradientPalette = (palette: GradientPalette) => {
    setSelectedPalette(palette);
    setColorPalette(`${palette.name} (${palette.scientificName} - ${palette.colors.join(', ')})`);
  };

  const handleApplyPaletteToGeneratedCss = (palette: GradientPalette) => {
    if (!generatedResult) return;
    const updatedCss = applyGradientToCss(generatedResult.cssContent, palette);
    setGeneratedResult({
      ...generatedResult,
      cssContent: updatedCss
    });
    setLastAppliedGradientName(palette.name);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!serviceName.trim()) {
      setError('Por favor, informe o nome do serviço ou programa.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/generate-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName,
          serviceDescription,
          designStyle,
          panelType,
          customMetrics,
          colorPalette
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao gerar tema com Gemini IA.');
      }

      // Automatically enrich with selected DataViz palette if configured
      let initialCss = data.template.cssContent;
      if (selectedPalette) {
        initialCss = applyGradientToCss(initialCss, selectedPalette);
      }

      setGeneratedResult({
        ...data.template,
        cssContent: initialCss
      });
      if (selectedPalette) {
        setLastAppliedGradientName(selectedPalette.name);
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com o serviço de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToWorkspace = () => {
    if (!generatedResult) return;

    const themeObject: GrafanaTheme = {
      id: `ai-gen-${Date.now()}`,
      name: generatedResult.title || serviceName,
      tagline: generatedResult.description || `Tema IA para ${serviceName}`,
      description: generatedResult.description || '',
      category: 'cyberpunk',
      accentColor: selectedPalette?.accentPrimary || '#38bdf8',
      secondaryColor: selectedPalette?.accentSecondary || '#818cf8',
      backgroundColor: selectedPalette?.darkBg || '#0a0e17',
      textColor: selectedPalette?.lightText || '#f8fafc',
      fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', monospace",
      borderRadius: '8px',
      isDark: true,
      htmlContent: generatedResult.htmlContent,
      cssContent: generatedResult.cssContent,
      mockData: generatedResult.mockData || {},
      dynamicVariables: generatedResult.dynamicVariables || [
        { name: 'service_instance', description: 'Instância do Serviço', defaultValue: 'prod-01' }
      ],
      tags: ['IA Gerado', serviceName, generatedResult.styleName || 'Custom', selectedPalette?.name || 'DataViz'],
      recommendedFor: [serviceName]
    };

    onApplyGeneratedTheme(themeObject);
  };

  return (
    <div id="ai-theme-generator-container" className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>AI Code Generation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter italic text-white">
            AI THEME <span className="text-orange-500">GENERATOR</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed">
            Diga qual tecnologia você deseja monitorar (Kafka, Elasticsearch, RabbitMQ, Ceph, MinIO ou seu microsserviço proprietário) e a IA gerará templates HTML Handlebars, CSS Scoped com variáveis dinâmicas e dados de teste em segundos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs & Suggestions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-5 space-y-4 shadow-xl">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 mb-1.5">
                  Nome do Serviço / Stack <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="EX: APACHE KAFKA, ELASTICSEARCH..."
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 font-mono uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 mb-1.5">
                  Estilo de Design
                </label>
                <select
                  value={designStyle}
                  onChange={(e) => setDesignStyle(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  {designStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 mb-1.5">
                  Tipo de Layout do Painel
                </label>
                <select
                  value={panelType}
                  onChange={(e) => setPanelType(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  {panelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 mb-1.5">
                  Métricas Específicas (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Consumer lag, JVM Heap %, Throughput msg/s..."
                  value={customMetrics}
                  onChange={(e) => setCustomMetrics(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300">
                    Paleta de Cores (DataViz Best Practices)
                  </label>
                  {selectedPalette.isColorBlindSafe && (
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">
                      ✓ Colorblind Safe
                    </span>
                  )}
                </div>

                {/* Quick Gradient Visual Select */}
                <div className="space-y-2">
                  <select
                    value={selectedPalette.id}
                    onChange={(e) => {
                      const found = DATA_VIZ_GRADIENT_PALETTES.find(p => p.id === e.target.value);
                      if (found) {
                        handleSelectGradientPalette(found);
                        if (generatedResult) {
                          handleApplyPaletteToGeneratedCss(found);
                        }
                      }
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  >
                    {DATA_VIZ_GRADIENT_PALETTES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} [{p.category.toUpperCase()}]
                      </option>
                    ))}
                  </select>

                  {/* Gradient Ribbon Preview */}
                  <div
                    className="h-3 w-full rounded-sm border border-zinc-700/60 shadow-sm"
                    style={{ background: selectedPalette.gradientCss }}
                  />

                  <input
                    type="text"
                    placeholder="Ou digite paleta customizada..."
                    value={colorPalette}
                    onChange={(e) => setColorPalette(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-sm px-3.5 py-1.5 text-[11px] text-zinc-400 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-sm flex items-start gap-2 text-red-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest py-3 px-4 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Gerando Tema &amp; CSS...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-black" />
                    <span>Gerar Tema Completo</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-4 space-y-2.5">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
              Sugestões Rápidas:
            </span>
            <div className="flex flex-col gap-1.5">
              {popularSuggestions.map((sug) => (
                <button
                  key={sug.name}
                  type="button"
                  onClick={() => {
                    setServiceName(sug.name);
                    setCustomMetrics(sug.desc);
                    setDesignStyle(sug.style);
                  }}
                  className="text-left p-2.5 rounded-sm bg-black hover:bg-zinc-900 border border-zinc-800 transition-colors text-xs flex flex-col group"
                >
                  <span className="font-black uppercase tracking-tight text-zinc-200 group-hover:text-orange-400">
                    {sug.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 line-clamp-1">{sug.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Output & Action Preview */}
        <div className="lg:col-span-7 space-y-4">
          {generatedResult ? (
            <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm overflow-hidden shadow-2xl space-y-4 p-5">
              {/* Header result */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-black uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tema Gerado com Sucesso</span>
                    </span>
                    {lastAppliedGradientName && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-orange-950/60 border border-orange-800/80 text-orange-400 text-[10px] font-mono font-bold">
                        <Palette className="w-3 h-3" />
                        <span>Gradiente: {lastAppliedGradientName}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white">{generatedResult.title}</h3>
                  <p className="text-xs text-zinc-400">{generatedResult.description}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleApplyToWorkspace}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3.5 py-2 rounded-sm shadow-sm transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Abrir no Playground</span>
                  </button>
                </div>
              </div>

              {/* Live Render Preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                  Painel Renderizado:
                </span>
                <div className="rounded-sm overflow-hidden border border-zinc-800 bg-black p-4 max-h-[380px] overflow-y-auto">
                  <style>{generatedResult.cssContent}</style>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderBusinessTemplate(
                        generatedResult.htmlContent,
                        generatedResult.mockData,
                        { service_instance: 'prod-kafka-01', cluster: 'cluster-prod-1', env: 'production' }
                      )
                    }}
                  />
                </div>
              </div>

              {/* Dynamic Variables & Tips */}
              {generatedResult.dynamicVariables && generatedResult.dynamicVariables.length > 0 && (
                <div className="bg-black p-3.5 rounded-sm border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">
                    Variáveis Dinâmicas Utilizadas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {generatedResult.dynamicVariables.map((v: any) => (
                      <span key={v.name} className="text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-sm">
                        <strong className="text-orange-400">${'{' + v.name + '}'}</strong>: {v.description}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Setup tips */}
              {generatedResult.setupTips && generatedResult.setupTips.length > 0 && (
                <div className="bg-zinc-950 p-3.5 rounded-sm border border-zinc-800 text-xs text-zinc-400 space-y-1 font-mono">
                  <strong className="text-zinc-300 uppercase tracking-wider font-bold">Dicas de Configuração Grafana:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {generatedResult.setupTips.map((tip: string, idx: number) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#0c0c0e] border border-zinc-800 border-dashed rounded-sm p-12 text-center space-y-3 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500">
                <Wand2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black uppercase tracking-tight text-white">
                Aguardando Prompt de Serviço
              </h4>
              <p className="text-xs text-zinc-400 max-w-md font-normal">
                Informe a tecnologia desejada ou selecione uma das sugestões ao lado para gerar o código HTML Handlebars e CSS Scoped compatível com Grafana Business Text.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Visualization Best Practices Gradient Palettes Section */}
      <DataVizGradientSection
        selectedPaletteId={selectedPalette?.id}
        onSelectPalette={handleSelectGradientPalette}
        onApplyToCurrentCss={handleApplyPaletteToGeneratedCss}
        hasGeneratedResult={!!generatedResult}
      />
    </div>
  );
};
