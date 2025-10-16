import { createContext, useContext } from "react";

export type FontSizeContextType = {
	fontSize: string;
	setFontSize: (fontSize: string) => void;
};

export const FontSizeContext = createContext<FontSizeContextType>({
	fontSize: "14px",
	setFontSize: () => {},
});

export function useFontSizeContext() {
	return useContext(FontSizeContext);
}
