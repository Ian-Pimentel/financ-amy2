import useCssProperty from "@/shared/hooks/useCssProperty";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const THEME_KEY = "COR_TEMA";

const [originalColor] = useCssProperty('--original-theme-color');
const [, setThemeColor] = useCssProperty('--theme-color');


export default function useThemeColor(): [string, React.Dispatch<React.SetStateAction<string>>, () => void] {
    const [theme, setTheme] = useLocalStorage(THEME_KEY, originalColor);
    const resetTheme = () => setTheme(originalColor);

    useEffect(() => setThemeColor(theme), [theme]);

    return [theme, setTheme, resetTheme];
}