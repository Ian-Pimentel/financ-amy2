import { useRef, useState } from "react"
import useExpenseMutation from "../hooks/useExpenseMutation";
import useYear from "../../year/hooks/useYear";
import MonetaryInput from "@/shared/components/MonetaryInput";

type Props = {
    monthIdx: number;
}

export default function AddExpense({ monthIdx }: Props) {
    const { createExpense } = useExpenseMutation();

    const [year] = useYear();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(0);

    const nameInputRef = useRef<HTMLInputElement>(null);

    const clearForm = () => {
        setName('');
        setCategory('');
        setValue(0);

        nameInputRef.current?.focus();
    }

    const handleCreate = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        await createExpense({
            name: name,
            category: category,
            value: value,
            date: new Date(year, monthIdx)
        });

        clearForm();
    }

    return <>
        <form onSubmit={handleCreate} className="contents">
            <div className="flex p-1 border-(--light-border-color) border-r border-b">
                <input value={name}
                    ref={nameInputRef}
                    className="w-full h-full"
                    type="text"
                    name="name"
                    id="add-expense-name"
                    placeholder="Novo gasto"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                />
                <span className="w-full h-full flex items-center before:content-['#']">
                    <input value={category}
                        className="w-full h-full placeholder:text-(--hint-color)"

                        type="text"
                        name="category"
                        placeholder="Categoria"
                        list="categories-list"
                        id="add-expense-category"

                        onChange={(ev) => setCategory(ev.target.value)}
                    />
                </span>
            </div>
            <span className="*:h-full border-(--light-border-color) border-b border-r">
                <MonetaryInput amount={value}
                    alignRight required
                    onChange={setValue}
                />
            </span>
            <span className="p-1 flex justify-center items-center border-(--light-border-color) border-b">
                <button type="submit" className="cursor-pointer">➕</button>
            </span>
        </form>
    </>
}