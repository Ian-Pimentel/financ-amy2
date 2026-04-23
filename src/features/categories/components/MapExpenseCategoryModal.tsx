import Dialog from "@/shared/components/Dialog";
import { useEffect, useState } from "react";
import type { Expense } from "@/db/dexieDB";
import useCategoryQuery from "../hooks/useCategory";
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
    }, [isOpen, expense]);

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

                                return (
                                    <label key={category.id} className="contents">
                                        <div role="button" className="flex gap-2 items-center">
                                            <input type="radio" checked={active} onChange={() => setSelectedCategoryId(category.id)} />
                                            <div className="grow">{category.name}</div>
                                            <input type="color" className="shrink basis-0 pointer-events-none" value={category.color} readOnly />
                                        </div>
                                    </label>
                                );
                            })}
                        </fieldset>
                    </form>
                }


                <footer className="flex justify-end mt-2">
                    <button type="button" onClick={toggleIsOpen}>Cancelar</button>
                    {
                        hasCategories &&
                        <input type="submit" className="button ml-auto" value="Salvar" form="map-expense-category-form" />
                    }
                </footer>
            </div>
        </Dialog>
    );
}