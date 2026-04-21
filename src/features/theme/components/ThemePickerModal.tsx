import Dialog from "@/shared/components/Dialog";
import { useDebounceCallback } from "usehooks-ts";
import useThemeColor from "../hooks/useThemeColor";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "@/shared/components/ColorPicker";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export default function ThemePickerModal({ isOpen, onClose }: Props) {
    const [theme, setTheme, resetTheme] = useThemeColor();
    const setThemeDebounced = useDebounceCallback(setTheme, 200);

    const fallbackColor = useRef(theme);

    useEffect(() => {
        if (isOpen) fallbackColor.current = theme;
    }, [isOpen]);

    const handleCancel = () => {
        setTheme(fallbackColor.current);
        onClose();
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        onClose();
    }

    return <>
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

                <footer className="mt-2 flex justify-between *:h-full">
                    <button type="button" className="button w-1/4" onClick={handleCancel}>Cancelar</button>
                    <button type="button" className="button w-1/4 line-clamp-1!" onClick={resetTheme}>Resetar Tema</button>
                    <input type="submit" className="button w-1/4" value="Salvar" form="set-theme-form" />
                </footer>
            </div>
        </Dialog>
    </>;
}
