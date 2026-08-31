import React, { useState } from 'react';
import { Header } from './components/Header';
import { ThemeGallery } from './components/ThemeGallery';
import { ServicePresets } from './components/ServicePresets';
import { AiThemeGenerator } from './components/AiThemeGenerator';
import { ComponentLibrary } from './components/ComponentLibrary';
import { LivePlayground } from './components/LivePlayground';
import { ExportModal } from './components/ExportModal';
import { GrafanaDocsModal } from './components/GrafanaDocsModal';
import { PREBUILT_THEMES } from './data/themes';
import { SERVICE_PRESETS } from './data/servicePresets';
import { REUSABLE_COMPONENTS } from './data/componentsLibrary';
import { GrafanaTheme, ServicePreset, ReusableComponent } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'themes' | 'services' | 'ai-generator' | 'components' | 'playground'>('themes');
  const [themes, setThemes] = useState<GrafanaTheme[]>(PREBUILT_THEMES);
  const [activeTheme, setActiveTheme] = useState<GrafanaTheme>(PREBUILT_THEMES[0]);
  const [canvasTheme, setCanvasTheme] = useState<'dark' | 'light'>('dark');

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [exportTargetTheme, setExportTargetTheme] = useState<GrafanaTheme>(PREBUILT_THEMES[0]);
  const [aiPrefillService, setAiPrefillService] = useState<string>('');

  const handleSelectTheme = (theme: GrafanaTheme, openPlayground: boolean = false) => {
    setActiveTheme(theme);
    if (openPlayground) {
      setActiveTab('playground');
    }
  };

  const handleExportTheme = (theme: GrafanaTheme) => {
    setExportTargetTheme(theme);
    setIsExportOpen(true);
  };

  const handleSelectPreset = (preset: ServicePreset) => {
    const asTheme: GrafanaTheme = {
      id: `preset-${preset.id}`,
      name: `${preset.serviceName} Panel`,
      tagline: preset.description,
      description: preset.description,
      category: 'cyberpunk',
      accentColor: '#38bdf8',
      secondaryColor: '#818cf8',
      backgroundColor: '#0a0e17',
      textColor: '#f8fafc',
      fontFamily: "'JetBrains Mono', monospace",
      borderRadius: '8px',
      isDark: true,
      htmlContent: preset.htmlContent,
      cssContent: preset.cssContent,
      mockData: preset.mockData,
      dynamicVariables: preset.dynamicVariables,
      tags: [preset.serviceName, ...preset.tags],
      recommendedFor: [preset.serviceName]
    };
    setActiveTheme(asTheme);
    setActiveTab('playground');
  };

  const handleExportPreset = (preset: ServicePreset) => {
    const asTheme: GrafanaTheme = {
      id: `preset-${preset.id}`,
      name: `${preset.serviceName} Panel`,
      tagline: preset.description,
      description: preset.description,
      category: 'cyberpunk',
      accentColor: '#38bdf8',
      secondaryColor: '#818cf8',
      backgroundColor: '#0a0e17',
      textColor: '#f8fafc',
      fontFamily: "'JetBrains Mono', monospace",
      borderRadius: '8px',
      isDark: true,
      htmlContent: preset.htmlContent,
      cssContent: preset.cssContent,
      mockData: preset.mockData,
      dynamicVariables: preset.dynamicVariables,
      tags: [preset.serviceName, ...preset.tags],
      recommendedFor: [preset.serviceName]
    };
    setExportTargetTheme(asTheme);
    setIsExportOpen(true);
  };

  const handleApplyAiTheme = (generatedTheme: GrafanaTheme) => {
    setThemes((prev) => [generatedTheme, ...prev]);
    setActiveTheme(generatedTheme);
    setActiveTab('playground');
  };

  const handleInsertComponent = (comp: ReusableComponent) => {
    const updatedHtml = activeTheme.htmlContent + `\n\n<!-- Inserido: ${comp.name} -->\n` + comp.htmlSnippet;
    const updatedCss = activeTheme.cssContent + `\n\n/* Estilos: ${comp.name} */\n` + comp.cssSnippet;
    const updatedMock = { ...activeTheme.mockData, ...comp.sampleData };

    const updatedTheme: GrafanaTheme = {
      ...activeTheme,
      htmlContent: updatedHtml,
      cssContent: updatedCss,
      mockData: updatedMock
    };

    setActiveTheme(updatedTheme);
    setActiveTab('playground');
  };

  const handleOpenAiWithPrefill = (serviceName?: string) => {
    setAiPrefillService(serviceName || '');
    setActiveTab('ai-generator');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => {
          setExportTargetTheme(activeTheme);
          setIsExportOpen(true);
        }}
        onOpenDocs={() => setIsDocsOpen(true)}
        canvasTheme={canvasTheme}
        setCanvasTheme={setCanvasTheme}
        activeThemeName={activeTheme.name}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'themes' && (
          <ThemeGallery
            themes={themes}
            activeTheme={activeTheme}
            onSelectTheme={handleSelectTheme}
            onExportTheme={handleExportTheme}
            onGoToAiGenerator={() => setActiveTab('ai-generator')}
          />
        )}

        {activeTab === 'services' && (
          <ServicePresets
            presets={SERVICE_PRESETS}
            onSelectPreset={handleSelectPreset}
            onExportPreset={handleExportPreset}
            onOpenAiGenerator={handleOpenAiWithPrefill}
          />
        )}

        {activeTab === 'ai-generator' && (
          <AiThemeGenerator
            onApplyGeneratedTheme={handleApplyAiTheme}
            onExportTheme={handleExportTheme}
            prefillServiceName={aiPrefillService}
          />
        )}

        {activeTab === 'components' && (
          <ComponentLibrary
            components={REUSABLE_COMPONENTS}
            onInsertIntoPlayground={handleInsertComponent}
          />
        )}

        {activeTab === 'playground' && (
          <LivePlayground
            theme={activeTheme}
            onUpdateTheme={(updated) => setActiveTheme(updated)}
            onOpenExport={() => {
              setExportTargetTheme(activeTheme);
              setIsExportOpen(true);
            }}
          />
        )}
      </main>

      {/* Export Panel Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        theme={exportTargetTheme}
      />

      {/* Grafana Business Text Docs Modal */}
      <GrafanaDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-6 px-4 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 font-mono text-xs text-left">
            <div className="flex items-center gap-2">
              <span className="font-black uppercase tracking-tight text-white">GRAFANA THEME STUDIO</span>
              <span className="text-zinc-600">//</span>
              <span className="text-orange-400 font-bold">GRAFANA v12+ ENTERPRISE</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Desenvolvido por <strong className="text-zinc-200">Davi Soares</strong> • Especialista em Dashboards &amp; DataViz
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <button onClick={() => setIsDocsOpen(true)} className="hover:text-orange-400 transition-colors">
              Guia Grafana v12+
            </button>
            <button onClick={() => setActiveTab('services')} className="hover:text-orange-400 transition-colors">
              Serviços Corporativos
            </button>
            <button onClick={() => setActiveTab('themes')} className="hover:text-orange-400 transition-colors">
              Galeria
            </button>
            <button onClick={() => setActiveTab('ai-generator')} className="hover:text-orange-400 transition-colors">
              Gerador IA
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
