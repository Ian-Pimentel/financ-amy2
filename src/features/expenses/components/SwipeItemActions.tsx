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
        <div className="flex w-24 h-full border-(--light-border-color) border-b">
            <button type="button" className="p-0 border-none rounded-none grow" onClick={handleOpenMapCategory}>
                {/* 🏷️ */}
                <div className="text-2xl">🏷️</div>
            </button>
        </div>
    );
}