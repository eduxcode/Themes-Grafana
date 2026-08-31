import React, { useState } from 'react';
import { ReusableComponent } from '../types';
import { Boxes, Copy, Check, Plus, Code, Eye } from 'lucide-react';
import { renderBusinessTemplate } from '../utils/handlebarsEngine';

interface ComponentLibraryProps {
  components: ReusableComponent[];
  onInsertIntoPlayground: (comp: ReusableComponent) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
  components,
  onInsertIntoPlayground
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Blocos' },
    { id: 'enterprise', label: 'Corporativo & SLAs' },
    { id: 'kpi', label: 'KPI & Métricas' },
    { id: 'status', label: 'Status & Dots' },
    { id: 'gauges', label: 'Meters & Gauges' },
    { id: 'tables', label: 'Tabelas & Inventário' },
    { id: 'alerts', label: 'Alert Banners' },
    { id: 'logs', label: 'Log Streams' },
  ];

  const filteredComponents = components.filter((comp) => {
    const matchCat = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="component-library-container" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <Boxes className="w-3 h-3 text-orange-500" />
            <span>Modular Component Blocks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic text-white">
            COMPONENT <span className="text-orange-500">LIBRARY</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
            Copie blocos modulares pré-estilizados ou insira-os diretamente no seu template ativo para compor painéis complexos em segundos.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
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

        <input
          type="text"
          placeholder="BUSCAR COMPONENTES..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 bg-[#0c0c0e] border border-zinc-800 rounded-sm px-3 py-2 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 uppercase"
        />
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComponents.map((comp) => {
          const renderedHtml = renderBusinessTemplate(comp.htmlSnippet, comp.sampleData);
          const fullSnippet = `<!-- HTML CONTENT (Business Text) -->\n${comp.htmlSnippet}\n\n/* CSS STYLES */\n${comp.cssSnippet}`;

          return (
            <div
              key={comp.id}
              className="bg-[#0c0c0e] border border-zinc-800 rounded-sm overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-base font-black uppercase tracking-tight text-white">{comp.name}</h3>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-sm border border-zinc-800">
                    {comp.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{comp.description}</p>
              </div>

              {/* Component Live Render Box */}
              <div className="px-5 py-3">
                <div className="p-4 rounded-sm bg-black border border-zinc-800/80 overflow-x-auto min-h-[120px] flex items-center justify-center">
                  <style>{comp.cssSnippet}</style>
                  <div className="w-full" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-3 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between gap-3">
                <button
                  onClick={() => onInsertIntoPlayground(comp)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest py-2 px-3 rounded-sm transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Inserir no Playground</span>
                </button>

                <button
                  onClick={() => handleCopyCode(comp.id, fullSnippet)}
                  className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono py-2 px-3 rounded-sm border border-zinc-800 transition-colors"
                  title="Copiar código completo (HTML + CSS)"
                >
                  {copiedId === comp.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-orange-500" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
