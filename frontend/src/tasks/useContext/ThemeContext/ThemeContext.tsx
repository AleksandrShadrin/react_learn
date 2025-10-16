import { createContext, useContext } from "react";

export type Theme = 'dark' | 'light';

export type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
});

export function useTheme(): ThemeContextType {
    return useContext(ThemeContext);
}
