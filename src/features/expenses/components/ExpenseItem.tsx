import { db, type Expense } from "@/shared/dexieDB";
import useExpenseMutation from "../hooks/useExpenseMutation";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import useCategoryQuery from "@/features/categories/hooks/useCategoryQuery";

export type Props = {
    expense: Expense;
};



export default function ExpenseItem({ expense }: Props) {
    const { editExpense } = useExpenseMutation();
    const { getCategory } = useCategoryQuery();

    const getExpenseCategories = (expenseId: number) => useLiveQuery(
        async () => {
            const expenseCategories = await db.expenseCategory
                .where('expenseId').equals(expenseId)
                .first();

            if (!expenseCategories) return;

            const categ = await getCategory(expenseCategories.categoryId);

            return categ;
        },
        [expenseId]
    );

    const category = getExpenseCategories(expense.id);

    const [newValue, setNewValue] = useState(expense.value);
    // const [categories] = useCategories();

    const handleValueInput = (value: number) => {
        setNewValue(value);
        editExpense({ ...expense, value: Number.isNaN(value) ? 0 : value });
    };

    return <div className="contents *:border-(--light-border-color) *:border-[0_1_1_1]">
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
                onChange={(ev) => editExpense({ ...expense, name: ev.target.value })}
            />

            {category && <span className="w-2" style={{ backgroundColor: category.color }} />}

            {/* {category && <span className="w-full h-full flex items-center before:content-['#']">
                {category.name}
            </span>} */}
        </div>

        <div className="*:h-full border-(--light-border-color) border-b border-r">
            <MonetaryInput value={newValue} setValue={handleValueInput} alignRight />
        </div>
    </div>;
}
