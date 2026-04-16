import type { Expense } from "@/shared/dexieDB";
import useExpenseMutation from "./hooks/useExpenseMutation";
import TrashBin from "@/shared/components/TrashBin";

export type Props = {
    expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
    const { deleteExpense, editExpense } = useExpenseMutation();
    // const [categories] = useCategories();

    const handleValueInput = (value: string) => editExpense({ ...expense, value: Number(value.replace(',', '.')) });

    const borders = true;

    return <>
        <div className={"flex p-1 " + (borders && "border-(--table-color) border-r border-b")}>
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
        <span className={"p-1 flex items-center before:content-['R$_'] before:text-(--hint-color) " + (borders && "border-(--table-color) border-b border-r")}>
            <input
                className="text-right w-full h-full"
                type="number"
                name="value"
                id={`value-${expense.id}`}
                value={expense.value}
                onChange={(ev) => handleValueInput(ev.target.value)}
                step={0.01}
                min={1}
            />
        </span>
        <span className={"p-1 flex justify-center items-center " + (borders && "border-(--table-color) border-b")}>
            <TrashBin className="w-1/2 fill-(--font-color) cursor-pointer" onClick={() => deleteExpense(expense.id)} />
        </span>
    </>;
}
