import type { Expense, InsertExpense } from "@/shared/dexieDB";
import ExpenseItem from "./ExpenseItem";
import useExpenseMutation from "./hooks/useExpenseMutation";
import useYear from "../year/hooks/useYear";
import { MONTHS } from "@/shared/constants";

type Props = {
    expenses: Expense[]
    monthIdx: number
};

export default function ExpenseList({ expenses, monthIdx }: Props) {
    const { createExpense } = useExpenseMutation();
    const [year] = useYear();

    const handleCreate = (expense?: InsertExpense) => {
        createExpense(expense || {
            name: 'teste ' + MONTHS[monthIdx],
            value: 10,
            category: '',
            date: new Date(year, monthIdx)
        });
    };

    return <>
        {expenses.map(exp => <ExpenseItem key={exp.id} expense={exp} />)}
        <div>
            <button type="button" onClick={() => handleCreate()}>Adicionar Gasto</button>
        </div>
    </>;
}
