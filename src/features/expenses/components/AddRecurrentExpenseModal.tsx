import { db, type InsertExpense } from "@/db/dexieDB";
import { getOrAddCategoryByName } from "@/db/repositories/CategoryRepository";
import { bulkAddExpenseCategory } from "@/db/repositories/expenseCategoryRepository";
import { bulkAddExpense } from "@/db/repositories/expenseRepository";

import Dialog from "@/shared/components/Dialog";
import ErrorMessage from "@/shared/components/ErrorMessage";
import MonetaryInput from "@/shared/components/MonetaryInput";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

const toISODate = (date: Date) => date.toISOString().split('T')[0]!;

export default function AddRecurrentExpenseModal({ isOpen, toggleIsOpen }: Props) {
    const [name, setName] = useState('');
    const [categoryName, setCategory] = useState('');
    const [value, setValue] = useState(0);
    const [fromDate, setFromDate] = useState(() => new Date);
    const [toDate, setToDate] = useState(() => {
        const date = new Date;
        date.setMonth(date.getMonth() + 1);
        return date
    });

    const [error, setError] = useState('');

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        if (toDate <= fromDate) {
            setError('A data de final deve ser maior que a inicial.');
            return;
        }


        const currentDate = new Date(fromDate);
        const expensesToAdd: InsertExpense[] = [];

        // 1/1/0001 -> 31/12/9999
        // (Android) 962ms kkkkkkkkkkkkkkk
        // (PC 4x slow) 365.6ms
        // (PC) 43ms
        while (currentDate <= toDate) {
            expensesToAdd.push({
                name, value,
                date: new Date(currentDate)
            });

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        await db.transaction('rw', [db.expenses, db.categories, db.expenseCategory], async () => {
            const ids = await bulkAddExpense(expensesToAdd);

            const categoryId = await getOrAddCategoryByName(categoryName);
            if (categoryId === undefined) return;

            const mapsToAdd = ids.map(expenseId => { return { expenseId, categoryId } });
            await bulkAddExpenseCategory(mapsToAdd);
        });


        toggleIsOpen();
    }

    const cleanForm = () => {
        setName('a');
        setCategory('');
        setValue(10);
        setFromDate(() => new Date)
        setToDate(() => {
            const today = new Date;
            today.setMonth(today.getMonth() + 1);
            return today;
        });
        setError('');
    }

    useEffect(() => {
        if (!isOpen) {
            cleanForm();
            return
        }
    }, [isOpen]);

    return (
        <Dialog isOpen={isOpen} onCancel={toggleIsOpen} dismissable>
            <div className="p-2 bg-(--bg-color)">
                <header className="mb-2 text-lg font-semibold">
                    Adicionar Gasto Recorrente
                </header>
                <form id="add-recurrent-expense-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor="add-recurrent-expense-name" className="text-sm font-semibold inline-block w-full">Nome</label>
                            <input value={name} onChange={ev => setName(ev.target.value)}
                                className="outline-none border focus-border p-1 w-full"
                                type="text" name="expense-name"
                                id="add-recurrent-expense-name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="add-recurrent-expense-category" className="text-sm font-semibold inline-block w-full">Categoria</label>
                            <input value={categoryName} onChange={ev => setCategory(ev.target.value)}
                                list="categories-list"
                                className="outline-none border focus-border p-1 w-full"
                                type="text" name="expense-category"
                                id="add-recurrent-expense-category"
                            />
                        </div>
                        <label>
                            <span className="text-sm font-semibold inline-block w-full">Valor</span>
                            <div
                                className="outline-none border focus-border p-1 w-full"
                            >
                                <MonetaryInput
                                    value={value} setValue={(value) => setValue(value)}
                                    alignRight required
                                />
                            </div>
                        </label>
                    </fieldset>
                    <fieldset className="flex gap-1">
                        <div className="grow">
                            <label htmlFor="add-recurrent-expense-date-from" className="text-sm font-semibold inline-block w-full">Começo</label>
                            <input
                                value={toISODate(fromDate)}
                                onChange={ev => {
                                    const raw = ev.target.value;
                                    if (raw) setFromDate(new Date(`${raw}T00:00:00`));
                                }}
                                className="outline-none border focus-border p-1 w-full "
                                type="date"
                                name="date-from"
                                id="add-recurrent-expense-date-from"
                                required
                                max="9999-12-31"
                            />
                        </div>

                        <div className="grow">
                            <label htmlFor="add-recurrent-expense-date-to" className="text-sm font-semibold inline-block w-full">Fim</label>
                            <input
                                value={toISODate(toDate)}
                                onChange={ev => {
                                    const raw = ev.target.value;
                                    if (raw) setToDate(new Date(`${raw}T00:00:00`));
                                }}
                                className="outline-none border focus-border p-1 w-full "
                                type="date" name="date-to"
                                max="9999-12-31"
                                id="add-recurrent-expense-date-to"
                                required
                            />
                        </div>
                    </fieldset>
                    {error && <ErrorMessage message={error} />}
                </form>
                <footer className="mt-3 flex justify-between">
                    <button type="button" onClick={toggleIsOpen}>Cancelar</button>
                    <input type="submit" value="Adicionar" form="add-recurrent-expense-form" />
                </footer>
            </div>
        </Dialog>
    );
}