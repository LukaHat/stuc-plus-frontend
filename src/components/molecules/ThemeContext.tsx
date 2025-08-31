import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContextDef";
import { setCookie, getCookie } from "../../utils/cookies";

export { ThemeContext };

const THEME_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (
        (getCookie(THEME_KEY) as "light" | "dark") ||
        (localStorage.getItem(THEME_KEY) as "light" | "dark") ||
        "light"
      );
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
    setCookie(THEME_KEY, theme, 365);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
