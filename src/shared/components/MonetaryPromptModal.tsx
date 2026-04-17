import Dialog from "@/shared/components/Dialog";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useEffect, useState } from "react";

type Props = {
    title?: string;
    isOpen: boolean;
    onSave: (monetary: number) => void;
    initialValue?: number;
    onCancel?: () => void;
}

export default function MonetaryPromptModal({ isOpen, onSave, onCancel, initialValue, title }: Props) {
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    const dismissable = initialValue !== undefined;

    const clearComponent = () => {
        setError('');
        setAmount(initialValue || 0);
    }

    useEffect(() => {
        if (isOpen) clearComponent();
    }, [isOpen])

    const validateValue = (value: number) => {
        if (value < 1) {
            setError(title ? `Valor deve ser positivo.` : "Salário precisa ser maior que 0.");
            return false;
        }
        setError('');
        return true
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();
        if (!validateValue(amount)) return;
        onSave(amount);
    }

    return <>
        <Dialog isOpen={isOpen} dismissable={dismissable} onCancel={onCancel}>
            <form onSubmit={handleSubmit} className="bg-(--bg-color) p-2 rounded-xl border w-[80vw] md:w-[40vw] lg:w-[30vw]">
                <h2 className="text-xl mb-2">{title || "Insira seu salário"}</h2>
                <fieldset>
                    <div className="button focus-within:border-(--focus-color)">
                        <MonetaryInput amount={amount} onChange={setAmount} onBlur={validateValue} required />
                    </div>
                    <span className={`text-red-500 text-sm ${!error && "invisible"}`}>{error || "default"}</span>
                </fieldset>

                <div className="mt-1 flex justify-between">
                    {dismissable &&
                        <button type="button" className="button w-1/4" onClick={onCancel}>Cancelar</button>
                    }
                    <button type="submit" className="button w-1/4 ml-auto">Salvar</button>
                </div>
            </form>
        </Dialog >
    </>
}