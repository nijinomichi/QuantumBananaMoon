import { z } from "zod";
import metadataRecord from "../../provenance/bananaMoon-metadata-johnson.json";

type SensorDataPoint = {
  timestamp: string;
  distance: number;
  audioLevel: number;
  resonance: number;
  observation: number;
  entanglement: number;
  collapse: number;
  trustScore: number;
};

type QuantumSession = {
  id: string;
  sessionName: string;
  startTime: string;
  endTime: string | null;
  dataPoints: SensorDataPoint[];
  averageTrustScore: number;
  status: "active" | "completed";
};

export type ApiResult = {
  status: number;
  headers: Record<string, string>;
  body: string;
};

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const sensorDataPointSchema = z
  .object({
    timestamp: z.string().max(128),
    distance: z.number().finite(),
    audioLevel: z.number().finite(),
    resonance: z.number().finite(),
    observation: z.number().finite(),
    entanglement: z.number().finite(),
    collapse: z.number().finite(),
    trustScore: z.number().finite(),
  })
  .strict();

const exportSessionSchema = z
  .object({
    dataPoints: z.array(sensorDataPointSchema).min(1).max(1_000),
  })
  .strict();

const createSessionSchema = z
  .object({
    sessionName: z.string().trim().min(1).max(80),
  })
  .strict();

const languageSchema = z.object({ language: z.enum(["en", "jp"]) }).strict();

const breathMappingSchema = z
  .object({
    breathRate: z.enum(["slow", "neutral", "fast"]),
    language: z.enum(["en", "jp"]),
  })
  .strict();

const noisePatternSchema = z
  .object({
    noiseWord: z.string().trim().min(1).max(280),
    language: z.enum(["en", "jp"]),
  })
  .strict();

// The original runtime used process memory. Retaining this small map makes the
// endpoint behaviorally compatible for a warm function, but it is deliberately
// not presented as durable storage on Vercel.
const quantumSessions = new Map<string, QuantumSession>();

function json(status: number, payload: unknown): ApiResult {
  return { status, headers: jsonHeaders, body: JSON.stringify(payload) };
}

function methodNotAllowed(allowed: string): ApiResult {
  return {
    status: 405,
    headers: { ...jsonHeaders, Allow: allowed },
    body: JSON.stringify({ message: "Method not allowed" }),
  };
}

function invalidBody(error: z.ZodError): ApiResult {
  return json(400, {
    message: "Invalid request data",
    errors: error.issues.map(({ path, message }) => ({ path, message })),
  });
}

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body ?? {};

  try {
    return JSON.parse(body);
  } catch {
    return undefined;
  }
}

function createSensorDataPoint(): SensorDataPoint {
  const timestamp = new Date().toISOString();
  const distance = 10 + Math.random() * 30;
  const audioLevel = 20 + Math.random() * 60;
  const resonance = 0.05 + Math.random() * 0.15;
  const observation = 0.05 + Math.random() * 0.15;
  const entanglement = 0.3 + Math.random() * 0.4;
  const collapse = 0.1 + Math.random() * 0.2;
  const total = resonance + observation + entanglement + collapse;

  const vulnerabilityAuthenticity = 0.85 + Math.random() * 0.15;
  const aestheticCoherence = 0.82 + Math.random() * 0.15;
  const temporalBridge = 0.84 + Math.random() * 0.15;
  const socialResonance = 0.78 + Math.random() * 0.15;
  const quantumAesthetic = 0.87 + Math.random() * 0.15;

  return {
    timestamp,
    distance,
    audioLevel,
    resonance: resonance / total,
    observation: observation / total,
    entanglement: entanglement / total,
    collapse: collapse / total,
    trustScore:
      (vulnerabilityAuthenticity +
        aestheticCoherence +
        temporalBridge +
        socialResonance +
        quantumAesthetic) /
      5,
  };
}

function getNftMetadata() {
  return {
    id: "bananamoon-quantum-nft-001",
    name: metadataRecord.name,
    description: metadataRecord.description,
    image: metadataRecord.image,
    externalUrl: metadataRecord.external_url,
    attributes: metadataRecord.attributes,
    quantumParameters: metadataRecord.quantum_parameters,
    visualDesign: metadataRecord.visual_design,
    ethics: metadataRecord.ethics,
    creators: metadataRecord.creators,
    quantumSignature: metadataRecord.quantum_signature,
    artisticStatement: metadataRecord.artistic_statement,
  };
}

function csvCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function sessionCsv(dataPoints: SensorDataPoint[]): string {
  const headers = [
    "Timestamp",
    "Distance (cm)",
    "Audio Level",
    "Resonance",
    "Observation",
    "Entanglement",
    "Collapse",
    "Trust Score",
  ];
  const rows = dataPoints.map((point) => [
    point.timestamp,
    point.distance.toFixed(1),
    point.audioLevel.toFixed(1),
    point.resonance.toFixed(3),
    point.observation.toFixed(3),
    point.entanglement.toFixed(3),
    point.collapse.toFixed(3),
    point.trustScore.toFixed(5),
  ]);

  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
}

function socialPost(language: "en" | "jp") {
  if (language === "jp") {
    return `美が力なら、因果はゆっくりほどける。\nΔt′＝Δt／s^{α(D−1)}──内縮小が体験密度を上げ、外は遠くへ届く。\n観測点そのものを変数に。\n#QuantumAesthetics #IYQ2025 #RadicanTrust #CoPhelia3`;
  }

  return `If beauty is a force, causality loosens with grace.\nΔt′ = Δt / s^{α(D−1)} — inner contraction densifies time; outer reach expands.\nMake the observer the variable.\n#QuantumAesthetics #IYQ2025 #RadicanTrust #CoPhelia3`;
}

function breathMapping(breathRate: "slow" | "neutral" | "fast", language: "en" | "jp") {
  const params = {
    slow: {
      alpha: 0.6,
      dimension: 2.2,
      en: "Deep inner contraction, meditative state",
      jp: "深い内的収縮、瞑想状態",
    },
    neutral: {
      alpha: 0.8,
      dimension: 1.8,
      en: "Balanced quantum aesthetic resonance",
      jp: "バランスの取れた量子美学共鳴",
    },
    fast: {
      alpha: 1.2,
      dimension: 1.4,
      en: "Rapid outer expansion, energetic flow",
      jp: "急速な外部拡張、エネルギッシュな流れ",
    },
  }[breathRate];

  const label = language === "jp" ? "呼吸マッピング結果" : "Breath Mapping Result";
  return `${label}:\nα = ${params.alpha}\nD = ${params.dimension}\n${params[language]}`;
}

export async function handleApiRequest({
  method,
  pathname,
  body,
}: {
  method: string;
  pathname: string;
  body: unknown;
}): Promise<ApiResult> {
  if (pathname === "/api/health") {
    return method === "GET"
      ? json(200, { status: "ok", runtime: "vercel", storage: "ephemeral-demo" })
      : methodNotAllowed("GET");
  }

  if (pathname === "/api/nft-metadata") {
    return method === "GET" ? json(200, getNftMetadata()) : methodNotAllowed("GET");
  }

  if (pathname === "/api/global-trust-score") {
    return method === "GET" ? json(200, { score: 0.97 }) : methodNotAllowed("GET");
  }

  if (pathname === "/api/quantum-sensor-data") {
    return method === "GET" ? json(200, createSensorDataPoint()) : methodNotAllowed("GET");
  }

  if (pathname === "/api/quantum-sessions") {
    if (method === "GET") return json(200, Array.from(quantumSessions.values()));
    if (method !== "POST") return methodNotAllowed("GET, POST");

    const parsed = createSessionSchema.safeParse(parseBody(body));
    if (!parsed.success) return invalidBody(parsed.error);

    const id = crypto.randomUUID();
    const session: QuantumSession = {
      id,
      sessionName: parsed.data.sessionName,
      startTime: new Date().toISOString(),
      endTime: null,
      dataPoints: [],
      averageTrustScore: 0,
      status: "active",
    };
    quantumSessions.set(id, session);
    return json(201, session);
  }

  if (pathname === "/api/export-session") {
    if (method !== "POST") return methodNotAllowed("POST");

    const parsed = exportSessionSchema.safeParse(parseBody(body));
    if (!parsed.success) return invalidBody(parsed.error);

    return {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="quantum-session-${Date.now()}.csv"`,
        "Cache-Control": "no-store",
      },
      body: sessionCsv(parsed.data.dataPoints),
    };
  }

  if (pathname === "/api/generate-social-post") {
    if (method !== "POST") return methodNotAllowed("POST");
    const parsed = languageSchema.safeParse(parseBody(body));
    if (!parsed.success) return invalidBody(parsed.error);
    return json(200, { content: socialPost(parsed.data.language) });
  }

  if (pathname === "/api/generate-breath-mapping") {
    if (method !== "POST") return methodNotAllowed("POST");
    const parsed = breathMappingSchema.safeParse(parseBody(body));
    if (!parsed.success) return invalidBody(parsed.error);
    return json(200, {
      content: breathMapping(parsed.data.breathRate, parsed.data.language),
    });
  }

  if (pathname === "/api/generate-noise-pattern") {
    if (method !== "POST") return methodNotAllowed("POST");
    const parsed = noisePatternSchema.safeParse(parseBody(body));
    if (!parsed.success) return invalidBody(parsed.error);

    const phase = Math.random().toFixed(3);
    const { language, noiseWord } = parsed.data;
    const label = language === "jp" ? "ノイズワード統合" : "Noise-Word Integration";
    const inputLabel = language === "jp" ? "入力" : "Input";
    const phaseLabel = language === "jp" ? "量子位相" : "Quantum Phase";
    const resultLabel =
      language === "jp"
        ? "干渉パターンに統合され、次のビジュアルフレームに埋め込まれます。"
        : "Integrated into interference pattern, embedding in next visual frame.";

    return json(200, {
      content: `${label}:\n${inputLabel}: "${noiseWord}"\n${phaseLabel}: ${phase}\n${resultLabel}`,
    });
  }

  return json(404, { message: "Not found" });
}
