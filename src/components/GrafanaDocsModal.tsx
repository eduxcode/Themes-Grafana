import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Code, 
  Terminal, 
  Sparkles, 
  ExternalLink, 
  Lightbulb, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Copy, 
  Check, 
  FileCode, 
  Server, 
  Layers, 
  Workflow
} from 'lucide-react';

interface GrafanaDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrafanaDocsModal: React.FC<GrafanaDocsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'install' | 'steps' | 'handlebars' | 'services' | 'enterprise'>('install');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black uppercase tracking-tight text-white">
                  GUIA DE IMPLEMENTAÇÃO // GRAFANA v12+ ENTERPRISE
                </h3>
                <span className="text-[9px] font-mono font-black uppercase tracking-wider bg-orange-500 text-black px-1.5 py-0.5 rounded-sm">
                  100% PRODUÇÃO
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Desenvolvido por <span className="text-orange-400 font-semibold">Davi Soares</span> • Volkov Labs Business Text Plugin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs within Guide */}
        <div className="flex items-center gap-1 bg-[#121215] px-4 py-2 border-b border-zinc-800 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveGuideTab('install')}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              activeGuideTab === 'install'
                ? 'bg-orange-500 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            1. Instalação do Plugin
          </button>
          <button
            onClick={() => setActiveGuideTab('steps')}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              activeGuideTab === 'steps'
                ? 'bg-orange-500 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            2. Passo a Passo no Grafana
          </button>
          <button
            onClick={() => setActiveGuideTab('handlebars')}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              activeGuideTab === 'handlebars'
                ? 'bg-orange-500 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            3. Variáveis & Handlebars
          </button>
          <button
            onClick={() => setActiveGuideTab('services')}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              activeGuideTab === 'services'
                ? 'bg-orange-500 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            4. AD, Fortinet, Docker & SNMP
          </button>
          <button
            onClick={() => setActiveGuideTab('enterprise')}
            className={`px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
              activeGuideTab === 'enterprise'
                ? 'bg-orange-500 text-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            5. Configuração grafana.ini
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs text-zinc-300 font-normal custom-scrollbar bg-[#0c0c0e]">
          {/* TAB 1: INSTALL */}
          {activeGuideTab === 'install' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span>Como Instalar o Plugin Business Text no Grafana 12+</span>
                </h4>
                <p className="mt-1 text-zinc-300 text-xs leading-relaxed">
                  O plugin <strong>Business Text</strong> (criado pela <strong>Volkov Labs</strong>) é totalmente gratuito, open-source e compatível com <strong>Grafana v12+, v11, v10 e v9</strong> (OSS, Enterprise e Cloud).
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase">Opção A: Grafana CLI (Linux / Docker / Windows)</span>
                  <button 
                    onClick={() => copyToClipboard('grafana cli plugins install volkovlabs-echarts-panel volkovlabs-variable-panel volkovlabs-form-panel volkovlabs-dynamictext-panel', 'cli')}
                    className="flex items-center gap-1 text-[10px] text-orange-400 hover:text-orange-300 font-mono"
                  >
                    {copiedCode === 'cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'cli' ? 'Copiado!' : 'Copiar Comando'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black border border-zinc-800 rounded-sm font-mono text-[11px] text-orange-400 overflow-x-auto">
# Para Grafana v12+ e versões anteriores:
grafana cli plugins install volkovlabs-dynamictext-panel

# Reinicie o serviço do Grafana:
sudo systemctl restart grafana-server
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase">Opção B: Via Docker Compose</span>
                  <button 
                    onClick={() => copyToClipboard('GF_INSTALL_PLUGINS=volkovlabs-dynamictext-panel', 'docker')}
                    className="flex items-center gap-1 text-[10px] text-orange-400 hover:text-orange-300 font-mono"
                  >
                    {copiedCode === 'docker' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'docker' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black border border-zinc-800 rounded-sm font-mono text-[11px] text-orange-400 overflow-x-auto">
services:
  grafana:
    image: grafana/grafana:12.0.0
    environment:
      - GF_INSTALL_PLUGINS=volkovlabs-dynamictext-panel
      - GF_PANELS_DISABLE_SANITIZE_HTML=true
    ports:
      - "3000:3000"
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: STEPS */}
          {activeGuideTab === 'steps' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-orange-500" />
                <span>Passo a Passo de Aplicação em Ambientes Corporativos</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#121216] p-4 rounded-sm border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-black font-black text-xs flex items-center justify-center font-mono">1</span>
                    <strong className="text-white text-xs uppercase tracking-tight">Criar o Painel no Grafana</strong>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    No seu Dashboard, clique em <strong>+ Add visualization</strong>. No seletor de tipo de painel no canto superior direito, escolha <strong>Business Text</strong> (ou <em>Dynamic Text</em>).
                  </p>
                </div>

                <div className="bg-[#121216] p-4 rounded-sm border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-black font-black text-xs flex items-center justify-center font-mono">2</span>
                    <strong className="text-white text-xs uppercase tracking-tight">Configurar as Queries de Dados</strong>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Escreva sua consulta (Prometheus PromQL, PostgreSQL SQL, InfluxQL, Zabbix ou CloudWatch). Defina os <em>Aliases</em> ou nomes de colunas que deseja usar no template.
                  </p>
                </div>

                <div className="bg-[#121216] p-4 rounded-sm border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-black font-black text-xs flex items-center justify-center font-mono">3</span>
                    <strong className="text-white text-xs uppercase tracking-tight">Colar o Template HTML</strong>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Copie o código da aba <strong>HTML Content</strong> aqui do Studio e cole no campo <strong>Content / Template</strong> do plugin.
                  </p>
                </div>

                <div className="bg-[#121216] p-4 rounded-sm border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-black font-black text-xs flex items-center justify-center font-mono">4</span>
                    <strong className="text-white text-xs uppercase tracking-tight">Colar os Estilos CSS Isolados</strong>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Copie o código da aba <strong>CSS Styles</strong> e cole na seção <strong>Styles / CSS</strong> do Business Text. Ele não vazará estilos para o restante do Grafana.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HANDLEBARS */}
          {activeGuideTab === 'handlebars' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-orange-500" />
                <span>Sintaxe Handlebars &amp; Helpers Nativos do Volkov Labs (Grafana v12+)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black p-3.5 rounded-sm border border-zinc-800">
                  <span className="font-mono text-orange-400 font-bold block mb-1">{'{{#if (eq a b)}} ... {{/if}}'}</span>
                  <span className="text-[11px] text-zinc-400"><strong>(eq a b):</strong> Compara se <em>a</em> é igual a <em>b</em> (ex: status == 'HEALTHY').</span>
                </div>
                <div className="bg-black p-3.5 rounded-sm border border-zinc-800">
                  <span className="font-mono text-orange-400 font-bold block mb-1">{'{{#if (ne a b)}} ... {{/if}}'}</span>
                  <span className="text-[11px] text-zinc-400"><strong>(ne a b):</strong> Compara se <em>a</em> é diferente de <em>b</em> (ex: status != 'CRITICAL').</span>
                </div>
                <div className="bg-black p-3.5 rounded-sm border border-zinc-800">
                  <span className="font-mono text-orange-400 font-bold block mb-1">{'{{#if (gt a b)}} ... {{/if}}'}</span>
                  <span className="text-[11px] text-zinc-400"><strong>(gt a b):</strong> Maior que (ex: latência &gt; 100ms, CPU &gt; 80%).</span>
                </div>
                <div className="bg-black p-3.5 rounded-sm border border-zinc-800">
                  <span className="font-mono text-orange-400 font-bold block mb-1">{'{{#if (lt a b)}} ... {{/if}}'}</span>
                  <span className="text-[11px] text-zinc-400"><strong>(lt a b):</strong> Menor que (ex: disco livre &lt; 10GB).</span>
                </div>
              </div>

              {/* Regra de Resiliência de Dados Nulos */}
              <div className="bg-zinc-950 p-4 rounded-sm border border-zinc-800 space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Tratamento de Dados Nulos ou Indefinidos (Resiliência Zabbix / Prometheus)</span>
                </h5>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Para que seu painel nunca quebre caso o Zabbix, Prometheus ou banco demore alguns segundos para responder ou retorne valores nulos, sempre use verificações com fallback:
                </p>
                <pre className="p-2.5 bg-black border border-zinc-800 rounded-sm font-mono text-[11px] text-orange-400">
{'{{#if this.value}}{{this.value}}{{else}}N/D{{/if}}'}
                </pre>
              </div>

              {/* Regra de Wrapper CSS Único */}
              <div className="bg-zinc-950 p-4 rounded-sm border border-zinc-800 space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-500" />
                  <span>Encapsulamento com Wrapper Único (CSS Scoped)</span>
                </h5>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Para evitar vazamento de estilos para o Grafana ou outros painéis, sempre encapsule todas as regras dentro da classe raiz única do painel:
                </p>
                <pre className="p-2.5 bg-black border border-zinc-800 rounded-sm font-mono text-[11px] text-emerald-400">
{`/* Correto: Encapsulado dentro do wrapper único */
.meu-painel-custom .card { background: #0c0c0e; border-radius: 8px; }
.meu-painel-custom h1 { font-size: 18px; color: #f97316; }

/* Evite: Estilos soltos que podem afetar o Grafana */
h1 { font-size: 18px; }
.card { background: #0c0c0e; }`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeGuideTab === 'services' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-orange-500" />
                <span>Soluções Corporativas Suportadas e Métricas</span>
              </h4>

              <div className="space-y-3">
                <div className="bg-[#141418] p-3.5 rounded-sm border border-zinc-800">
                  <strong className="text-white text-xs block mb-1">🛡️ Active Directory Domain Services (AD DS)</strong>
                  <p className="text-[11px] text-zinc-400">
                    Monitore controladores de domínio (DC) via Windows Exporter: Contas bloqueadas (Event 4740), falhas Kerberos/NTLM, latência de LDAP e status de replicação FSMO.
                  </p>
                </div>

                <div className="bg-[#141418] p-3.5 rounded-sm border border-zinc-800">
                  <strong className="text-white text-xs block mb-1">🔥 Fortinet FortiGate Firewalls (NGFW)</strong>
                  <p className="text-[11px] text-zinc-400">
                    Monitore via SNMP ou syslog: Consumo de CPU/Memória dos NP6/CP9, sessões ativas no state table, túneis IPsec e SSL-VPN, e eventos mitigados de IPS/WAF.
                  </p>
                </div>

                <div className="bg-[#141418] p-3.5 rounded-sm border border-zinc-800">
                  <strong className="text-white text-xs block mb-1">🐳 Docker &amp; Kubernetes Clusters</strong>
                  <p className="text-[11px] text-zinc-400">
                    Monitore containers via cAdvisor / kube-state-metrics: CPU/RAM working set, contagem de containers por estado, reinicializações e pods em CrashLoopBackOff.
                  </p>
                </div>

                <div className="bg-[#141418] p-3.5 rounded-sm border border-zinc-800">
                  <strong className="text-white text-xs block mb-1">🖨️ Parque de Impressoras de Rede (SNMP MIB)</strong>
                  <p className="text-[11px] text-zinc-400">
                    Monitore impressoras HP, Kyocera, Ricoh, Xerox e Brother via SNMP Exporter: Níveis de Toner CMYK (0-100%), status das bandejas de papel e totalizadores de páginas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ENTERPRISE GRAFANA.INI */}
          {activeGuideTab === 'enterprise' && (
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950 border border-orange-500/40 rounded-sm space-y-3">
                <h4 className="text-xs font-black text-orange-400 flex items-center gap-2 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-orange-500" />
                  <span>Desbloquear Renderização HTML Completa no Grafana v12+</span>
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-normal">
                  Por padrão, o Grafana sanitiza scripts e tags HTML avançadas para segurança básica. Para permitir que SVGs, gradientes, ícones e animações funcionem perfeitamente nas empresas, adicione no arquivo <code className="bg-black border border-zinc-800 px-1.5 py-0.5 rounded-sm text-orange-400 font-mono">grafana.ini</code>:
                </p>
                <pre className="p-3 bg-black border border-zinc-800 rounded-sm font-mono text-[11px] text-orange-400">
[panels]
disable_sanitize_html = true
                </pre>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Localização padrão: <code className="text-zinc-300">/etc/grafana/grafana.ini</code> no Linux ou variável de ambiente <code className="text-zinc-300">GF_PANELS_DISABLE_SANITIZE_HTML=true</code> no Docker.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-zinc-400">
            Desenvolvido por <strong className="text-orange-400 font-bold">Davi Soares</strong> // ThemeEngine Studio
          </div>
          <button
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-black uppercase tracking-widest px-5 py-2 rounded-sm transition-colors shadow-sm"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
