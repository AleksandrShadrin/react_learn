import { useState, type PropsWithChildren, type ReactElement } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

type Props = PropsWithChildren & {
    theme?: Theme;
};

export default function ThemeContextProvider({ children }: Props): ReactElement {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}