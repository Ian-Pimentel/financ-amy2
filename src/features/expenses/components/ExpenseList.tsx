import type { Expense } from "@/shared/dexieDB";
import ExpenseItem from "./ExpenseItem";
import GridRow from "@/shared/components/GridRow";
import SwipeWrapper from "@/shared/components/SwipeGesture";
import useExpenseMutation from "../hooks/useExpenseMutation";

type Props = {
    expenses: Expense[]
    monthIdx: number
};

export function SwipeDelete({ onDelete }: { onDelete: () => void }) {
    return <>
        <div onClick={onDelete} className="bg-red-600 h-full w-32 flex items-center justify-center">🗑️</div>
    </>
}

export function SwipeItemActions() {
    return <>
        <div className="flex h-full w-16 justify-center items-center border-(--light-border-color) border-b">
            <button type="button" className="inline-block cursor-pointer text-xl" onClick={() => console.log('adicionar categoria')}>
                🏷️
            </button>
        </div>
    </>;
}

export default function ExpenseList({ expenses, monthIdx }: Props) {
    const { deleteExpense } = useExpenseMutation();

    return <>
        <div>
            <GridRow>
                <span className="p-1 font-semibold border-(--light-border-color) border-r border-b">Gasto</span>
                <span className="p-1 font-semibold text-right border-(--light-border-color) border-r border-b">Valor</span>
            </GridRow>

            {expenses.map((exp) =>
                <SwipeWrapper key={exp.id}
                    leftElement={<SwipeDelete onDelete={() => deleteExpense(exp.id)} />}
                    onSwipeLeft={() => deleteExpense(exp.id)}
                    rightElement={<SwipeItemActions />}
                >
                    <GridRow>
                        <ExpenseItem expense={exp} />
                    </GridRow>
                </SwipeWrapper>
            )}
        </div>
    </>;
}



