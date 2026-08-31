import React, { useState } from 'react';
import { GrafanaTheme } from '../types';
import { X, Copy, Check, Download, FileCode, CheckCircle2, Terminal, ExternalLink } from 'lucide-react';
import { generateGrafanaPanelJson } from '../utils/grafanaExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: GrafanaTheme;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'panelJson' | 'html' | 'css' | 'instructions'>('panelJson');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const panelJsonString = generateGrafanaPanelJson({
    panelTitle: theme.name,
    htmlContent: theme.htmlContent,
    cssContent: theme.cssContent,
    defaultData: theme.mockData
  });

  const handleCopy = (text: string, tabKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([panelJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grafana-business-text-${theme.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-black">
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>EXPORTAR PAINEL GRAFANA</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-sm">
                {theme.name}
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-normal">
              Obtenha o modelo JSON completo ou o código individual para o plugin Business Text.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-zinc-800 bg-zinc-950 overflow-x-auto">
          <button
            onClick={() => setActiveTab('panelJson')}
            className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'panelJson'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            JSON Model
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'html'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            HTML / Handlebars
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'css'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            CSS Styles
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-2.5 px-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'instructions'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Guia de Instalação
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar bg-[#0c0c0e]">
          {activeTab === 'panelJson' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
                <span className="text-zinc-400 font-mono text-[11px]">
                  Importe no Grafana (Painel &gt; Inspecionar &gt; Painel JSON):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadJson}
                    className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono px-3 py-1.5 rounded-sm border border-zinc-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-orange-500" />
                    <span>Baixar .json</span>
                  </button>
                  <button
                    onClick={() => handleCopy(panelJsonString, 'panelJson')}
                    className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-sm transition-colors"
                  >
                    {copiedTab === 'panelJson' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === 'panelJson' ? 'Copiado!' : 'Copiar JSON'}</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-sm bg-black border border-zinc-800 text-orange-400 font-mono text-xs overflow-x-auto max-h-[380px] custom-scrollbar">
                {panelJsonString}
              </pre>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">
                  Cole na aba <strong>Content</strong> do Business Text:
                </span>
                <button
                  onClick={() => handleCopy(theme.htmlContent, 'html')}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-sm transition-colors"
                >
                  {copiedTab === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'html' ? 'Copiado!' : 'Copiar HTML'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-sm bg-black border border-zinc-800 text-zinc-100 font-mono text-xs overflow-x-auto max-h-[380px] custom-scrollbar">
                {theme.htmlContent}
              </pre>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">
                  Cole na aba <strong>CSS Styles</strong> do Business Text:
                </span>
                <button
                  onClick={() => handleCopy(theme.cssContent, 'css')}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-sm transition-colors"
                >
                  {copiedTab === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'css' ? 'Copiado!' : 'Copiar CSS'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-sm bg-black border border-zinc-800 text-orange-400 font-mono text-xs overflow-x-auto max-h-[380px] custom-scrollbar">
                {theme.cssContent}
              </pre>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4 text-xs text-zinc-300 font-mono">
              <div className="bg-black p-4 rounded-sm border border-zinc-800 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span>Passo 1: Instalar o Plugin Business Text</span>
                </h4>
                <p className="text-zinc-400 font-normal">Execute o comando CLI no servidor do Grafana:</p>
                <div className="bg-zinc-950 border border-zinc-800 p-2.5 rounded-sm font-mono text-orange-400 flex items-center justify-between">
                  <span>grafana-cli plugins install volkovlabs-business-text-panel</span>
                  <button
                    onClick={() => handleCopy('grafana-cli plugins install volkovlabs-business-text-panel', 'cli')}
                    className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-sm text-zinc-300 hover:text-white"
                  >
                    {copiedTab === 'cli' ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 font-normal">Ou instale pela interface web: Administração &gt; Plugins &gt; "Business Text".</p>
              </div>

              <div className="bg-black p-4 rounded-sm border border-zinc-800 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Passo 2: Criar e Configurar o Painel</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 font-normal">
                  <li>No seu Dashboard do Grafana, clique em <strong>Add Visualization</strong>.</li>
                  <li>Selecione o plugin <strong>Business Text</strong>.</li>
                  <li>Na aba <strong>Content</strong>, cole o template HTML Handlebars.</li>
                  <li>Na aba <strong>CSS Styles</strong>, cole os estilos CSS.</li>
                  <li>Configure sua query retornando campos correspondentes às tags <code className="text-orange-400 font-mono">{'{{campo}}'}</code>.</li>
                  <li>Salve o painel e dashboard.</li>
                </ol>
              </div>

              {/* Boas Práticas Volkov Labs */}
              <div className="bg-zinc-950 p-4 rounded-sm border border-orange-500/30 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-2">
                  <span>⚡ Padrões de Produção Volkov Labs (v12+)</span>
                </h4>
                <ul className="space-y-1.5 text-[11px] text-zinc-300">
                  <li>• <strong>Wrapper Único Scoped:</strong> Todos os estilos estão encapsulados dentro de uma classe raiz única para nunca vazar estilos para o Grafana.</li>
                  <li>• <strong>Resiliência de Dados:</strong> Use <code className="text-orange-400 font-mono">{'{{#if this.value}}{{this.value}}{{else}}N/D{{/if}}'}</code> para tolerar atrasos do Zabbix/Prometheus sem quebrar o layout.</li>
                  <li>• <strong>Helpers Nativos:</strong> Suporte completo a <code className="text-orange-400 font-mono">(eq a b)</code>, <code className="text-orange-400 font-mono">(ne a b)</code>, <code className="text-orange-400 font-mono">(gt a b)</code> e <code className="text-orange-400 font-mono">(lt a b)</code>.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-black flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono uppercase px-4 py-2 rounded-sm border border-zinc-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
