import React from 'react';
import { 
  Palette, 
  Cpu, 
  Sparkles, 
  Boxes, 
  Sliders, 
  Download, 
  BookOpen, 
  Code2,
  Terminal,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'themes' | 'services' | 'ai-generator' | 'components' | 'playground';
  setActiveTab: (tab: 'themes' | 'services' | 'ai-generator' | 'components' | 'playground') => void;
  onOpenExport: () => void;
  onOpenDocs: () => void;
  canvasTheme: 'dark' | 'light';
  setCanvasTheme: (theme: 'dark' | 'light') => void;
  activeThemeName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenDocs,
  canvasTheme,
  setCanvasTheme,
  activeThemeName
}) => {
  const navItems: {
    id: 'themes' | 'services' | 'ai-generator' | 'components' | 'playground';
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'themes', label: 'Galeria', sublabel: 'Temas Prontos', icon: Palette },
    { id: 'services', label: 'Serviços', sublabel: 'AD, Fortinet, OS, etc.', icon: Cpu, badge: 'Enterprise' },
    { id: 'ai-generator', label: 'Gerador IA', sublabel: 'Gemini + DataViz', icon: Sparkles, badge: 'Novo' },
    { id: 'components', label: 'Componentes', sublabel: 'Gauges & Snippets', icon: Boxes },
    { id: 'playground', label: 'Playground', sublabel: 'Live Handlebars Editor', icon: Sliders },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Brand & Dev Signature */}
        <div className="flex items-center justify-between w-full xl:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-sm flex items-center justify-center font-black text-black text-base select-none shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tighter uppercase text-white flex items-center gap-1.5">
                  ThemeEngine <span className="text-orange-500">/</span> Studio
                </span>
                <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-sm">
                  Grafana v12+
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="text-zinc-300 font-semibold">Dev: <strong className="text-orange-400">Davi Soares</strong></span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">Business Text (Volkov Labs)</span>
              </div>
            </div>
          </div>

          {/* Quick Active Theme Pill (Desktop) */}
          {activeThemeName && (
            <div className="hidden lg:flex items-center gap-2 bg-[#0c0c0e] border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.15em]">Painel Ativo:</span>
              <strong className="text-white text-xs font-black uppercase tracking-tight italic truncate max-w-[140px]">{activeThemeName}</strong>
            </div>
          )}
        </div>

        {/* Enhanced High-Contrast Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-[#0c0c0e] p-1.5 rounded-sm border border-zinc-800/90 overflow-x-auto w-full xl:w-auto justify-start xl:justify-center custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-150 border ${
                  isActive
                    ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.35)] translate-y-[-1px]'
                    : 'bg-black/60 text-zinc-400 border-zinc-800/80 hover:text-white hover:bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-black' : 'text-orange-500'}`} />
                <div className="text-left flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[8px] font-mono px-1 py-0.2 rounded-sm font-bold uppercase ${
                        isActive 
                          ? 'bg-black text-orange-400' 
                          : 'bg-orange-950/80 text-orange-300 border border-orange-800/60'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[9px] font-mono font-normal tracking-tight ${
                    isActive ? 'text-black/80 font-bold' : 'text-zinc-400 group-hover:text-zinc-300'
                  }`}>
                    {item.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
          {/* Docs & Setup Guide */}
          <button
            id="btn-open-docs"
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 bg-[#0c0c0e] hover:bg-zinc-900 text-zinc-200 hover:text-white px-3.5 py-2 rounded-sm text-xs font-black uppercase tracking-wider border border-zinc-800 transition-colors shadow-sm"
            title="Guia Completo de Implementação Empresarial no Grafana v12+"
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>Guia Grafana v12+</span>
          </button>

          {/* Export Modal Trigger */}
          <button
            id="btn-open-export"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 bg-orange-500 text-black hover:bg-orange-600 font-black uppercase tracking-widest px-4 py-2 rounded-sm text-xs transition-all shadow-[0_0_12px_rgba(249,115,22,0.25)] active:scale-95"
            title="Exportar Painel JSON, HTML e CSS"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
