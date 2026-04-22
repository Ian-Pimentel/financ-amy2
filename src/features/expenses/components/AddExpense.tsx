import { useRef, useState } from "react"
import useYear from "../../year/hooks/useYear";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { getOrAddCategoryByName } from "@/db/repositories/CategoryRepository";
import { addExpense } from "@/db/repositories/expenseRepository";
import { addExpenseCategory } from "@/db/repositories/expenseCategoryRepository";

type Props = {
    monthIdx: number;
}

export default function AddExpense({ monthIdx }: Props) {
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

        const categId = await getOrAddCategoryByName(category);

        const expenseId = await addExpense({
            name: name,
            value: value,
            date: new Date(year, monthIdx)
        });

        if (categId) await addExpenseCategory(expenseId, categId);

        clearForm();
    }

    return (
        <form onSubmit={handleCreate} className="contents *:border-(--light-border-color) *:border-[0_1_1_1] *:p-1 *:md:px-2">
            <div className="flex">
                <input value={name}
                    ref={nameInputRef}
                    className="w-full h-full"
                    type="text"
                    name="expense-name"
                    id="add-expense-name"
                    placeholder="Novo gasto"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                />
                <span className="w-full h-full flex items-center before:content-['#']">
                    <input value={category}
                        className="w-full h-full placeholder:text-(--hint-color)"

                        type="text"
                        name="expense-category"
                        placeholder="Categoria"
                        list="categories-list"
                        id="add-expense-category"

                        onChange={(ev) => setCategory(ev.target.value)}
                    />
                </span>
            </div>
            <MonetaryInput value={value}
                alignRight required
                setValue={setValue}
            />
            <input type="submit" className="cursor-pointer hidden" value="➕" />
        </form>
    );
}