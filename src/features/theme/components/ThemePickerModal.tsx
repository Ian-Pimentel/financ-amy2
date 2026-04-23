import Dialog from "@/shared/components/Dialog";
import { useDebounceCallback } from "usehooks-ts";
import useThemeColor from "../hooks/useThemeColor";
import { useEffect, useRef } from "react";
import ColorPicker from "@/shared/components/ColorPicker";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export default function ThemePickerModal({ isOpen, toggleIsOpen }: Props) {
    const [theme, setTheme, resetTheme] = useThemeColor();
    const setThemeDebounced = useDebounceCallback(setTheme, 200);

    const fallbackColor = useRef(theme);

    useEffect(() => {
        if (isOpen) fallbackColor.current = theme;
    }, [isOpen]);

    const handleCancel = () => {
        setTheme(fallbackColor.current);
        toggleIsOpen();
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        toggleIsOpen();
    }

    return (
        <Dialog isOpen={isOpen} onCancel={handleCancel} dismissable>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    Tema
                </header>

                <form id="set-theme-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <ColorPicker autoFocus={false} color={theme} onChange={(newColor) => setThemeDebounced(newColor)} />
                    </fieldset>
                </form>

                <footer className="mt-2 flex gap-2 justify-between *:h-full">
                    <button type="button" className="w-2/5" onClick={handleCancel}>Cancelar</button>
                    <button type="button" className="line-clamp-1! w-[stretch] sm:w-1/3" onClick={resetTheme}>Resetar Tema</button>
                    <input type="submit" className="w-2/5" value="Salvar" form="set-theme-form" />
                </footer>
            </div>
        </Dialog>
    );
}
