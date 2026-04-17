import { useRef, useState } from "react"
import useExpenseMutation from "./hooks/useExpenseMutation";
import useYear from "../year/hooks/useYear";
import { PLUS_UNICODE } from "@/shared/constants";

type Props = {
    monthIdx: number;
}

export default function AddExpense({ monthIdx }: Props) {
    const [year] = useYear();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');

    const nameInputRef = useRef<HTMLInputElement>(null);

    const clearForm = () => {
        setName('');
        setCategory('');
        setValue('');

        nameInputRef.current?.focus();
    }

    const { createExpense } = useExpenseMutation();

    const handleCreate = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        await createExpense({
            name: name,
            category: category,
            value: Number(value.replace(',', '.')),
            date: new Date(year, monthIdx)
        });

        clearForm();
    }

    const borders = true;

    return <>
        <form onSubmit={handleCreate} className="contents">
            <div className={"flex p-1 " + (borders && "border-(--light-border-color) border-r border-b")}>
                <input
                    ref={nameInputRef}
                    className="w-full h-full"
                    type="text"
                    name="name"
                    id="add-expense-name"
                    placeholder="Novo gasto"
                    value={name}
                    required
                    onChange={(ev) => setName(ev.target.value)}
                />
                <span className="w-full h-full flex items-center before:content-['#']">
                    <input
                        className="w-full h-full placeholder:text-(--hint-color)"

                        type="text"
                        name="category"
                        placeholder="Categoria"
                        list="categories-list"
                        id="add-expense-category"

                        value={category}
                        onChange={(ev) => setCategory(ev.target.value)}
                    />
                </span>
            </div>
            <span className={"p-1 flex items-center before:content-['R$_'] before:text-(--hint-color) " + (borders && "border-(--light-border-color) border-b border-r")}>
                <input
                    className="text-right w-full h-full"
                    type="number"
                    name="value"
                    id="add-expense-value"
                    value={value}
                    step={0.01}
                    min={1}
                    required
                    onChange={(ev) => setValue(ev.target.value)}
                />
            </span>
            <span className={"p-1 flex justify-center items-center " + (borders && "border-(--light-border-color) border-b")}>
                <button type="submit" className="cursor-pointer w-1/2">➕</button>
            </span>
        </form>
    </>
}