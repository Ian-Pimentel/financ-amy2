import Dialog from "@/shared/components/Dialog";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useEffect, useState } from "react";

type Props = {
    onSave: (monetary: number) => void;

    title: string;
    initialValue?: number;

    isOpen: boolean;
    close: () => void;
}

export default function MonetaryPromptModal({ onSave, initialValue, title, isOpen, close }: Props) {

    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    const dismissable = initialValue !== undefined;

    const clearForm = () => {
        setError('');
        setAmount(initialValue || 0);
    };

    useEffect(() => {
        if (isOpen) clearForm();
    }, [isOpen, initialValue]);

    const validateValue = (value: number) => {
        if (value < 1) {
            setError("Valor deve ser positivo");
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        if (!validateValue(amount)) return;
        onSave(amount);
    }

    return (
        <Dialog isOpen={isOpen} dismissable={dismissable} onCancel={close}>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    {title}
                </header>

                <form onSubmit={handleSubmit} id="set-salary-form">
                    <fieldset>
                        <div className="button focus-within:border-(--focus-color)">
                            <MonetaryInput value={amount} setValue={setAmount} onBlur={validateValue} required />
                        </div>
                        <span className={`text-red-500 text-sm ${!error && "invisible"}`}>{error || "default"}</span>
                    </fieldset>
                </form>

                <footer className="mt-1 flex justify-between">
                    {dismissable &&
                        <button type="button" className="button w-1/4" onClick={close}>Cancelar</button>
                    }
                    <input type="submit" form="set-salary-form" className="button w-1/4 ml-auto" value="Salvar" />
                </footer>
            </div>
        </Dialog>
    );
}