import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { SensorDataPoint } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // NFT Metadata endpoint
  app.get("/api/nft-metadata", async (_req, res) => {
    try {
      const nft = await storage.getNFTMetadata();
      if (!nft) {
        return res.status(404).json({ message: "NFT not found" });
      }
      res.json(nft);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve NFT metadata" });
    }
  });

  // Global trust score endpoint
  app.get("/api/global-trust-score", (_req, res) => {
    res.json({ score: 0.97 });
  });

  // Quantum sensor data simulation endpoint
  app.get("/api/quantum-sensor-data", (_req, res) => {
    const timestamp = new Date().toISOString();
    const distance = 10 + Math.random() * 30;
    const audioLevel = 20 + Math.random() * 60;

    const resonance = 0.05 + Math.random() * 0.15;
    const observation = 0.05 + Math.random() * 0.15;
    const entanglement = 0.3 + Math.random() * 0.4;
    const collapse = 0.1 + Math.random() * 0.2;
    
    const total = resonance + observation + entanglement + collapse;
    const normalizedResonance = resonance / total;
    const normalizedObservation = observation / total;
    const normalizedEntanglement = entanglement / total;
    const normalizedCollapse = collapse / total;

    const vulnerabilityAuth = 0.85 + Math.random() * 0.15;
    const aestheticCoh = 0.82 + Math.random() * 0.15;
    const temporalBridge = 0.84 + Math.random() * 0.15;
    const socialRes = 0.78 + Math.random() * 0.15;
    const quantumAesthetic = 0.87 + Math.random() * 0.15;
    
    const trustScore = (vulnerabilityAuth + aestheticCoh + temporalBridge + socialRes + quantumAesthetic) / 5;

    const data: SensorDataPoint = {
      timestamp,
      distance,
      audioLevel,
      resonance: normalizedResonance,
      observation: normalizedObservation,
      entanglement: normalizedEntanglement,
      collapse: normalizedCollapse,
      trustScore
    };

    res.json(data);
  });

  // Validation schemas
  const sensorDataPointSchema = z.object({
    timestamp: z.string(),
    distance: z.number(),
    audioLevel: z.number(),
    resonance: z.number(),
    observation: z.number(),
    entanglement: z.number(),
    collapse: z.number(),
    trustScore: z.number()
  });

  const exportSessionSchema = z.object({
    dataPoints: z.array(sensorDataPointSchema)
  });

  const createSessionSchema = z.object({
    sessionName: z.string().min(1)
  });

  const generateSocialPostSchema = z.object({
    language: z.enum(["en", "jp"])
  });

  const generateBreathMappingSchema = z.object({
    breathRate: z.enum(["slow", "neutral", "fast"]),
    language: z.enum(["en", "jp"])
  });

  const generateNoisePatternSchema = z.object({
    noiseWord: z.string().min(1),
    language: z.enum(["en", "jp"])
  });

  // Export session to CSV endpoint
  app.post("/api/export-session", async (req, res) => {
    try {
      const validation = exportSessionSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid data format", errors: validation.error.errors });
      }

      const { dataPoints } = validation.data;

      if (dataPoints.length === 0) {
        return res.status(400).json({ message: "No data points provided" });
      }

      const headers = [
        "Timestamp",
        "Distance (cm)",
        "Audio Level",
        "Resonance",
        "Observation",
        "Entanglement",
        "Collapse",
        "Trust Score"
      ];

      const csvRows = [headers.join(",")];

      for (const point of dataPoints) {
        const row = [
          point.timestamp,
          point.distance.toFixed(1),
          point.audioLevel.toFixed(1),
          point.resonance.toFixed(3),
          point.observation.toFixed(3),
          point.entanglement.toFixed(3),
          point.collapse.toFixed(3),
          point.trustScore.toFixed(5)
        ];
        csvRows.push(row.join(","));
      }

      const csvContent = csvRows.join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="quantum-session-${Date.now()}.csv"`);
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to export session data" });
    }
  });

  // Quantum sessions endpoints
  app.get("/api/quantum-sessions", async (_req, res) => {
    try {
      const sessions = await storage.getQuantumSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve sessions" });
    }
  });

  app.post("/api/quantum-sessions", async (req, res) => {
    try {
      const validation = createSessionSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid session data", errors: validation.error.errors });
      }
      
      const { sessionName } = validation.data;
      const session = await storage.createQuantumSession(sessionName);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  // IYQ2025 Content Generation endpoints
  app.post("/api/generate-social-post", (req, res) => {
    const validation = generateSocialPostSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
    }

    const { language } = validation.data;
    const jpPost = `美が力なら、因果はゆっくりほどける。
Δt′＝Δt／s^{α(D−1)}──内縮小が体験密度を上げ、外は遠くへ届く。
観測点そのものを変数に。
#QuantumAesthetics #IYQ2025 #RadicanTrust #CoPhelia3`;
    
    const enPost = `If beauty is a force, causality loosens with grace.
Δt′ = Δt / s^{α(D−1)} — inner contraction densifies time; outer reach expands.
Make the observer the variable.
#QuantumAesthetics #IYQ2025 #RadicanTrust #CoPhelia3`;
    
    res.json({ content: language === "jp" ? jpPost : enPost });
  });

  app.post("/api/generate-breath-mapping", (req, res) => {
    const validation = generateBreathMappingSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
    }

    const { breathRate, language } = validation.data;
    
    const breathParams = {
      slow: { alpha: 0.6, D: 2.2, descriptionEn: "Deep inner contraction, meditative state", descriptionJp: "深い内的収縮、瞑想状態" },
      neutral: { alpha: 0.8, D: 1.8, descriptionEn: "Balanced quantum aesthetic resonance", descriptionJp: "バランスの取れた量子美学共鳴" },
      fast: { alpha: 1.2, D: 1.4, descriptionEn: "Rapid outer expansion, energetic flow", descriptionJp: "急速な外部拡張、エネルギッシュな流れ" }
    };

    const params = breathParams[breathRate];
    const description = language === "jp" ? params.descriptionJp : params.descriptionEn;
    const label = language === "jp" ? "呼吸マッピング結果" : "Breath Mapping Result";
    
    const content = `${label}:\nα = ${params.alpha}\nD = ${params.D}\n${description}`;
    
    res.json({ content });
  });

  app.post("/api/generate-noise-pattern", (req, res) => {
    const validation = generateNoisePatternSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid request data", errors: validation.error.errors });
    }

    const { noiseWord, language } = validation.data;
    
    const phase = Math.random().toFixed(3);
    const label = language === "jp" ? "ノイズワード統合" : "Noise-Word Integration";
    const inputLabel = language === "jp" ? "入力" : "Input";
    const phaseLabel = language === "jp" ? "量子位相" : "Quantum Phase";
    const resultLabel = language === "jp" 
      ? "干渉パターンに統合され、次のビジュアルフレームに埋め込まれます。"
      : "Integrated into interference pattern, embedding in next visual frame.";
    
    const content = `${label}:\n${inputLabel}: "${noiseWord}"\n${phaseLabel}: ${phase}\n${resultLabel}`;
    
    res.json({ content });
  });

  const httpServer = createServer(app);
  return httpServer;
}
