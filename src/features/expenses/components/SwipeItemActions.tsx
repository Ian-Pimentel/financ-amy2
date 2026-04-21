import MapExpenseCategoryModal from "@/features/categories/components/MapExpenseCategoryModal";
import type { Expense } from "@/db/dexieDB";
import { useToggle } from "usehooks-ts";

type Props = {
    expense: Expense;
};

export default function SwipeItemActions({ expense }: Props) {
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