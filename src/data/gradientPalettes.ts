export interface GradientPalette {
  id: string;
  name: string;
  category: 'sequential' | 'diverging' | 'categorical' | 'slo-status' | 'cyber-specialized';
  scientificName: string;
  description: string;
  bestPracticeNote: string;
  colors: string[];
  gradientCss: string;
  accentPrimary: string;
  accentSecondary: string;
  darkBg: string;
  lightText: string;
  tags: string[];
  isColorBlindSafe?: boolean;
  recommendedFor: string[];
}

export const DATA_VIZ_GRADIENT_PALETTES: GradientPalette[] = [
  // SEQUENTIAL
  {
    id: 'viridis-scientific',
    name: 'Viridis Scientific',
    category: 'sequential',
    scientificName: 'Perceptually Uniform Viridis (ColorBrewer / Matplotlib)',
    description: 'Padrão ouro em visualização de dados científicos e telemetria. Linearidade de luminância perceptualmente uniforme.',
    bestPracticeNote: 'Excelente para evitar falsos picos ópticos e 100% legível para daltônicos (deuteranopia/protanopia).',
    colors: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
    gradientCss: 'linear-gradient(135deg, #440154 0%, #3b528b 25%, #21918c 50%, #5ec962 75%, #fde725 100%)',
    accentPrimary: '#5ec962',
    accentSecondary: '#21918c',
    darkBg: '#0b0c16',
    lightText: '#fde725',
    isColorBlindSafe: true,
    tags: ['Colorblind Safe', 'Perceptually Uniform', 'Scientific', 'Linear Lum'],
    recommendedFor: ['CPU & Memory Heatmaps', 'Throughput Contínuo', 'Latência de Disco', 'SLO Histogram']
  },
  {
    id: 'plasma-thermal',
    name: 'Plasma High Energy',
    category: 'sequential',
    scientificName: 'Plasma Colormap (High Dynamic Range)',
    description: 'Gradiente de alta energia de azul profundo a amarelo estelar para métricas intensas de carga e picos de tráfego.',
    bestPracticeNote: 'Alta distinção em fundos escuros do Grafana mantendo contraste WCAG AAA.',
    colors: ['#0d0887', '#6a00a8', '#b12a90', '#e16462', '#fca636', '#f0f921'],
    gradientCss: 'linear-gradient(135deg, #0d0887 0%, #6a00a8 20%, #b12a90 40%, #e16462 60%, #fca636 80%, #f0f921 100%)',
    accentPrimary: '#fca636',
    accentSecondary: '#b12a90',
    darkBg: '#090514',
    lightText: '#fdf2f8',
    isColorBlindSafe: true,
    tags: ['High Dynamic Range', 'Thermal Load', 'Dark Mode Optimized'],
    recommendedFor: ['IOPS Picos', 'Network Egress Burst', 'Stress Testing', 'GPU Compute Load']
  },
  {
    id: 'cyan-emerald-flow',
    name: 'Cyan to Emerald Velocity',
    category: 'sequential',
    scientificName: 'Cold-to-Flow Throughput Sequential',
    description: 'Transição suave de ciano ártico para esmeralda vibrante e verde-limão de alta velocidade.',
    bestPracticeNote: 'Ideal para métricas de fluxo contínuo onde "mais alto" representa saúde e alta vazão.',
    colors: ['#0891b2', '#06b6d4', '#10b981', '#34d399', '#a3e635'],
    gradientCss: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 30%, #10b981 70%, #a3e635 100%)',
    accentPrimary: '#06b6d4',
    accentSecondary: '#10b981',
    darkBg: '#041014',
    lightText: '#ecfeff',
    isColorBlindSafe: false,
    tags: ['High Flow', 'Pipeline Health', 'Bandwidth', 'Throughput'],
    recommendedFor: ['Kafka Message Ingestion', 'HTTP Requests/sec', 'Database Queries/s', 'API Gateway Mesh']
  },
  {
    id: 'nordic-ice-slate',
    name: 'Nordic Ice Monochromatic',
    category: 'sequential',
    scientificName: 'Low-Fatigue Monochromatic Slate-to-Ice',
    description: 'Paleta fria de baixa fadiga visual para salas de controle NOC que operam 24/7.',
    bestPracticeNote: 'Reduz o cansaço visual de operadores em turnos longos com contraste balanceado.',
    colors: ['#0f172a', '#1e293b', '#0284c7', '#38bdf8', '#bae6fd'],
    gradientCss: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0284c7 70%, #38bdf8 100%)',
    accentPrimary: '#38bdf8',
    accentSecondary: '#0284c7',
    darkBg: '#090d16',
    lightText: '#f0f9ff',
    isColorBlindSafe: true,
    tags: ['NOC 24/7', 'Low Eye Fatigue', 'Clean Monochromatic'],
    recommendedFor: ['Enterprise SLA', 'Cluster Storage', 'VMware / Hyper-V', 'Ceph Cluster Pools']
  },

  // DIVERGING
  {
    id: 'spectral-diverging',
    name: 'Spectral Cool-to-Warm Divergence',
    category: 'diverging',
    scientificName: 'Diverging Spectral Target Delta (ColorBrewer)',
    description: 'Perfeito para medir desvio em relação à meta (Zero Delta) ou balanceamento positivo/negativo.',
    bestPracticeNote: 'Ponto médio neutro claro, permitindo identificar anomalias para cima ou para baixo instantaneamente.',
    colors: ['#2b83ba', '#abdda4', '#ffffbf', '#fdae61', '#d7191c'],
    gradientCss: 'linear-gradient(135deg, #2b83ba 0%, #abdda4 30%, #ffffbf 50%, #fdae61 70%, #d7191c 100%)',
    accentPrimary: '#2b83ba',
    accentSecondary: '#d7191c',
    darkBg: '#0c0f17',
    lightText: '#ffffff',
    isColorBlindSafe: true,
    tags: ['Zero Baseline', 'Target Deviation', 'Drift Detection'],
    recommendedFor: ['Desvio de SLA (+/- %)', 'Variação de Latência vs Baseline', 'Temperature Variance', 'Drift de Modelo AI']
  },
  {
    id: 'teal-orange-accessible',
    name: 'Teal & Coral Divergent (Colorblind Safe)',
    category: 'diverging',
    scientificName: 'Accessible Teal-to-Coral Polar Opposites',
    description: 'Alternativa moderna e inclusiva ao clássico vermelho/verde, com contraste estético elevado.',
    bestPracticeNote: 'Evita a confusão vermelho/verde e oferece estética executiva de alta definição.',
    colors: ['#0f766e', '#14b8a6', '#fef08a', '#fb923c', '#ea580c'],
    gradientCss: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 30%, #fde047 50%, #fb923c 75%, #ea580c 100%)',
    accentPrimary: '#14b8a6',
    accentSecondary: '#ea580c',
    darkBg: '#090f12',
    lightText: '#f0fdfa',
    isColorBlindSafe: true,
    tags: ['Accessible Alternative', 'Universal Design', 'Executive Clean'],
    recommendedFor: ['Delta de Transações', 'Ganho vs Perda de Conexão', 'Consumer Group Lag Trend']
  },

  // SLO / HEALTH STATES
  {
    id: 'slo-sre-telemetry',
    name: 'SRE / SLO Three-Tier State',
    category: 'slo-status',
    scientificName: 'Standard SRE Error Budget & Availability Tri-Color',
    description: 'Hierarquia visual estrita para orçamentos de erro, disponibilidade de serviços e burn rate de SLO.',
    bestPracticeNote: 'Cores semânticas padronizadas: Verde (Conforme >99.9%), Âmbar (Atenção 95-99%), Vermelho (Violação <95%).',
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    gradientCss: 'linear-gradient(135deg, #10b981 0%, #f59e0b 50%, #ef4444 100%)',
    accentPrimary: '#10b981',
    accentSecondary: '#ef4444',
    darkBg: '#090b0d',
    lightText: '#ffffff',
    tags: ['SRE Standard', 'Error Budget', 'Burn Rate', 'Tri-Color'],
    recommendedFor: ['Error Budgets', 'Kubernetes Pod Readiness', 'Uptime de Endpoints', 'Incident Response Alerting']
  },
  {
    id: 'crimson-defcon-hazard',
    name: 'DEFCON Critical Threat Matrix',
    category: 'slo-status',
    scientificName: 'High Severity Security Perimeter Matrix',
    description: 'Degradê carmesim de alta voltagem para SOC, firewalls de borda e ataque DDoS.',
    bestPracticeNote: 'Chama atenção imediata para anomalias de segurança sem sobrecarregar telas adjacentes.',
    colors: ['#450a0a', '#991b1b', '#dc2626', '#f87171', '#fecaca'],
    gradientCss: 'linear-gradient(135deg, #450a0a 0%, #991b1b 35%, #dc2626 70%, #f87171 100%)',
    accentPrimary: '#dc2626',
    accentSecondary: '#f87171',
    darkBg: '#0d0406',
    lightText: '#ffebee',
    tags: ['SOC Severity', 'DDoS Mitigation', 'Security Perimeter'],
    recommendedFor: ['WAF Block Rate', 'DDoS Attack Volume', 'Failed Auth Spikes', 'IDS/IPS Snort Alerts']
  },

  // CYBER & SPECIALIZED
  {
    id: 'cyberpunk-neon-duo',
    name: 'Cyberpunk Neon Velocity (Magenta & Cyan)',
    category: 'cyber-specialized',
    scientificName: 'High Luminescence Bipolar Cyber Gradient',
    description: 'Estética de alta densidade inspirada em HUDs futuristas e dashboards de alta velocidade.',
    bestPracticeNote: 'Brilhos de alta saturação que destacam números de métricas críticas em painéis escuros.',
    colors: ['#00f0ff', '#7000ff', '#ff007a', '#ffbe0b'],
    gradientCss: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 40%, #ff007a 80%, #ffbe0b 100%)',
    accentPrimary: '#00f0ff',
    accentSecondary: '#ff007a',
    darkBg: '#080510',
    lightText: '#ffffff',
    tags: ['High Saturation', 'Neon Glow', 'Futuristic HUD'],
    recommendedFor: ['HFT Trading Desks', 'Gaming Server Latency', 'Real-time WebSocket Ops', 'Edge CDN Nodes']
  },
  {
    id: 'amber-solar-luxury',
    name: 'Obsidian Amber Solar',
    category: 'cyber-specialized',
    scientificName: 'Warm Photon Solar Radiation Palette',
    description: 'Degradê dourado e âmbar profundo, remetendo a telemetria aeroespacial e termometria de precisão.',
    bestPracticeNote: 'Visual executivo e sofisticado com alto contraste sobre superfícies pretas de alta profundidade.',
    colors: ['#78350f', '#b45309', '#f59e0b', '#fbbf24', '#fef3c7'],
    gradientCss: 'linear-gradient(135deg, #78350f 0%, #b45309 30%, #f59e0b 65%, #fbbf24 85%, #fef3c7 100%)',
    accentPrimary: '#f59e0b',
    accentSecondary: '#fbbf24',
    darkBg: '#0f0a04',
    lightText: '#fffbeb',
    tags: ['Solar Flare', 'Gold Luxury', 'Aerospace'],
    recommendedFor: ['Solar & Green Energy', 'Power Generation', 'High-Tier Financial KPIs', 'Executive Overviews']
  }
];

/**
 * Injects or updates gradient variables and classes in a CSS stylesheet string
 */
export function applyGradientToCss(existingCss: string, palette: GradientPalette): string {
  // Define custom palette variable block
  const paletteBlock = `/* === DataViz Gradient Palette: ${palette.name} (${palette.scientificName}) === */
:root {
  --dv-gradient: ${palette.gradientCss};
  --dv-accent-primary: ${palette.accentPrimary};
  --dv-accent-secondary: ${palette.accentSecondary};
  --dv-bg: ${palette.darkBg};
  --dv-text: ${palette.lightText};
}

/* Gradient Utility Helpers for Business Text */
.dv-gradient-text {
  background: ${palette.gradientCss};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-weight: 900;
}

.dv-gradient-border {
  border: 1px solid transparent;
  background-image: linear-gradient(${palette.darkBg}, ${palette.darkBg}), ${palette.gradientCss};
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.dv-gradient-bar {
  background: ${palette.gradientCss};
  box-shadow: 0 0 12px ${palette.accentPrimary}40;
}

.dv-accent-pill {
  background: ${palette.accentPrimary}20;
  border: 1px solid ${palette.accentPrimary};
  color: ${palette.accentPrimary};
}
`;

  // If previous dataviz block exists, replace it, else prepend
  const regex = /\/\* === DataViz Gradient Palette:[\s\S]*?\/\* === End DataViz Palette === \*\//;
  const wrappedBlock = `${paletteBlock}\n/* === End DataViz Palette === */\n\n`;

  if (regex.test(existingCss)) {
    return existingCss.replace(regex, wrappedBlock.trim());
  }

  // Also intelligently replace prominent accent colors in existing CSS if they match standard hexes
  let updated = existingCss;
  
  // Replace old border glow or accent colors with the new primary/secondary
  updated = updated.replace(/#10b981|#38bdf8|#f97316|#a855f7|#eab308|#ec4899/gi, (match) => {
    return palette.accentPrimary;
  });

  return `${wrappedBlock}${updated}`;
}
