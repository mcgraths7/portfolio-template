import { timingSafeEqual } from "node:crypto";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next draft mode: /api/draft?secret=…&slug=home
 *
 * The secret gates the door — anyone holding the link sees unpublished
 * content, which is exactly what an editor wants and nobody else should have.
 * Constant-time comparison because this is the one string equality in the app
 * where a timing oracle would matter.
 */
export async function GET(req: Request) {
  const expected = process.env.SANITY_PREVIEW_SECRET;
  if (!expected) {
    return new Response("preview is not configured (SANITY_PREVIEW_SECRET unset)", { status: 503 });
  }

  const url = new URL(req.url);
  const given = url.searchParams.get("secret") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  const slug = url.searchParams.get("slug") ?? "home";
  redirect(slug === "home" ? "/" : `/${slug}`);
}
