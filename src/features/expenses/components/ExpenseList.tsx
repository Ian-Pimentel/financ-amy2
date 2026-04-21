import type { Expense } from "@/db/dexieDB";
import ExpenseItem from "./ExpenseItem";
import GridRow from "@/shared/components/GridRow";
import SwipeWrapper from "@/shared/components/SwipeWrapper";
import { useToggle } from "usehooks-ts";
import MapExpenseCategoryModal from "@/features/categories/components/MapExpenseCategoryModal";
import { deleteExpense } from "@/db/repositories/ExpenseRepository";

type Props = {
    expenses: Expense[]
};

export function SwipeDelete({ onDelete }: { onDelete: () => void }) {
    return <>
        <div onClick={onDelete} className="bg-red-600 h-full w-32 flex items-center justify-center">🗑️</div>
    </>
}

export function SwipeItemActions({ expense }: { expense: Expense }) {
    // MODAIS
    const [isCategorySelectModalOpen, toggleCategorySelectModalOpen] = useToggle(false);

    return <>
        <div className="flex h-full w-16 justify-center items-center border-(--light-border-color) border-b">
            <button type="button" className="inline-block cursor-pointer text-xl" onClick={toggleCategorySelectModalOpen}>
                🏷️
            </button>
        </div>
        <MapExpenseCategoryModal isOpen={isCategorySelectModalOpen} toggleIsOpen={toggleCategorySelectModalOpen} expense={expense} />
    </>;
}

export default function ExpenseList({ expenses }: Props) {
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
                    rightElement={<SwipeItemActions expense={exp} />}
                >
                    <GridRow>
                        <ExpenseItem expense={exp} />
                    </GridRow>
                </SwipeWrapper>
            )}


        </div>
    </>;
}



