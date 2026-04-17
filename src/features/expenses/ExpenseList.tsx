import type { Expense, InsertExpense } from "@/shared/dexieDB";
import ExpenseItem from "./ExpenseItem";
import useExpenseMutation from "./hooks/useExpenseMutation";
import useYear from "../year/hooks/useYear";
import { MONTHS } from "@/shared/constants";
import AddExpense from "./AddExpense";

type Props = {
    expenses: Expense[]
    monthIdx: number
};

export default function ExpenseList({ expenses, monthIdx }: Props) {
    const borders = true;

    return <>
        <div className="grid grid-cols-[6fr_2fr_min-content]">
            <span className={"p-1 font-semibold " + (borders && "border-(--light-border-color) border-r border-b")}>Gasto</span>
            <span className={"p-1 font-semibold text-right " + (borders && "border-(--light-border-color) border-r border-b")}>Valor</span>
            <span className={"p-1 font-semibold text-center " + (borders && "border-(--light-border-color) border-b")}>Ações</span>

            {expenses.map((exp) => <ExpenseItem key={exp.id} expense={exp} />)}
            <AddExpense monthIdx={monthIdx} />
        </div>
    </>;
}
