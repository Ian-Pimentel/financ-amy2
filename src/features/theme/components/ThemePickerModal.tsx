import Dialog from "@/shared/components/Dialog";
import { useDebounceCallback } from "usehooks-ts";
import useThemeColor from "../hooks/useThemeColor";
import { useEffect, useState } from "react";
import ColorPicker from "@/shared/components/ColorPicker";
import useComputedStyle from "@/shared/hooks/useCssProperty";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export default function ThemePickerModal({ isOpen, onClose }: Props) {
    const [theme, setTheme, resetTheme] = useThemeColor();
    const setThemeDebounced = useDebounceCallback(setTheme, 200);

    const [firstColor, setFirstColor] = useState(theme);
    useEffect(() => setFirstColor(theme), [isOpen]);

    const handleCancel = () => {
        setTheme(firstColor);
        onClose();
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        onClose();
    }

    return <>
        <Dialog isOpen={isOpen} onCancel={handleCancel} dismissable>
            <div className="bg-(--bg-color) w-[90vw] md:w-[50vw] lg:w-[40vw] p-2 rounded-xl border">
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
