import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// NFT Metadata Schema
export const nftMetadata = pgTable("nft_metadata", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  externalUrl: text("external_url"),
  attributes: jsonb("attributes").notNull(),
  quantumParameters: jsonb("quantum_parameters").notNull(),
  visualDesign: jsonb("visual_design").notNull(),
  ethics: jsonb("ethics").notNull(),
  creators: jsonb("creators").notNull(),
  quantumSignature: text("quantum_signature").notNull(),
  artisticStatement: jsonb("artistic_statement").notNull(),
});

// Quantum Empathy Session Schema
export const quantumSessions = pgTable("quantum_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionName: text("session_name").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  dataPoints: jsonb("data_points").notNull(),
  averageTrustScore: real("average_trust_score").notNull(),
  status: text("status").notNull(), // 'active' | 'completed'
});

// Sensor Data Point Schema (for real-time data)
export interface SensorDataPoint {
  timestamp: string;
  distance: number;
  audioLevel: number;
  resonance: number;
  observation: number;
  entanglement: number;
  collapse: number;
  trustScore: number;
}

// RadicanTrust Metrics
export interface RadicanTrustMetrics {
  vulnerabilityAuthenticity: number;
  aestheticCoherence: number;
  temporalBridgeIntegrity: number;
  socialResonancePotential: number;
  quantumAestheticEmergence: number;
  compositeScore: number;
}

// IYQ2025 Content Template
export interface ContentTemplate {
  language: 'jp' | 'en';
  type: 'social_post' | 'breath_mapping' | 'noise_word';
  content: string;
  hashtags: string[];
}

// Business Integration Data
export interface BusinessIntegration {
  contactName: string;
  organization: string;
  role: string;
  encounterDate: string;
  resonanceScore: number;
  integrationPathways: string[];
}

// Insert schemas
export const insertNFTMetadataSchema = createInsertSchema(nftMetadata).omit({ id: true });
export const insertQuantumSessionSchema = createInsertSchema(quantumSessions).omit({ id: true });

// Types
export type NFTMetadata = typeof nftMetadata.$inferSelect;
export type InsertNFTMetadata = z.infer<typeof insertNFTMetadataSchema>;
export type QuantumSession = typeof quantumSessions.$inferSelect;
export type InsertQuantumSession = z.infer<typeof insertQuantumSessionSchema>;
