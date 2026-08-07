import { Studio } from "./studio";

/**
 * The optional catch-all is required: the Studio does its own routing, so every
 * path under /studio has to resolve here rather than 404.
 *
 * This stays a Server Component so the route config below is allowed — the
 * Studio itself is a client island. It is an authenticated browser app rather
 * than content, so it is rendered dynamically and never prerendered.
 */
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <Studio />;
}
