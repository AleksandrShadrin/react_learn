import { type ReactElement } from "react";
import { useFontSizeContext } from "./FontSizeContext";

export type FontSize = 'sm' | 'md' | 'lg';

const fontSizeMap: Record<FontSize, string> = {
    sm: '14px',
    md: '22px',
    lg: '36px'
};

export default function FontSizeSwitcher(): ReactElement {
    const fontSizeContext = useFontSizeContext();

    return <select name="fontSize" onChange={(e) => {
        const value = e.target.value;
        if (value in fontSizeMap) {
            fontSizeContext.setFontSize(fontSizeMap[value as FontSize]);
        }
    }}>
        <option onSelect={() => fontSizeContext.setFontSize('14px')}>sm</option>
        <option onSelect={() => fontSizeContext.setFontSize('22px')}>md</option>
        <option onSelect={() => fontSizeContext.setFontSize('36px')}>lg</option>
    </select>
}