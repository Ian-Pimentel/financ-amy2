import { type Expense } from "@/db/dexieDB";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { getCategoryByExpense } from "@/db/repositories/CategoryRepository";
import { updateExpense } from "@/db/repositories/expenseRepository";

export type Props = {
    expense: Expense;
};



export default function ExpenseItem({ expense }: Props) {
    const category = useLiveQuery(() => getCategoryByExpense(expense.id), [expense]);

    const [newValue, setNewValue] = useState(expense.value);

    const handleValueInput = (value: number) => {
        setNewValue(value);
        updateExpense({ ...expense, value: Number.isNaN(value) ? 0 : value });
    };

    return <div className="contents *:border-(--light-border-color) *:border-[0_1_1_1] *:p-1 *:md:px-2">
        <div className="flex">
            <input
                className="w-full h-full outline-none p-1"
                id={`name-${expense.id}`}
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Nome"
                value={expense.name}
                minLength={1}
                onChange={(ev) => updateExpense({ ...expense, name: ev.target.value })}
            />

            {category && <span className="w-2" style={{ backgroundColor: category.color }} />}
        </div>

        <div className="*:h-full border-(--light-border-color) border-b border-r">
            <MonetaryInput value={newValue} setValue={handleValueInput} alignRight />
        </div>


    </div>;
}
