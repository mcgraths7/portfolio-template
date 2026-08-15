import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Serves the five Sorbet preset stylesheets from the installed design-system
 * package, so the LAYOUT can pick a theme from CMS data (`siteSettings.preset`)
 * with a plain <link> — a CSS `import` is compile-time and can only ever name
 * one preset, and loading several would clobber: every theme file targets
 * `:root`, last one wins.
 *
 * Static at build: five routes, each the package's CSS byte-for-byte.
 */

const PRESETS = ["sorbet", "ocean", "forest", "noir", "midnight"] as const;
type Preset = (typeof PRESETS)[number];

export const dynamic = "force-static";

export function generateStaticParams() {
  // The URL keeps its .css extension, so the segment param carries it too.
  return PRESETS.map((preset) => ({ preset: `${preset}.css` }));
}

export async function GET(_req: Request, ctx: RouteContext<"/themes/[preset]">) {
  const { preset: segment } = await ctx.params;
  const preset = segment.replace(/\.css$/, "");
  if (!segment.endsWith(".css") || !PRESETS.includes(preset as Preset)) {
    return new Response("unknown preset", { status: 404 });
  }
  // Not require.resolve: the bundler rewrites module resolution inside route
  // handlers and returns undefined at build. This route is force-static, so
  // the read happens exactly once, at build time, from the project root —
  // where node_modules verifiably exists (pnpm symlinks dereference on read).
  const path = join(process.cwd(), "node_modules", "@sorbet", "design-system", "dist", "themes", `${preset}.css`);
  return new Response(await readFile(path, "utf8"), {
    headers: { "content-type": "text/css; charset=utf-8" },
  });
}
