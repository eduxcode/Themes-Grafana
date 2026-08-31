# 🚀 Grafana ThemeEngine Studio // Volkov Labs Business Text (Grafana v12+)

> **O estúdio visual definitivo para criação, customização e exportação de painéis de alta fidelidade para o plugin Business Text (Volkov Labs) no Grafana v12+, v11, v10 e v9.**
>
> 👨‍💻 **Desenvolvido por:** [Davi Soares](https://github.com/)  
> 🏢 **Foco:** Ambientes Corporativos, SRE, DevOps, NOC/SOC e Engenharia de Monitoramento  
> ⚡ **Compatibilidade:** Grafana OSS, Grafana Enterprise e Grafana Cloud

---

## 📖 Índice

- [1. O que é o ThemeEngine Studio?](#1-o-que-é-o-themeengine-studio)
- [2. Para que Serve?](#2-para-que-serve)
- [3. Recursos Principais](#3-recursos-principais)
- [4. Pré-requisitos & Instalação no Grafana](#4-pré-requisitos--instalação-no-grafana)
- [5. Como Usar Passo a Passo](#5-como-usar-passo-a-passo)
- [6. Como Adaptar e Customizar para sua Empresa](#6-como-adaptar-e-customizar-para-sua-empresa)
  - [6.1. Encapsulamento CSS (Scoped Wrapper)](#61-encapsulamento-css-scoped-wrapper)
  - [6.2. Resiliência e Tratamento de Dados Nulos (Zabbix/Prometheus)](#62-resiliência-e-tratamento-de-dados-nulos-zabbixprometheus)
  - [6.3. Helpers Nativos Handlebars do Volkov Labs](#63-helpers-nativos-handlebars-do-volkov-labs)
  - [6.4. Variáveis de Dashboard do Grafana](#64-variáveis-de-dashboard-do-grafana)
- [7. Catálogo de Soluções Corporativas Integradas](#7-catálogo-de-soluções-corporativas-integradas)
- [8. Biblioteca de Componentes Modulares](#8-biblioteca-de-componentes-modulares)
- [9. Como Rodar o Projeto Localmente](#9-como-rodar-o-projeto-localmente)
- [10. Licença e Créditos](#10-licença-e-créditos)

---

## 1. O que é o ThemeEngine Studio?

O **ThemeEngine Studio** é uma plataforma visual interativa desenvolvida especificamente para transformar consultas brutas do Grafana (Prometheus, PostgreSQL, MySQL, Zabbix, InfluxDB, CloudWatch, Elasticsearch, etc.) em **interfaces modernas, elegantes e intuitivas**.

Ele utiliza como motor o consagrado plugin open-source **[Business Text (antigo Dynamic Text)](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/)** da **Volkov Labs**, combinando o poder dos templates **Handlebars** com **CSS Scoped** e **SVGs dinâmicos**.

---

## 2. Para que Serve?

Os painéis padrão do Grafana (Stat, TimeSeries, Table) são excelentes para gráficos convencionais, mas possuem limitações severas quando sua equipe precisa de:

1. **Monitores Executivos & Telões de NOC/SOC:** Painéis com tipografia refinada, barras de SLA, alertas pulsantes e matrizes de estado legíveis a metros de distância.
2. **Dashboards Especializados de Infraestrutura:** Visão detalhada de servidores **Active Directory (AD DS)**, firewalls **Fortinet FortiGate**, containers **Docker/Kubernetes**, servidores **Linux/Windows** e parque de **Impressoras SNMP**.
3. **Liberdade Total de Design:** Gradientes de dados profissionais, micro-sparklines SVG, medidores circulares e tabelas ricas com mini-gauges de uso de partição sem depender de plugins pesados.
4. **Isolamento e Segurança:** Código padronizado e validado para garantir que nenhum estilo CSS vaze ou interfira na barra lateral ou em outros painéis do Grafana.

---

## 3. Recursos Principais

- 🎨 **Galeria de Temas Prontos:** Mais de 20 temas estilizados (Cyberpunk HUD, Glassmorphic Frost, Enterprise Swiss Slate, Obsidian Amber, Retro CRT Matrix, Nordic Teal, etc.).
- 🛡️ **Serviços Corporativos Prontos para Uso:** Presets completos para Active Directory, Fortinet NGFW, Docker Hosts, Linux RHEL/Ubuntu, Windows IIS e Impressoras de Rede.
- 🤖 **Gerador IA com Gemini:** Crie layouts e templates Handlebars personalizados sob demanda a partir de qualquer prompt ou especificação técnica.
- 🧩 **Biblioteca de Componentes Modulares:** Snippets prontos de cartões KPI com delta, termômetros de SLA / Error Budget, tabelas de disco, níveis de toner CMYK e consoles de log.
- 🧪 **Live Playground com Motor Handlebars:** Edite HTML, CSS e JSON de dados mockados em tempo real com renderizador ao vivo compatível com o plugin da Volkov Labs.
- 📦 **Exportador em 1 Clique:** Baixe o código HTML puro, estilos CSS isolados ou o **Painel JSON completo** pronto para colar no seu dashboard do Grafana.

---

## 4. Pré-requisitos & Instalação no Grafana

O plugin Business Text é 100% gratuito e compatível com todas as edições do Grafana (v9.x até v12.x+).

### Opção A: Instalação via Grafana CLI (Linux / Windows)

```bash
# Instalação do plugin Business Text (Volkov Labs)
grafana cli plugins install volkovlabs-dynamictext-panel

# Reinicie o serviço do Grafana
sudo systemctl restart grafana-server
```

### Opção B: Instalação via Docker / Docker Compose

Adicione a variável de ambiente `GF_INSTALL_PLUGINS` no seu `docker-compose.yml`:

```yaml
version: '3.8'

services:
  grafana:
    image: grafana/grafana:12.0.0
    container_name: grafana
    environment:
      - GF_INSTALL_PLUGINS=volkovlabs-dynamictext-panel
      - GF_PANELS_DISABLE_SANITIZE_HTML=true
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

### ⚠️ Configuração Obrigatória no `grafana.ini`

Para permitir a renderização de elementos visuais avançados (SVGs dinâmicos, gradientes complexos e badges estilizados), adicione ao arquivo `/etc/grafana/grafana.ini`:

```ini
[panels]
disable_sanitize_html = true
```

---

## 5. Como Usar Passo a Passo

### Passo 1: Selecionar ou Gerar o Painel no Studio
1. Navegue pelas abas **Galeria**, **Serviços** ou use o **Gerador IA**.
2. Ajuste as métricas, títulos ou esquema de cores no **Playground** se desejar.
3. Clique no botão **"Exportar"** no canto superior direito.

### Passo 2: Criar o Painel no Grafana
1. Abra seu Dashboard no Grafana e clique em **+ Add visualization**.
2. No menu suspenso de tipos de visualização (no canto superior direito), selecione **Business Text** (ou *Dynamic Text*).

### Passo 3: Configurar as Queries de Dados
Escreva sua consulta para retornar os dados desejados. O nome das colunas ou labels retornados se tornará o nome da variável no template:
- **Exemplo PromQL:** `100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)` com alias `cpu_usage`.
- **Exemplo SQL:** `SELECT hostname, status, active_sessions FROM firewall_metrics;`

### Passo 4: Aplicar o Template e Estilos
- Copie o conteúdo da aba **HTML Content** e cole no campo **Content / Template** do plugin no Grafana.
- Copie o conteúdo da aba **CSS Styles** e cole no campo **Styles / CSS** do plugin.

---

## 6. Como Adaptar e Customizar para sua Empresa

Ao customizar ou criar novos componentes, siga estas **3 regras fundamentais de produção**:

### 6.1. Encapsulamento CSS (Scoped Wrapper)

> **Regra de Ouro:** Nunca use seletores soltos como `h1`, `table`, `.card` ou `.btn`. Sempre use uma classe raiz única para envolver todo o painel.

```css
/* ✅ CORRETO: Totalmente encapsulado na classe do painel */
.meu-painel-servico {
  background: #090d16;
  border-radius: 8px;
  padding: 16px;
}
.meu-painel-servico h1 {
  color: #f97316;
  font-size: 18px;
}
.meu-painel-servico .metric-val {
  font-family: monospace;
  font-weight: 800;
}

/* ❌ EVITE: Afeta outros painéis e a barra do Grafana */
h1 { color: #f97316; }
.card { padding: 16px; }
```

---

### 6.2. Resiliência e Tratamento de Dados Nulos (Zabbix/Prometheus)

Em ambientes corporativos, fontes de dados como Zabbix, SNMP ou Prometheus podem demorar alguns segundos para inicializar ou responder. **Sempre adicione valores de fallback** para evitar quebras visuais ou renderização de `undefined`:

```handlebars
<!-- ✅ Padrão Seguro com Fallback: -->
<span class="status-badge">
  {{#if this.status}}
    {{this.status}}
  {{else}}
    N/D
  {{/if}}
</span>

<div class="cpu-value">
  {{#if this.cpu_usage}}
    {{this.cpu_usage}}%
  {{else}}
    --%
  {{/if}}
</div>
```

---

### 6.3. Helpers Nativos Handlebars do Volkov Labs

O plugin Business Text possui suporte nativo a helpers de comparação lógica:

| Helper | Significado | Exemplo de Uso |
| :--- | :--- | :--- |
| `(eq a b)` | **Igual a** | `{{#if (eq this.status 'HEALTHY')}}text-green{{/if}}` |
| `(ne a b)` | **Diferente de** | `{{#if (ne this.status 'CRITICAL')}}online{{/if}}` |
| `(gt a b)` | **Maior que** | `{{#if (gt this.latency 100)}}badge-red{{else}}badge-green{{/if}}` |
| `(gte a b)` | **Maior ou igual** | `{{#if (gte this.cpu 80)}}alerta-alto{{/if}}` |
| `(lt a b)` | **Menor que** | `{{#if (lt this.free_disk 10)}}disco-critico{{/if}}` |
| `(lte a b)` | **Menor ou igual** | `{{#if (lte this.toner 15)}}pulse-alerta{{/if}}` |

#### Exemplo Prático com Múltiplas Condições:
```handlebars
<div class="host-row">
  <span class="host-name">{{this.hostname}}</span>
  <span class="badge {{#if (gt this.cpu_usage 85)}}bg-red{{else if (gt this.cpu_usage 70)}}bg-yellow{{else}}bg-green{{/if}}">
    {{#if this.cpu_usage}}{{this.cpu_usage}}%{{else}}N/D{{/if}}
  </span>
</div>
```

---

### 6.4. Variáveis de Dashboard do Grafana

Você pode intercalar variáveis nativas do Grafana e filtros de dropdown diretamente no seu código HTML:

- `${__dashboard.name}`: Nome do dashboard atual.
- `${__from:date}` / `${__to:date}`: Intervalo de tempo selecionado.
- `${servidor}` / `${datacenter}`: Valor selecionado nas variáveis de template criadas por você no menu *Settings > Variables*.

```handlebars
<div class="painel-header">
  <h3>DASHBOARD: ${__dashboard.name}</h3>
  <span>Servidor Ativo: <strong>${servidor}</strong></span>
</div>
```

---

## 7. Catálogo de Soluções Corporativas Integradas

O ThemeEngine Studio já vem pré-carregado com templates de alta densidade testados em produção:

1. **🛡️ Microsoft Active Directory (AD DS):**
   - Contas bloqueadas (*Event ID 4740*), tentativas de senha incorreta Kerberos/NTLM, latência de LDAP e status de replicação FSMO entre Domain Controllers.
2. **🔥 Fortinet FortiGate Firewall (NGFW):**
   - Sessões ativas da state table, consumo de CPU dos chips de aceleração NP6/CP9, status de túneis IPsec/SSL-VPN e eventos mitigados de IPS/WAF.
3. **🐳 Docker Standalone & Kubernetes Clusters:**
   - Contagem de containers (Running/Stopped/Paused), consumo de memória Working Set, contagem de reinicializações (*CrashLoopBackOff*) e carga de CPU.
4. **🐧 Linux Enterprise (RHEL / Rocky / Ubuntu Server):**
   - Carga média (1m, 5m, 15m), memória disponível, I/O Wait de disco e monitoramento de unidades *systemd* com falha.
5. **🪟 Windows Server IIS & Serviços de Rede:**
   - Consumo de CPU/RAM, conexões ativas no pool do IIS, espaço livre em discos C: e D: e status de serviços críticos.
6. **🖨️ Parque de Impressoras de Rede (SNMP MIB):**
   - Níveis de toner CMYK (Cyan, Magenta, Yellow, Black) em tempo real, status das bandejas de papel e totalizadores de páginas impressas.

---

## 8. Biblioteca de Componentes Modulares

Você pode combinar diferentes blocos da aba **Componentes** para montar seu layout:

- **Cartão KPI com Micro Sparkline:** Indicador principal com delta percentual colorido e gráfico de tendência SVG embutido.
- **Termômetro de SLA & Error Budget:** Barra de consumo de Error Budget em minutos com cálculo de uptime 99.9x%.
- **Tabela de Inventário de Partições:** Tabela de discos e volumes com mini-barra de progresso e limiares inteligentes.
- **Níveis de Toner CMYK SNMP:** Medidores horizontais para suprimentos de impressão com alerta visual.
- **Matriz de Status de Microsserviços:** Grade de alta densidade com luzes de status (*Health Dots*) e latência.
- **Banner de Alerta Crítico Pulsante:** Faixa de incidente SOC/NOC com alta visibilidade e botão de reconhecimento.
- **Terminal de Logs em Tempo Real:** Console estilo UNIX com coloração ANSI por severidade (`INFO`, `WARN`, `ERROR`).

---

## 9. Como Rodar o Projeto Localmente

### Requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm`, `yarn`, `pnpm` ou `bun`

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/daviedu800/grafana-theme-studio.git
cd grafana-theme-studio

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (Opcional - para o Gerador IA com Gemini)
cp .env.example .env
# Adicione sua GEMINI_API_KEY no arquivo .env se for usar a geração via IA

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

### Build de Produção

```bash
npm run build
npm start
```

---

## 10. Licença e Créditos

- **Autor:** Davi Soares
- **Plugin de Referência:** [Business Text by Volkov Labs](https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/)
- **Licença:** MIT — Sinta-se livre para usar, adaptar e compartilhar em seus projetos e empresas.

---

<p align="center">
  Feito com dedicação para a comunidade de Observabilidade, DevOps e SRE. 🚀
</p>
