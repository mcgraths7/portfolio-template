"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full
        bg-gray-200 dark:bg-gray-600
        transition-colors duration-300 ease-in-out
        flex items-center justify-between px-1
      `}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="text-xl">🌚</span>
      <span className="text-xl">🌞</span>
      <div
        className={`
          absolute w-7 h-7 rounded-full bg-white
          transition-all duration-300 ease-in-out
          ${theme === "dark" ? "translate-x-8" : "translate-x-0"}
          shadow-md
        `}
      />
    </button>
  );
}
