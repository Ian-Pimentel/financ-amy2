import type { Expense } from "@/db/dexieDB";
import { getCategoryByExpense } from "@/db/repositories/CategoryRepository";
import { useModals } from "@/shared/components/ModalContext";

type Props = {
    expense: Expense;
};

export function SwipeItemActions({ expense }: Props) {
    const { openMapExpenseCategoryModal } = useModals();

    const handleOpenMapCategory = async () => {
        const initialCategoryId = (await getCategoryByExpense(expense.id))?.id;
        openMapExpenseCategoryModal({
            expense, initialCategoryId
        })
    }

    return (
        <div className="flex h-full w-16 justify-center items-center border-(--light-border-color) border-b">
            <button type="button" className="inline-block cursor-pointer text-xl" onClick={handleOpenMapCategory}>
                🏷️
            </button>
        </div>
    );
}