import Dialog from "@/shared/components/Dialog";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    onSave: (salary: number) => void;
    initialValue?: string;
    onCancel?: () => void;
}

export default function SalaryPromptModal({ isOpen, onSave, onCancel, initialValue = "" }: Props) {
    const [inputValue, setInputValue] = useState(initialValue);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        setInputValue(initialValue);
    }, [open])

    console.log(inputValue)


    const validateValue = (value: number) => {
        if (isNaN(value)) {
            setError(`${inputValue} não é um número válido.`);
            return false;
        }
        if (value < 1) {
            setError(`Salário deve ser maior ou igual a 1.`);
            return false;
        }
        setError('');
        return true
    }

    const handleSubmit = (ev: React.SubmitEvent) => {
        ev.preventDefault();

        const numericValue = Number(inputValue.replace(',', '.'));

        if (!validateValue(numericValue)) return;
        onSave(numericValue);
    }

    // TODO: criar componente para input numérico/monetário (com o sufixo da moeda bonitinho do lado) 
    return <>
        <Dialog isOpen={isOpen} dismissable={initialValue.length > 0} onCancel={onCancel}>
            <form onSubmit={handleSubmit} className="bg-(--bg-color) min-w-[18rem] w-[80vw] lg:w-[40vw] p-2 rounded-xl border">
                <h2 className="text-xl mb-2">Insira seu salário</h2>
                <fieldset>
                    <label htmlFor="base-salary-input" className="block">Salário:</label>
                    <div className="flex before:content-['R$'] before:mr-2 before:text-(--hint-color)">
                        <input type="number"
                            name="salary"
                            id="base-salary-input"
                            className="grow"
                            placeholder="1500.00"
                            min={1}
                            step={.01}
                            value={inputValue}
                            onChange={(ev) => setInputValue(ev.target.value)}
                            onBlur={(ev) => validateValue(Number(ev.target.value))}
                        />
                    </div>

                    <span className={`text-red-500 text-sm ${!error && "invisible"}`}>{error || "default"}</span>
                </fieldset>
                <div className="mt-1 flex justify-end">
                    <button type="submit" className="button w-1/4">Salvar</button>
                </div>
            </form>
        </Dialog >
    </>
}