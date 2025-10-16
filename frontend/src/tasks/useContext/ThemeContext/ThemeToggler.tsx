import { useContext, type ReactElement } from "react";
import { ThemeContext } from "./ThemeContext";
import { Toggle } from "../../useState/toggle/Toggle";

export default function ThemeToggler(): ReactElement {
    const themeContext = useContext(ThemeContext);

    return <Toggle enabled={true} onChange={themeContext.toggleTheme} />
}