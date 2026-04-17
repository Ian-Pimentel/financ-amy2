import type { Expense } from "@/shared/dexieDB";
import useExpenseMutation from "../hooks/useExpenseMutation";
import MonetaryInput from "@/shared/components/MonetaryInput";

export type Props = {
    expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
    const { deleteExpense, editExpense } = useExpenseMutation();
    // const [categories] = useCategories();

    const handleValueInput = (value: number) => editExpense({ ...expense, value: value });


    return <>
        <div className="flex p-1 border-(--light-border-color) border-r border-b">
            <input
                className="w-full h-full"
                id={`name-${expense.id}`}
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Nome"
                value={expense.name}
                minLength={1}
                onChange={(ev) => editExpense({ ...expense, name: ev.target.value })}
            />
            <span className="w-full h-full flex items-center before:content-['#']">
                <input
                    className="w-full h-full placeholder:text-(--hint-color)"

                    type="text"
                    name="category"
                    placeholder="Categoria"
                    list="categories-list"
                    id={`category-${expense.id}`}
                    value={expense.category}
                    onChange={(ev) => editExpense({ ...expense, category: ev.target.value.toUpperCase() })}
                />
            </span>
        </div>

        <div className="*:h-full border-(--light-border-color) border-b border-r">
            <MonetaryInput amount={expense.value} onChange={handleValueInput} alignRight />
        </div>

        <div className="p-1 flex justify-center items-center border-(--light-border-color) border-b">
            <span className="fill-(--font-color) cursor-pointer" onClick={() => deleteExpense(expense.id)}>
                🗑️
            </span>
        </div>
    </>;
}
