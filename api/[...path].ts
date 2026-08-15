import type { IncomingMessage, ServerResponse } from "node:http";
import { handleApiRequest } from "./lib/quantum-api";

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

/**
 * Vercel's catch-all Node.js Function. It deliberately replaces the former
 * long-lived Express server while preserving the public REST URLs used by the
 * Vite client.
 */
export default async function handler(
  request: VercelRequest,
  response: ServerResponse,
) {
  const origin = `https://${request.headers.host ?? "localhost"}`;
  const url = new URL(request.url ?? "/", origin);

  const result = await handleApiRequest({
    method: request.method ?? "GET",
    pathname: url.pathname,
    body: request.body,
  });

  response.statusCode = result.status;
  for (const [name, value] of Object.entries(result.headers)) {
    response.setHeader(name, value);
  }
  response.end(result.body);
}
