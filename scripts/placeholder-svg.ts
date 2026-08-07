import type { AssetSpec } from "../templates/types.ts";

/**
 * Deterministic placeholder images: a gradient and a label, as SVG.
 *
 * Deterministic is the point — identical input produces identical bytes, and
 * Sanity deduplicates uploads by content hash, so re-seeding never accretes
 * asset copies. No network fetch, no binary fixtures in the repo, and the
 * hue pair lets each persona's placeholders sit inside its Sorbet preset's
 * palette instead of fighting it.
 */
export function placeholderSvg({ label, hues, width, height }: AssetSpec): Buffer {
  const [h1, h2] = hues;
  const fontSize = Math.max(16, Math.round(Math.min(width, height) / 12));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="oklch(0.72 0.12 ${h1})"/>
      <stop offset="1" stop-color="oklch(0.45 0.14 ${h2})"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600"
    fill="white" fill-opacity="0.92">${escapeXml(label)}</text>
</svg>
`;
  return Buffer.from(svg, "utf8");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
