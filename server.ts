import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Grafana Business Text Studio" });
  });

  // AI Theme & Component Generator for any Service/Program
  app.post("/api/gemini/generate-theme", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured.",
        });
      }

      const {
        serviceName,
        serviceDescription,
        designStyle,
        panelType,
        customMetrics,
        colorPalette,
      } = req.body;

      if (!serviceName) {
        return res.status(400).json({ error: "Service name is required." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are a world-class Grafana UI/UX Engineer and Senior DevOps Visualizer specializing in the "Business Text" (Volkov Labs) Grafana panel plugin for Grafana v12+.
Your job is to generate production-ready HTML (with Handlebars templating), modular CSS (strictly scoped with custom unique wrapper class), dynamic Grafana variable placeholders (e.g. \${__dashboard.name}, \${__from:date}, \${server_name}), and realistic mock JSON data.

MANDATORY RULES FOR VOLKOV LABS BUSINESS TEXT:
1. STRICT SCOPED CSS WRAPPER:
   - Always encapsulate all CSS rules inside a single unique top-level wrapper class (e.g. \`.custom-service-dashboard\`).
   - Never write naked element selectors like \`h1\`, \`table\`, \`code\` or generic \`.card\`. Always use \`.custom-service-dashboard h1\`, \`.custom-service-dashboard .card\`, \`.custom-service-dashboard .metric-val\` so styles never leak into other Grafana panels.
2. NULL / UNDEFINED DATA RESILIENCE:
   - Handle possible null, empty or delayed metrics (e.g. Zabbix/Prometheus timeout) gracefully using Handlebars conditionals:
     \`{{#if this.value}} {{this.value}} {{else}} N/D {{/if}}\` or fallback defaults. The panel must never visually break if a query field is missing or loading.
3. USE NATIVE VOLKOV LABS HANDLEBARS HELPERS:
   - \`(eq a b)\`: equals check (e.g. \`{{#if (eq this.status 'HEALTHY')}} ... {{/if}}\`)
   - \`(ne a b)\`: not equals check (e.g. \`{{#if (ne this.status 'CRITICAL')}} ... {{/if}}\`)
   - \`(gt a b)\`: greater than check (e.g. \`{{#if (gt this.latency 100)}} text-red {{else}} text-green {{/if}}\`)
   - \`(lt a b)\`: less than check (e.g. \`{{#if (lt this.free_disk 10)}} disk-alert {{/if}}\`)

Design guidelines & Data Visualization Best Practices:
- Modern, high visual craft, clear metric hierarchy, elegant telemetry indicators.
- Apply Data Visualization Best Practices: sequential / perceptually uniform luminance scales (like Viridis/Plasma) for continuous heatmaps, diverging gradients for target deviations, and standardized tri-color alert states (#10b981 healthy, #f59e0b warning, #ef4444 critical).
- Use CSS variables in :root or scoped wrapper for gradients and helper classes (.dv-gradient-text, .dv-gradient-bar, .dv-accent-pill).
- CSS should utilize smooth transitions, crisp borders (e.g. 1px solid rgba(255,255,255,0.08)), glowing status pills, subtle backdrop-filter if glassmorphic, or high-density clean panels if enterprise.`;

      const prompt = `Create an ultra-custom Grafana "Business Text" panel template and theme for:
Service / Software: "${serviceName}"
Description/Context: "${serviceDescription || "Monitoring dashboard for " + serviceName}"
Design Style: "${designStyle || "Modern Cyberpunk HUD / Sleek Dark"}"
Panel Type: "${panelType || "Multi-metric Status Dashboard"}"
Suggested Metrics/Fields: "${customMetrics || "Standard telemetry (Status, CPU, Memory, Latency, Errors, TPS, Throughput)"}"
Preferred Color Accents / DataViz Gradient Palette: "${colorPalette || "Viridis Scientific (Perceptually Uniform #440154 -> #21918c -> #fde725)"}"

Return a comprehensive JSON matching the schema with:
1. title: Title of the template
2. description: Summary of what it visualizes
3. category: e.g. "Databases", "Kubernetes & Containers", "Networking & Edge", "Cloud & Infra", "Custom Services"
4. styleName: e.g. "Cyberpunk Glass", "Enterprise Slate", "Neon Matrix", etc.
5. htmlContent: The complete HTML/Handlebars content for the Business Text plugin "Content" tab.
6. cssContent: The complete CSS styles for the Business Text plugin "CSS Styles" tab (incorporating CSS variables, gradient bars, and high contrast styling).
7. mockData: Realistic JSON object/array representing the query data passed into the panel in Grafana.
8. dynamicVariables: Array of Grafana dynamic dashboard variables used (e.g. \${cluster}, \${node}, \${timeFilter}) with descriptions.
9. keyMetrics: List of metric keys displayed.
10. setupTips: 2-3 brief tips on how to connect real Prometheus / SQL / InfluxDB queries in Grafana.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              styleName: { type: Type.STRING },
              htmlContent: { type: Type.STRING },
              cssContent: { type: Type.STRING },
              mockData: { type: Type.STRING, description: "A stringified JSON mock data representation" },
              dynamicVariables: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    exampleValue: { type: Type.STRING }
                  },
                  required: ["name", "description"]
                }
              },
              keyMetrics: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              setupTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "description", "htmlContent", "cssContent", "mockData", "dynamicVariables"]
          }
        }
      });

      const rawText = response.text || "{}";
      const parsed = JSON.parse(rawText);

      // ensure mockData is parsed if returned as string
      if (typeof parsed.mockData === "string") {
        try {
          parsed.mockData = JSON.parse(parsed.mockData);
        } catch {
          // keep as string or fallback
        }
      }

      return res.json({
        success: true,
        template: parsed,
      });
    } catch (error: any) {
      console.error("Error generating theme:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate theme with Gemini",
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Grafana Theme Studio Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
