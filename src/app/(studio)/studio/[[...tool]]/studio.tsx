"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../../sanity.config";

/**
 * The Studio, isolated in a client component on purpose.
 *
 * Importing sanity.config.ts from a Server Component pulls the whole of
 * `sanity` into the server graph, where dependencies resolve under the
 * `react-server` export condition. swr ships a stripped build for that
 * condition with no default export, so `import useSWR from "swr"` inside
 * `sanity` fails the build — confusingly, since nothing here is server-rendered
 * anyway. The Studio is an authenticated browser app; this is where it belongs.
 */
export function Studio() {
  return <NextStudio config={config} />;
}
