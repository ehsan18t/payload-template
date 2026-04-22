"use client";

import type { ReactNode } from "react";
import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "dark"
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
