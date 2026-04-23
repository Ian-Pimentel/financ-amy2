import Dialog from "@/shared/components/Dialog";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useEffect, useState } from "react";
import CurrencyTag from "./CurrencyTag";

type Props = {
    onSave: (monetary: number) => void;

    title: string;
    initialValue?: number;

    isOpen: boolean;
    close: () => void;
}

export default function MonetaryPromptModal({ onSave, initialValue, title, isOpen, close }: Props) {
    const [amount, setAmount] = useState(initialValue);

    const dismissable = initialValue !== undefined;

    const clearForm = () => {
        setAmount(initialValue);
    };

    useEffect(() => {
        if (isOpen) clearForm();
    }, [isOpen, initialValue]);

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        if (!amount || amount <= 0) return;
        onSave(amount);
    }

    return (
        <Dialog isOpen={isOpen} dismissable={dismissable} onCancel={close}>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    {title}
                </header>

                <form onSubmit={handleSubmit} id="set-salary-form">
                    <label className="grow border focus-border flex">
                        <CurrencyTag />
                        <MonetaryInput value={amount} setValue={setAmount} required />
                    </label>
                </form>

                <footer className="mt-2 flex justify-between">
                    {dismissable &&
                        <button type="button" className="w-2/5 md:w-1/4" onClick={close}>Cancelar</button>
                    }
                    <input type="submit" form="set-salary-form" className="w-2/5 md:w-1/4 ml-auto" value="Salvar" />
                </footer>
            </div>
        </Dialog >
    );
}