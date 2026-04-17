import Dialog from "@/shared/components/Dialog";
import { useDebounceCallback } from "usehooks-ts";
import useThemeColor from "../hooks/useThemeColor";
import { useEffect, useState } from "react";

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
            <form className="bg-(--bg-color) min-w-[18rem] w-[80vw] lg:w-[40vw] p-2 rounded-xl border" onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        Selecione um novo tema:
                        <input type="color" name="theme-picker" value={theme} onChange={(ev) => setThemeDebounced(ev.target.value)} />
                    </label>
                </fieldset>
                <div>
                    <button type="button" className="button" onClick={handleCancel}>Cancelar</button>
                    <button type="button" className="button" onClick={resetTheme}>Resetar Tema</button>
                    <input type="submit" className="button" value="Salvar" />
                </div>
            </form>
        </Dialog>
    </>;
}