import type { Expense } from "@/shared/dexieDB";
import ExpenseItem from "./ExpenseItem";
import AddExpense from "./AddExpense";
import GridRow from "@/shared/components/GridRow";
import ExpensesTotal from "./ExpensesTotal";

type Props = {
    expenses: Expense[]
    monthIdx: number
};

export default function ExpenseList({ expenses, monthIdx }: Props) {
    const totalSpent = expenses.reduce((acc, exp) => acc + exp.value, 0);

    return <>
        <div>
            <GridRow>
                <span className="p-1 font-semibold border-(--light-border-color) border-r border-b">Gasto</span>
                <span className="p-1 font-semibold text-right border-(--light-border-color) border-r border-b">Valor</span>
                <span className="p-1 font-semibold text-center border-(--light-border-color) border-b">Ações</span>
            </GridRow>

            {expenses.map((exp) =>
                <GridRow key={exp.id}>
                    <ExpenseItem expense={exp} />
                </GridRow>
            )}
            <GridRow>
                <AddExpense monthIdx={monthIdx} />
            </GridRow>
            <GridRow>
                <ExpensesTotal total={totalSpent} />
            </GridRow>
        </div>
    </>;
}



