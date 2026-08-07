"use client";

import { useTheme, type ThemeMode } from "@sorbet/component-library/core";
import { Segment, SegmentedControl } from "@sorbet/component-library/molecules";

const MODES: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/**
 * Three modes rather than a light/dark toggle, because "follow the OS" is a
 * real choice and a toggle cannot express it. Sorbet stores it by clearing the
 * key, which is what lets the stylesheet's prefers-color-scheme query take over.
 */
export function ThemeControl() {
  const { mode, set } = useTheme();

  return (
    <SegmentedControl
      value={mode}
      onValueChange={(next) => set(next as ThemeMode)}
      aria-label="Colour theme"
    >
      {MODES.map(({ value, label }) => (
        <Segment key={value} value={value}>
          {label}
        </Segment>
      ))}
    </SegmentedControl>
  );
}
