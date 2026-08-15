# Replit → Vercel migration record

## Decision

On 2026-08-15 (JST), the active runtime was changed from Replit to Vercel.
GitHub is the source and provenance layer; Vercel Preview is the verification
surface before a Production promotion.

## What moved

- The React + Vite client remains unchanged as a static Vercel deployment.
- The public REST URLs used by the client now run through `api/[...path].ts`,
  a Vercel Node.js Function rather than the former long-lived Express process.
- Replit-only Vite plugins and the Express production-build command are no
  longer part of the active runtime path.
- The former Replit public deployment was observed as `suspended`; it is kept
  intact as a historical recovery point and is not deleted by this migration.

## Preserved API contract

The following existing endpoints remain same-origin paths:

- `GET /api/nft-metadata`
- `GET /api/global-trust-score`
- `GET /api/quantum-sensor-data`
- `GET|POST /api/quantum-sessions`
- `POST /api/export-session`
- `POST /api/generate-social-post`
- `POST /api/generate-breath-mapping`
- `POST /api/generate-noise-pattern`

`GET /api/health` is added solely as a deployment verification endpoint.

## Persistence boundary

The original committed application used in-memory `MemStorage`. The Vercel
function preserves that experimental behavior only for a warm instance; it is
not durable across invocations or deployments. No database or paid integration
was provisioned implicitly. A durable session feature requires a separately
reviewed storage decision and explicit environment configuration.

## MCP boundary

The GitHub commit used for this migration does not contain the later Replit-only
MCP implementation. It is therefore not represented as migrated or publicly
available here. The verification record in
`nijinomichi/BananaMoon-QuantumTrust-Review` remains evidence of a separate,
unpublished Replit runtime and must not be treated as evidence of this Vercel
deployment.

## Verification sequence

1. Type-check and build the GitHub branch.
2. Create a Vercel Preview deployment from the branch.
3. Verify the root UI and every listed API route against that preview.
4. Verify headers and the absence of Replit development markers.
5. Promote the exact verified Preview only after human review.
