import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark-theme" });

const useThemeContext = () => useContext(ThemeContext);

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    /* Default theme is taken as dark theme */
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { useThemeContext, ThemeProvider };
