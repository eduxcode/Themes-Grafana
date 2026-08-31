import React, { useState, useEffect, useMemo } from 'react';
import { GrafanaTheme, CustomizerSettings } from '../types';
import { 
  Code, 
  Palette, 
  Database, 
  Variable, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  RefreshCw, 
  Maximize2, 
  Monitor, 
  Smartphone, 
  Sliders,
  Layers
} from 'lucide-react';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';

interface LivePlaygroundProps {
  theme: GrafanaTheme;
  onUpdateTheme: (updatedTheme: GrafanaTheme) => void;
  onOpenExport: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({
  theme,
  onUpdateTheme,
  onOpenExport
}) => {
  const [editorTab, setEditorTab] = useState<'html' | 'css' | 'json' | 'vars'>('html');
  const [htmlContent, setHtmlContent] = useState(theme.htmlContent);
  const [cssContent, setCssContent] = useState(theme.cssContent);
  const [mockDataStr, setMockDataStr] = useState(JSON.stringify(theme.mockData, null, 2));
  const [variables, setVariables] = useState<Record<string, string>>({
    '__dashboard.name': 'Production Infrastructure Overview',
    '__org.name': 'Main Enterprise Org',
    'cluster': 'k8s-prod-sa-east-1',
    'env': 'production',
    'server_host': 'srv-core-01',
    'namespace': 'production',
    'db_instance': 'pg-cluster-prod-primary',
    'database_name': 'app_production'
  });

  const [jsonError, setJsonError] = useState<string | null>(null);
  const [canvasWidthMode, setCanvasWidthMode] = useState<'full' | '12col' | '8col' | '6col' | 'mobile'>('full');
  const [grafanaCanvasTheme, setGrafanaCanvasTheme] = useState<'dark' | 'light'>('dark');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showVisualSliders, setShowVisualSliders] = useState(false);

  // Visual Customizer State
  const [accentColor, setAccentColor] = useState(theme.accentColor || '#f97316');
  const [borderRadius, setBorderRadius] = useState(parseInt(theme.borderRadius) || 2);
  const [glowIntensity, setGlowIntensity] = useState<'none' | 'subtle' | 'vibrant' | 'neon'>('vibrant');
  const [fontFamily, setFontFamily] = useState(theme.fontFamily || "'Plus Jakarta Sans', monospace");

  // Keep editor state in sync when active theme changes
  useEffect(() => {
    setHtmlContent(theme.htmlContent);
    setCssContent(theme.cssContent);
    setMockDataStr(JSON.stringify(theme.mockData, null, 2));
    setAccentColor(theme.accentColor || '#f97316');
    setFontFamily(theme.fontFamily || "'Plus Jakarta Sans', monospace");
    setBorderRadius(parseInt(theme.borderRadius) || 2);
  }, [theme.id]);

  // Parse Mock Data safely
  const parsedData = useMemo(() => {
    try {
      setJsonError(null);
      return JSON.parse(mockDataStr);
    } catch (e: any) {
      setJsonError('Erro de sintaxe no JSON: ' + e.message);
      return theme.mockData;
    }
  }, [mockDataStr, theme.mockData]);

  // Compile Handlebars template with mock data and dynamic Grafana variables
  const renderedHtml = useMemo(() => {
    return renderBusinessTemplate(htmlContent, parsedData, variables);
  }, [htmlContent, parsedData, variables]);

  const handleCopySnippet = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleQuickInsert = (snippet: string) => {
    if (editorTab === 'html') {
      setHtmlContent((prev) => prev + '\n' + snippet);
    } else if (editorTab === 'css') {
      setCssContent((prev) => prev + '\n' + snippet);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(mockDataStr);
      setMockDataStr(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (e: any) {
      setJsonError('Não foi possível formatar: ' + e.message);
    }
  };

  const handleResetToTheme = () => {
    setHtmlContent(theme.htmlContent);
    setCssContent(theme.cssContent);
    setMockDataStr(JSON.stringify(theme.mockData, null, 2));
    setJsonError(null);
  };

  // Compute container width based on mode
  const getContainerWidthClass = () => {
    switch (canvasWidthMode) {
      case '12col': return 'max-w-5xl';
      case '8col': return 'max-w-3xl';
      case '6col': return 'max-w-xl';
      case 'mobile': return 'max-w-sm';
      default: return 'w-full';
    }
  };

  return (
    <div id="live-playground-container" className="space-y-4">
      {/* Top Toolbar */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500 font-bold">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>PLAYGROUND // {theme.name}</span>
            </h2>
            <p className="text-xs text-zinc-400 font-normal">
              Edição em tempo real de HTML Handlebars, CSS Scoped e Mock Data com renderizador do Business Text.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowVisualSliders(!showVisualSliders)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider border transition-all ${
              showVisualSliders
                ? 'bg-orange-500 text-black border-orange-500'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customizador</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-sm shadow-sm transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Optional Visual Customizer Bar */}
      {showVisualSliders && (
        <div className="bg-[#0c0c0e] border border-zinc-800 p-4 rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-1.5">
              Cor de Destaque
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-sm border border-zinc-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm px-2 py-1 text-xs text-white font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-1.5">
              Border Radius: {borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-1.5">
              Intensidade de Contraste
            </label>
            <select
              value={glowIntensity}
              onChange={(e: any) => setGlowIntensity(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-sm px-2 py-1.5 text-xs text-white font-mono"
            >
              <option value="none">High Contrast (Stark)</option>
              <option value="subtle">Sutil (Delicado)</option>
              <option value="vibrant">Vibrante (Padrão)</option>
              <option value="neon">Neon Intenso (Sci-Fi)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-1.5">
              Família Tipográfica
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-sm px-2 py-1.5 text-xs text-white font-mono"
            >
              <option value="'JetBrains Mono', monospace">JetBrains Mono (Technical/DevOps)</option>
              <option value="'Fira Code', monospace">Fira Code (Terminal)</option>
              <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Modern Bold)</option>
              <option value="'Outfit', sans-serif">Outfit (Minimalist)</option>
              <option value="'Orbitron', sans-serif">Orbitron (Display HUD)</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Dual Workspace: Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-5 flex flex-col bg-[#0c0c0e] border border-zinc-800 rounded-sm overflow-hidden shadow-xl">
          {/* Editor Tabs Header */}
          <div className="flex items-center justify-between bg-zinc-950 px-3 py-2 border-b border-zinc-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditorTab('html')}
                className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider transition-colors ${
                  editorTab === 'html' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setEditorTab('css')}
                className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider transition-colors ${
                  editorTab === 'css' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                CSS
              </button>
              <button
                onClick={() => setEditorTab('json')}
                className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider transition-colors ${
                  editorTab === 'json' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Mock Data
              </button>
              <button
                onClick={() => setEditorTab('vars')}
                className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider transition-colors ${
                  editorTab === 'vars' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Variáveis
              </button>
            </div>

            <div className="flex items-center gap-1">
              {editorTab === 'json' && (
                <button
                  onClick={handleFormatJson}
                  className="text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-sm"
                  title="Formatar JSON"
                >
                  FORMATAR
                </button>
              )}
              <button
                onClick={handleResetToTheme}
                className="text-[10px] text-zinc-400 hover:text-white p-1 hover:bg-zinc-900 rounded-sm"
                title="Restaurar Padrão do Tema"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Insert Snippet Bar for HTML / CSS */}
          {editorTab === 'html' && (
            <div className="px-3 py-1.5 bg-[#0c0c0e] border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">Inserir:</span>
              <button
                onClick={() => handleQuickInsert('{{#if this.value}}{{this.value}}{{else}}N/D{{/if}}')}
                className="px-2 py-0.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-sm font-mono border border-orange-500/30 whitespace-nowrap"
                title="Tratar dados nulos/indefinidos com fallback N/D"
              >
                {'{#if null/nd}'}
              </button>
              <button
                onClick={() => handleQuickInsert('{{#if (eq this.status "OK")}}\n  <span class="status-ok">ONLINE</span>\n{{else}}\n  <span class="status-warn">ALERTA</span>\n{{/if}}')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm font-mono border border-zinc-800 whitespace-nowrap"
              >
                {'{#if eq}'}
              </button>
              <button
                onClick={() => handleQuickInsert('{{#if (gt this.latency 100)}}\n  <span class="pill-red">CRÍTICO</span>\n{{else}}\n  <span class="pill-green">NORMAL</span>\n{{/if}}')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm font-mono border border-zinc-800 whitespace-nowrap"
              >
                {'{#if gt}'}
              </button>
              <button
                onClick={() => handleQuickInsert('{{#if (lt this.free_disk 10)}}\n  <span class="pill-red">ESPAÇO BAIXO</span>\n{{/if}}')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm font-mono border border-zinc-800 whitespace-nowrap"
              >
                {'{#if lt}'}
              </button>
              <button
                onClick={() => handleQuickInsert('{{#each data}}\n  <div>{{this.name}} - {{#if this.val}}{{this.val}}{{else}}N/D{{/if}}</div>\n{{/each}}')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm font-mono border border-zinc-800 whitespace-nowrap"
              >
                {'{#each}'}
              </button>
              <button
                onClick={() => handleQuickInsert('${__dashboard.name}')}
                className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm font-mono border border-zinc-800 whitespace-nowrap"
              >
                {'${__dashboard}'}
              </button>
            </div>
          )}

          {/* Editor Body */}
          <div className="flex-1 p-3 relative flex flex-col bg-black">
            {editorTab === 'html' && (
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 min-h-[380px] bg-transparent text-zinc-100 font-mono text-xs leading-relaxed resize-none focus:outline-none custom-scrollbar p-2"
                placeholder="Insira o código HTML / Handlebars..."
              />
            )}

            {editorTab === 'css' && (
              <textarea
                value={cssContent}
                onChange={(e) => setCssContent(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 min-h-[380px] bg-transparent text-orange-400 font-mono text-xs leading-relaxed resize-none focus:outline-none custom-scrollbar p-2"
                placeholder="Insira os estilos CSS customizados..."
              />
            )}

            {editorTab === 'json' && (
              <div className="flex-1 flex flex-col">
                {jsonError && (
                  <div className="p-2 mb-2 bg-red-950/40 border border-red-800 rounded-sm text-red-300 text-xs font-mono">
                    {jsonError}
                  </div>
                )}
                <textarea
                  value={mockDataStr}
                  onChange={(e) => setMockDataStr(e.target.value)}
                  spellCheck={false}
                  className="w-full flex-1 min-h-[380px] bg-transparent text-zinc-200 font-mono text-xs leading-relaxed resize-none focus:outline-none custom-scrollbar p-2"
                  placeholder="Insira o payload JSON de teste..."
                />
              </div>
            )}

            {editorTab === 'vars' && (
              <div className="flex-1 p-2 space-y-3 overflow-y-auto max-h-[420px]">
                <div className="text-xs text-zinc-400 font-mono uppercase">
                  Simule as variáveis do Grafana no template:
                </div>
                {Object.entries(variables).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 bg-[#0c0c0e] p-2 rounded-sm border border-zinc-800">
                    <span className="font-mono text-xs text-orange-400 font-bold w-36 truncate">
                      ${'{' + key + '}'}
                    </span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setVariables({ ...variables, [key]: e.target.value })}
                      className="flex-1 bg-black border border-zinc-800 rounded-sm px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Copy Footers */}
          <div className="bg-zinc-950 p-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="text-zinc-500 text-[10px] uppercase">
              {editorTab === 'html' && 'Cole no painel Grafana na aba "Content"'}
              {editorTab === 'css' && 'Cole no painel Grafana na aba "CSS Styles"'}
              {editorTab === 'json' && 'Dados injetados nas variáveis {{field}}'}
              {editorTab === 'vars' && 'Variáveis resolvidas via ${nome_var}'}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopySnippet(htmlContent, 'html')}
                className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1 rounded-sm text-xs font-mono border border-zinc-800 transition-colors"
              >
                {copiedType === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-orange-500" />}
                <span>Copiar HTML</span>
              </button>
              <button
                onClick={() => handleCopySnippet(cssContent, 'css')}
                className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1 rounded-sm text-xs font-mono border border-zinc-800 transition-colors"
              >
                {copiedType === 'css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-orange-500" />}
                <span>Copiar CSS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Grafana Dashboard Simulator Canvas */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Canvas Sizing and Grafana Mode Controls */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm px-4 py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mr-1">
                Visualização:
              </span>
              <button
                onClick={() => setCanvasWidthMode('full')}
                className={`p-1.5 rounded-sm text-xs ${canvasWidthMode === 'full' ? 'bg-orange-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400'}`}
                title="Largura Total (100%)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCanvasWidthMode('12col')}
                className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold uppercase ${canvasWidthMode === '12col' ? 'bg-orange-500 text-black' : 'bg-zinc-900 text-zinc-400'}`}
                title="12 Colunas"
              >
                12 COLS
              </button>
              <button
                onClick={() => setCanvasWidthMode('8col')}
                className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold uppercase ${canvasWidthMode === '8col' ? 'bg-orange-500 text-black' : 'bg-zinc-900 text-zinc-400'}`}
                title="8 Colunas"
              >
                8 COLS
              </button>
              <button
                onClick={() => setCanvasWidthMode('mobile')}
                className={`p-1.5 rounded-sm text-xs ${canvasWidthMode === 'mobile' ? 'bg-orange-500 text-black' : 'bg-zinc-900 text-zinc-400'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGrafanaCanvasTheme(grafanaCanvasTheme === 'dark' ? 'light' : 'dark')}
                className="text-xs font-mono uppercase bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-sm border border-zinc-800 transition-colors"
              >
                {grafanaCanvasTheme === 'dark' ? '🌙 Dark Canvas' : '☀️ Light Canvas'}
              </button>
            </div>
          </div>

          {/* Grafana UI Panel Shell */}
          <div
            className={`border rounded-sm overflow-hidden shadow-2xl transition-all ${
              grafanaCanvasTheme === 'dark'
                ? 'bg-[#111217] border-zinc-800 text-zinc-200'
                : 'bg-[#f4f5f8] border-zinc-300 text-zinc-800'
            }`}
          >
            {/* Grafana Dashboard Top Bar Simulation */}
            <div
              className={`px-4 py-2.5 border-b flex items-center justify-between text-xs ${
                grafanaCanvasTheme === 'dark'
                  ? 'bg-[#181b1f] border-zinc-800 text-zinc-300'
                  : 'bg-white border-zinc-300 text-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-sm bg-orange-500 flex items-center justify-center text-black font-black text-[10px]">
                  G
                </div>
                <span className="font-bold tracking-tight truncate max-w-[200px] sm:max-w-none font-mono">
                  {variables['__dashboard.name'] || 'Dashboard Grafana'}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded-sm border border-zinc-800 hidden sm:inline">
                  Business Text Panel
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-zinc-900 px-2 py-0.5 rounded-sm text-[10px] font-mono text-zinc-300 border border-zinc-800">
                  Last 1 hour
                </span>
                <span className="bg-zinc-900 px-2 py-0.5 rounded-sm text-[10px] font-mono text-emerald-400 border border-zinc-800">
                  ● 5s
                </span>
              </div>
            </div>

            {/* Live Panel Workspace */}
            <div className="p-4 sm:p-6 overflow-x-auto min-h-[440px] flex items-center justify-center">
              <div className={`transition-all duration-200 ${getContainerWidthClass()}`}>
                {/* Dynamically Injected CSS */}
                <style>{cssContent}</style>
                {/* Dynamically Rendered Handlebars Output */}
                <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
