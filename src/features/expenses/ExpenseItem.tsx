import type { Expense } from "@/shared/dexieDB";
import useExpenseMutation from "./hooks/useExpenseMutation";

export type Props = {
    expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
    const { deleteExpense } = useExpenseMutation();

    return <>
        <div>
            <span>{expense.id}</span>
            <span>{expense.name}</span>
            <span>{expense.category}</span>
            <span>{expense.value}</span>
            <span><button type="button" onClick={() => deleteExpense(expense.id)}>Deletar</button></span>
        </div>
    </>;
}
