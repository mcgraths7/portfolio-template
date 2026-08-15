import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

import type { NextRequest } from "next/server";

/**
 * Sanity → on-demand revalidation. Publish in the Studio, the webhook fires,
 * the static pages rebuild — no redeploy.
 *
 * parseBody verifies the signature Sanity computes over the payload with the
 * shared secret, so a caller without SANITY_REVALIDATE_SECRET cannot trigger
 * work. Everything revalidates on any change ("/" as layout): this is a
 * portfolio, not a news site — a handful of pages, where reference chains
 * (project → grid → page) make per-document precision more machinery than the
 * savings justify. Webhook configuration lands with the deploy (item 19).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "SANITY_REVALIDATE_SECRET unset" }, { status: 503 });
  }

  const { body, isValidSignature } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
}
