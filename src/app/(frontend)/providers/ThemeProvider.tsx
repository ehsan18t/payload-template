"use client";

import { useEffect, useState } from "react";
import { type Theme, ThemeProviderContext, type ThemeProviderProps } from "./theme-context";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (themeValue: Theme) => {
      root.classList.remove("light", "dark");

      if (themeValue === "system" && enableSystem) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        root.classList.add(systemTheme);
        setResolvedTheme(systemTheme);
        return;
      }

      root.classList.add(themeValue);
      setResolvedTheme(themeValue as "dark" | "light");
    };

    applyTheme(theme);
  }, [theme, enableSystem]);

  useEffect(() => {
    if (theme !== "system" || !enableSystem) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
