import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { createContext, PropsWithChildren, use, useEffect } from "react";

type Theme = PropsWithChildren;

type ThemeContext = {
  toggleTheme: () => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContext | null>(null);

function ThemeContextProvider({ children }: Theme) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "the_wild_oasis_dark_theme",
    false
  );
  useEffect(() => {
    document.documentElement.className = isDarkMode
      ? "dark-mode"
      : "light-mode";
  }, [isDarkMode]);
  function toggleTheme() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <ThemeContext value={{ isDarkMode, setIsDarkMode, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useThemeContext() {
  const context = use(ThemeContext);
  if (context === null)
    throw new Error("This hook must be in ThemeContext bound.");
  return context;
}
export default ThemeContextProvider;
