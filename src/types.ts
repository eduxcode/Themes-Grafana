export type ThemeCategory = 
  | 'all'
  | 'cyberpunk'
  | 'tactical-hud'
  | 'neo-tokyo'
  | 'synthwave'
  | 'industrial-brutalist'
  | 'crimson-soc'
  | 'glassmorphism'
  | 'enterprise'
  | 'terminal'
  | 'minimal'
  | 'dark-luxury'
  | 'aurora'
  | 'monochrome-eink';

export type ServiceCategory = 
  | 'all'
  | 'enterprise-infra'
  | 'security'
  | 'containers'
  | 'database'
  | 'networking'
  | 'system'
  | 'cloud'
  | 'messaging'
  | 'storage';

export interface GrafanaVariable {
  name: string;
  description: string;
  defaultValue: string;
  type?: 'dashboard' | 'custom' | 'global';
}

export interface GrafanaTheme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ThemeCategory;
  accentColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  htmlContent: string;
  cssContent: string;
  mockData: any;
  dynamicVariables: GrafanaVariable[];
  tags: string[];
  isDark: boolean;
  author?: string;
  recommendedFor?: string[];
}

export interface ServicePreset {
  id: string;
  serviceName: string;
  serviceLogo: string; // Lucide icon name or svg
  category: ServiceCategory;
  description: string;
  defaultThemeId: string;
  htmlContent: string;
  cssContent: string;
  mockData: any;
  dynamicVariables: GrafanaVariable[];
  suggestedMetrics: string[];
  grafanaPanelTitle: string;
  tags: string[];
}

export interface ReusableComponent {
  id: string;
  name: string;
  category: 'kpi' | 'gauges' | 'status' | 'alerts' | 'tables' | 'navigation' | 'logs' | 'enterprise';
  description: string;
  htmlSnippet: string;
  cssSnippet: string;
  sampleData: any;
  previewScale?: number;
}

export interface CustomizerSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  cardBgOpacity: number;
  textColor: string;
  fontFamily: string;
  borderRadius: number;
  glowIntensity: 'none' | 'subtle' | 'vibrant' | 'neon';
  borderWidth: number;
  padding: number;
  showGridLines: boolean;
  grafanaTheme: 'dark' | 'light';
}

export interface AiGenerationRequest {
  serviceName: string;
  serviceDescription?: string;
  designStyle: string;
  panelType: string;
  customMetrics?: string;
  colorPalette?: string;
}
