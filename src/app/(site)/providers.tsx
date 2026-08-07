"use client";

import { ThemeProvider } from "@sorbet/component-library/core";
import { ToastProvider } from "@sorbet/component-library/molecules";

import type { ReactNode } from "react";

/**
 * The app's single client boundary.
 *
 * Both of these are React contexts, so they cannot live in a Server Component.
 * Taking `children` as a prop is what keeps that from being contagious: the
 * root layout renders the page tree on the server and passes it in already
 * rendered, so everything underneath stays a Server Component. Importing the
 * providers *into* a page, rather than wrapping around it, would pull the whole
 * tree across the boundary.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
