/**
 * Applies the saved theme before the browser paints.
 *
 * Sorbet's ThemeProvider reads localStorage, but only once React has hydrated,
 * and its effect runs after the first paint. The server cannot know the value,
 * so without this the page paints with the OS preference and then snaps to the
 * saved one — visible on every load where a user's explicit choice differs from
 * their system setting. This runs synchronously during HTML parsing, before
 * React is involved at all, so there is nothing to see.
 *
 * An inline script is usually a smell; this is the case where it is the only
 * thing that works. `useLayoutEffect` still runs after hydration, which on a
 * slow connection is long after the browser has painted the server HTML.
 *
 * Two details specific to Sorbet:
 *
 *  - Only "light" and "dark" are ever written to storage. "system" is stored by
 *    *removing* the key, and the absence of `data-theme` is what lets the
 *    stylesheet's `prefers-color-scheme` query take over. So the attribute is
 *    set only for an explicit choice.
 *  - For the same reason, `<html>` must NOT carry a default `data-theme`. The
 *    dark rule is `:root:not([data-theme="light"])` inside the media query, so
 *    a hardcoded `data-theme="light"` would pin every visitor to light and
 *    break system mode entirely.
 */

// Mirrors ThemeProvider's default storageKey.
const STORAGE_KEY = "sb-theme";

const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export function ThemeScript() {
  return (
    // React warns in development whenever a component renders a <script>,
    // because scripts inserted by a client render never execute. Only the
    // server-rendered copy is ever meant to run — it does its work during HTML
    // parsing — so hand the client an inert type and let the DOM keep the
    // server's. suppressHydrationWarning covers the deliberate type mismatch.
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
