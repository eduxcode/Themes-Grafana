import React, { useState } from 'react';
import { GrafanaTheme, ThemeCategory } from '../types';
import { Palette, Play, Eye, Sparkles, Check, Download, Monitor } from 'lucide-react';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';

interface ThemeGalleryProps {
  themes: GrafanaTheme[];
  activeTheme: GrafanaTheme;
  onSelectTheme: (theme: GrafanaTheme, targetTab?: 'playground' | 'simulator') => void;
  onExportTheme: (theme: GrafanaTheme) => void;
  onGoToAiGenerator: () => void;
}

export const ThemeGallery: React.FC<ThemeGalleryProps> = ({
  themes,
  activeTheme,
  onSelectTheme,
  onExportTheme,
  onGoToAiGenerator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = themes.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { id: ThemeCategory; label: string }[] = [
    { id: 'all', label: 'Todos os Temas' },
    { id: 'tactical-hud', label: 'Tactical Defense' },
    { id: 'neo-tokyo', label: 'Neo-Tokyo Shinjuku' },
    { id: 'industrial-brutalist', label: 'SCADA Industrial' },
    { id: 'crimson-soc', label: 'Crimson SOC' },
    { id: 'synthwave', label: 'Synthwave 80s' },
    { id: 'monochrome-eink', label: 'Monochrome E-Ink' },
    { id: 'cyberpunk', label: 'Cyberpunk HUD' },
    { id: 'glassmorphism', label: 'Frost Glass' },
    { id: 'enterprise', label: 'Swiss Enterprise' },
    { id: 'terminal', label: 'Retro CRT' },
    { id: 'dark-luxury', label: 'Dark Obsidian' },
    { id: 'aurora', label: 'Nordic Aurora' },
  ];

  return (
    <div id="theme-gallery-container" className="space-y-6">
      {/* Hero Banner / Introduction */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            <span>Plugin Business Text Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic text-white">
            GRAFANA <span className="text-orange-500">THEME</span> CATALOG
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-normal">
            Transforme qualquer dashboard técnico em uma visualização de alto impacto com suporte a <strong>CSS Scoped</strong>, <strong>Handlebars dinâmico</strong>, variáveis de ambiente do Grafana e renderização em tempo real independente da fonte de dados.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToAiGenerator}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-sm shadow-sm transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Gerar Tema com IA</span>
            </button>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider">ou selecione um tema pré-configurado:</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-black shadow-sm'
                  : 'bg-[#0c0c0e] text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="BUSCAR TEMA OU STACK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-sm px-3 py-2 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 uppercase"
          />
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => {
          const isSelected = activeTheme?.id === theme.id;
          // Render preview content safely
          const renderedPreviewHtml = renderBusinessTemplate(
            theme.htmlContent,
            theme.mockData,
            { cluster: 'prod-sa-east-1', env: 'production', timeframe: '24h', server_host: 'node-01' }
          );

          return (
            <div
              key={theme.id}
              id={`theme-card-${theme.id}`}
              className={`group flex flex-col justify-between bg-[#0c0c0e] border rounded-sm overflow-hidden transition-all duration-200 ${
                isSelected
                  ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] ring-1 ring-orange-500'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{theme.tagline}</p>
                  </div>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      <Check className="w-3 h-3" /> Ativo
                    </span>
                  ) : (
                    <div
                      className="w-3.5 h-3.5 rounded-sm border border-zinc-700"
                      style={{ backgroundColor: theme.accentColor }}
                      title={`Cor de destaque: ${theme.accentColor}`}
                    />
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {theme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-sm border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Mini Preview Canvas */}
              <div className="px-5 py-2">
                <div className="relative rounded-sm overflow-hidden border border-zinc-800/80 bg-black p-3 max-h-56 overflow-y-auto custom-scrollbar select-none pointer-events-none">
                  {/* Style injection for the preview */}
                  <style>{theme.cssContent}</style>
                  <div dangerouslySetInnerHTML={{ __html: renderedPreviewHtml }} />
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-3 border-t border-zinc-800/80 bg-zinc-950 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTheme(theme, 'simulator')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-wider py-2 px-3 rounded-sm shadow-sm transition-all active:scale-95"
                    title="Simular no Grafana em tempo real"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Simular no Grafana</span>
                  </button>

                  <button
                    onClick={() => onSelectTheme(theme, 'playground')}
                    className="inline-flex items-center justify-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white py-2 px-2.5 rounded-sm border border-zinc-800 transition-colors text-xs font-mono"
                    title="Editar Código no Playground"
                  >
                    <Play className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onExportTheme(theme)}
                    className="inline-flex items-center justify-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white p-2 rounded-sm border border-zinc-800 transition-colors"
                    title="Exportar Painel JSON / HTML"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
