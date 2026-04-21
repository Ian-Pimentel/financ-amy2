import Dialog from "@/shared/components/Dialog";
import { useEffect, useState } from "react";
import useExpenseCategoryQuery from "@/features/expenseCategory/useExpenseCategory";
import type { Expense } from "@/db/dexieDB";
import useCategoryQuery from "../hooks/useCategory";
import ColorDisplay from "@/shared/components/ColorDisplay";
import { addExpenseCategory } from "@/db/repositories/expenseCategoryRepository";

type Props = {
    isOpen: boolean;
    expense: Expense;
    toggleIsOpen: () => void;
}

export default function MapExpenseCategoryModal({ isOpen, expense, toggleIsOpen }: Props) {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

    const alreadyMapped = useExpenseCategoryQuery({ expenseId: expense.id });
    const categories = useCategoryQuery();

    useEffect(() => {
        setSelectedCategoryId(undefined);

        if (alreadyMapped === undefined) return;
        if (alreadyMapped[0]) {
            setSelectedCategoryId(alreadyMapped[0].categoryId);
        }
    }, [isOpen]);

    if (categories === undefined) return;

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        if (!selectedCategoryId) return;

        if (alreadyMapped?.some(({ categoryId }) => categoryId === selectedCategoryId)) {
            toggleIsOpen();
            return;
        }

        await addExpenseCategory(expense.id, selectedCategoryId);

        toggleIsOpen();
    }

    return <>
        <Dialog isOpen={isOpen} onCancel={toggleIsOpen} dismissable>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    {categories.length > 0 ? "Selecione uma categoria." : "Nenhuma categoria cadastrada."}
                </header>

                {
                    categories.length > 0 &&
                    <form onSubmit={handleSubmit} id="map-expense-category-form">
                        <fieldset className="flex flex-col gap-2">
                            {categories.map(category => {
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
                    {categories.length > 0 && <input type="submit" className="button ml-auto" value="Salvar" form="map-expense-category-form" />}
                </footer>
            </div>
        </Dialog>
    </>
}

export function RadioIndicator({ active }: { active: boolean }) {
    return <span className={`rounded-full block w-4 h-4 border ${active && 'bg-(--theme-color) border-none'}`} />;
}

{/* <label className="focus-border px-2 py-1 bg-(--bg-color) flex!">
    <select
        className="grow outline-none peer w-full"
        name="map-expense-category"
        id="map-expense-category-select"
        value={category} onChange={ev => setCategory(+ev.target.value)}
    >
        {categories?.map(cat => <option value={cat.id}>{cat.name}</option>)}
    </select>
    <div className="peer-open:rotate-270">{"<"}</div>
</label> */}