export default function useCssProperty(cssProp: string): [string, (value: string) => void] {
    const style = getComputedStyle(document.documentElement).getPropertyValue(cssProp).trim() || undefined;
    if (!style) throw Error(`Css property "${cssProp}" not found.`);

    const setStyle = (value: string) => document.documentElement.style.setProperty(cssProp, value);

    return [style, setStyle];
} 