import React, { useState } from 'react';
import { 
  Palette, 
  Check, 
  Copy, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Activity, 
  Sliders, 
  Zap,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DATA_VIZ_GRADIENT_PALETTES, GradientPalette, applyGradientToCss } from '../data/gradientPalettes';

interface DataVizGradientSectionProps {
  selectedPaletteId?: string;
  onSelectPalette: (palette: GradientPalette) => void;
  onApplyToCurrentCss?: (palette: GradientPalette) => void;
  hasGeneratedResult?: boolean;
}

export const DataVizGradientSection: React.FC<DataVizGradientSectionProps> = ({
  selectedPaletteId,
  onSelectPalette,
  onApplyToCurrentCss,
  hasGeneratedResult = false
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedFeedbackId, setAppliedFeedbackId] = useState<string | null>(null);
  const [gradientAngle, setGradientAngle] = useState<number>(135);
  const [activePalette, setActivePalette] = useState<GradientPalette>(
    DATA_VIZ_GRADIENT_PALETTES.find(p => p.id === selectedPaletteId) || DATA_VIZ_GRADIENT_PALETTES[0]
  );

  const categories = [
    { id: 'all', label: 'Todas as Paletas' },
    { id: 'sequential', label: 'Sequenciais (Perceptuais)', icon: Layers },
    { id: 'diverging', label: 'Divergentes (Delta / Baseline)', icon: Sliders },
    { id: 'slo-status', label: 'SLO & SRE Telemetria', icon: Activity },
    { id: 'cyber-specialized', label: 'Cyber HUD & Alta Densidade', icon: Zap }
  ];

  const filteredPalettes = activeCategory === 'all'
    ? DATA_VIZ_GRADIENT_PALETTES
    : DATA_VIZ_GRADIENT_PALETTES.filter(p => p.category === activeCategory);

  const handleCopyCss = (palette: GradientPalette, e: React.MouseEvent) => {
    e.stopPropagation();
    const cssText = `/* DataViz Gradient: ${palette.name} */
:root {
  --dv-gradient: ${palette.gradientCss};
  --dv-accent-primary: ${palette.accentPrimary};
  --dv-accent-secondary: ${palette.accentSecondary};
  --dv-bg: ${palette.darkBg};
}
.dv-gradient-text {
  background: ${palette.gradientCss};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`;
    navigator.clipboard.writeText(cssText);
    setCopiedId(palette.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyNow = (palette: GradientPalette, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePalette(palette);
    onSelectPalette(palette);
    if (onApplyToCurrentCss) {
      onApplyToCurrentCss(palette);
      setAppliedFeedbackId(palette.id);
      setTimeout(() => setAppliedFeedbackId(null), 2500);
    }
  };

  return (
    <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Palette className="w-3 h-3 text-orange-500" />
            <span>Data Visualization Standards</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span>PALETAS DEGRADÊ</span>
            <span className="text-orange-500">//</span>
            <span className="text-zinc-400 font-mono text-base font-normal">DATA VIZ BEST PRACTICES</span>
          </h3>
          <p className="text-xs text-zinc-400 max-w-2xl font-normal">
            Paletas cientificamente balanceadas para telemetria (ColorBrewer, Matplotlib Viridis, Plasma, divergência de baseline e métricas de SLO). Escolha uma paleta para guiar a IA ou aplicá-la diretamente ao CSS do painel.
          </p>
        </div>

        {hasGeneratedResult && (
          <div className="bg-zinc-900 border border-orange-500/30 p-2.5 rounded-sm text-xs font-mono text-zinc-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Tema gerado ativo: clique em uma paleta para injetar o CSS instantaneamente!</span>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-orange-500 text-black border-orange-500'
                  : 'bg-black text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Palette Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPalettes.map((palette) => {
          const isSelected = activePalette.id === palette.id;
          const isApplied = appliedFeedbackId === palette.id;

          return (
            <div
              key={palette.id}
              onClick={() => {
                setActivePalette(palette);
                onSelectPalette(palette);
              }}
              className={`bg-black rounded-sm border p-4 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] bg-zinc-950'
                  : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950/80'
              }`}
            >
              {/* Top Row Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-400 block">
                      {palette.category.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {palette.name}
                    </h4>
                  </div>
                  {palette.isColorBlindSafe && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-[9px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Colorblind Safe</span>
                    </span>
                  )}
                </div>

                {/* Multi-stop Gradient Ribbon */}
                <div className="space-y-1.5">
                  <div
                    className="h-7 w-full rounded-sm border border-white/10 shadow-inner relative overflow-hidden flex items-center justify-between px-2"
                    style={{ background: palette.gradientCss }}
                  >
                    <span className="text-[9px] font-mono font-black text-black bg-white/70 px-1 py-0.2 rounded shadow-sm">
                      0%
                    </span>
                    <span className="text-[9px] font-mono font-black text-white bg-black/70 px-1 py-0.2 rounded shadow-sm">
                      100%
                    </span>
                  </div>

                  {/* Individual Color Hex Dots */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {palette.colors.map((hex, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-3.5 rounded-sm border border-zinc-800 flex items-center justify-center text-[8px] font-mono text-zinc-400"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>

                {/* Scientific Note & Description */}
                <div className="space-y-1 text-xs">
                  <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-2">
                    {palette.description}
                  </p>
                  <div className="p-2 rounded-sm bg-[#09090b] border border-zinc-800/80 text-[10px] text-zinc-400 font-mono flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{palette.bestPracticeNote}</span>
                  </div>
                </div>

                {/* Recommended Use Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {palette.recommendedFor.slice(0, 3).map((rec, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded-sm"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 mt-3 border-t border-zinc-800/80 flex items-center gap-2">
                {hasGeneratedResult && onApplyToCurrentCss && (
                  <button
                    type="button"
                    onClick={(e) => handleApplyNow(palette, e)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-black text-[10px] font-black uppercase tracking-wider py-1.5 px-2 rounded-sm transition-all flex items-center justify-center gap-1"
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3 h-3 text-black" />
                        <span>Aplicado ao CSS!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3 text-black" />
                        <span>Aplicar ao CSS</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPalette(palette);
                  }}
                  className={`px-2.5 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all border ${
                    isSelected
                      ? 'bg-zinc-800 text-orange-400 border-orange-500'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
                  }`}
                  title="Definir para o prompt da IA"
                >
                  Usar no Prompt
                </button>

                <button
                  type="button"
                  onClick={(e) => handleCopyCss(palette, e)}
                  className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                  title="Copiar regras CSS"
                >
                  {copiedId === palette.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Selected Palette Deep Dive & CSS Inspector */}
      {activePalette && (
        <div className="bg-black border border-zinc-800 rounded-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activePalette.accentPrimary }}></span>
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Detalhes da Paleta Ativa: {activePalette.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">({activePalette.scientificName})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400">Variáveis injetadas para Grafana Business Text:</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Live Visual Demonstration */}
            <div className="p-3.5 rounded-sm bg-[#09090b] border border-zinc-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>PREVIEW DOS ELEMENTOS COM O GRADIENTE:</span>
              </div>

              {/* Gradient Text Demo */}
              <div className="p-2.5 bg-black rounded-sm border border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Texto com Efeito Degradê:</span>
                <span
                  className="text-sm font-black uppercase tracking-tight"
                  style={{
                    background: activePalette.gradientCss,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  99.98% DISPONIBILIDADE
                </span>
              </div>

              {/* Gradient Progress / Gauge Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Throughput / Heat Gauge:</span>
                  <span style={{ color: activePalette.accentPrimary }}>8,420 ops/s</span>
                </div>
                <div className="h-3 rounded-sm bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all"
                    style={{
                      width: '78%',
                      background: activePalette.gradientCss,
                      boxShadow: `0 0 10px ${activePalette.accentPrimary}40`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Generated CSS Variables Code Box */}
            <div className="p-3.5 rounded-sm bg-[#09090b] border border-zinc-800/80 space-y-1.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-orange-400">
                <span>SNIPPET CSS PARA O GRAFANA (CSS STYLES):</span>
                <button
                  type="button"
                  onClick={(e) => handleCopyCss(activePalette, e)}
                  className="inline-flex items-center gap-1 text-[10px] text-zinc-300 hover:text-white"
                >
                  {copiedId === activePalette.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar CSS</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-sm bg-black border border-zinc-800/90 text-orange-400 font-mono text-[11px] overflow-x-auto custom-scrollbar">
{`:root {
  --dv-gradient: ${activePalette.gradientCss};
  --dv-accent-primary: ${activePalette.accentPrimary};
  --dv-accent-secondary: ${activePalette.accentSecondary};
}
.dv-gradient-bar {
  background: var(--dv-gradient);
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
