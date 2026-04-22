import Dialog from "@/shared/components/Dialog";
import { useEffect, useState } from "react";
import type { Expense } from "@/db/dexieDB";
import useCategoryQuery from "../hooks/useCategory";
import ColorDisplay from "@/shared/components/ColorDisplay";
import { addExpenseCategory } from "@/db/repositories/expenseCategoryRepository";

type Props = {
    isOpen: boolean;
    expense?: Expense;
    initialCategoryId?: number;
    toggleIsOpen: () => void;
}

export default function MapExpenseCategoryModal({ isOpen, expense, initialCategoryId, toggleIsOpen }: Props) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
    const categories = useCategoryQuery();

    useEffect(() => {
        if (!isOpen) {
            setSelectedCategoryId(undefined);
            return;
        } else {
            setSelectedCategoryId(initialCategoryId)
        }
    }, [isOpen, initialCategoryId]);

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        if (!selectedCategoryId || !expense) return;

        if (selectedCategoryId === initialCategoryId) {
            toggleIsOpen();
            return;
        }

        await addExpenseCategory(expense.id, selectedCategoryId);

        toggleIsOpen();
    }

    const categoriesAreLoaded = categories !== undefined;
    const hasCategories = categoriesAreLoaded && categories.length > 0;

    return (
        <Dialog isOpen={isOpen} onCancel={toggleIsOpen} dismissable>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    {
                        hasCategories ?
                            "Selecione uma categoria." :
                            "Nenhuma categoria cadastrada."
                    }
                </header>

                {
                    hasCategories &&
                    <form onSubmit={handleSubmit} id="map-expense-category-form">
                        <fieldset className="flex flex-col gap-2">
                            {categories?.map(category => {
                                const active = selectedCategoryId === category.id;

                                return <ColorDisplay rtl title={category.name} color={category.color} key={category.id}>
                                    <span className="ml-1 mr-2">
                                        <RadioIndicator active={active} />
                                    </span>
                                    <input
                                        type="radio"
                                        name="category-group"
                                        value={category.id}
                                        checked={active}
                                        onChange={() => setSelectedCategoryId(category.id)}
                                        autoFocus={false}
                                    />
                                </ColorDisplay>
                            })}
                        </fieldset>
                    </form>
                }


                <footer className="flex justify-end mt-2">
                    <button type="button" className="button" onClick={toggleIsOpen}>Cancelar</button>
                    {
                        hasCategories &&
                        <input type="submit" className="button ml-auto" value="Salvar" form="map-expense-category-form" />
                    }
                </footer>
            </div>
        </Dialog>
    );
}

export function RadioIndicator({ active }: { active: boolean }) {
    return <span className={`rounded-full block w-4 h-4 border ${active && 'bg-(--theme-color) border-none'}`} />;
}