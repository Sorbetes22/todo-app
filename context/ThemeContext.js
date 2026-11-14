import { createContext, useState } from "react";
import { Appearance } from "react-native";

import { Colors } from "../constants/colors";

export const ThemeContext = createContext({
  colorScheme: "light",
  setColorScheme: (scheme) => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }) => {
  // Empieza con el tema del sistema (claro u oscuro)
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
