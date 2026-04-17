import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const THEME_KEY = "COR_TEMA";

const changeTheme = (color: string) => document.documentElement.style.setProperty('--theme-color', color);

const originalTheme = getComputedStyle(document.documentElement).getPropertyValue('--original-theme-color');


export default function useThemeColor(): [string, React.Dispatch<React.SetStateAction<string>>, () => void] {
    const [theme, setTheme] = useLocalStorage(THEME_KEY, originalTheme);
    const resetTheme = () => setTheme(originalTheme);

    useEffect(() => changeTheme(theme), [theme]);

    return [theme, setTheme, resetTheme];
}