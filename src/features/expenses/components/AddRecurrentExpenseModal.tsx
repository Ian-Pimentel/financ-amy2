import { db, type InsertExpense } from "@/db/dexieDB";
import { getOrAddCategoryByName } from "@/db/repositories/categoryRepository";
import { bulkAddExpenseCategory } from "@/db/repositories/expenseCategoryRepository";
import { bulkAddExpense } from "@/db/repositories/expenseRepository";

import Dialog from "@/shared/components/Dialog";
import ErrorMessage from "@/shared/components/ErrorMessage";
import MonetaryInput from "@/shared/components/MonetaryInput";
import type { MonthIndices } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

const toISODate = (date: Date) => date.toISOString().split('T')[0]!;

// só queria usar isso uma vez na vida kkkkkkkkk
function* monthAdder(year: number, monthIndice: MonthIndices): Generator<[number, MonthIndices], void, unknown> {
    let currentYear = year;
    let currentMonth = monthIndice;

    yield [currentYear, currentMonth];

    while (true) {
        currentMonth++;

        if (currentMonth > 11) {

            currentMonth = 0;
            currentYear++;
        }

        yield [currentYear, currentMonth];
    }
}

export default function AddRecurrentExpenseModal({ isOpen, toggleIsOpen }: Props) {
    const [name, setName] = useState('');
    const [categoryName, setCategory] = useState('');
    const [value, setValue] = useState(0);
    const [fromDate, setFromDate] = useState(() => new Date);
    const [installments, setInstallments] = useState<number>();
    // const [toDate, setToDate] = useState(() => {
    //     const date = new Date;
    //     date.setMonth(date.getMonth() + 1);
    //     return date
    // });

    const [error, setError] = useState('');

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        if (/*toDate <= fromDate || */installments === undefined) {
            setError('A data de final deve ser maior que a inicial.');
            return;
        }

        const expensesToAdd: InsertExpense[] = [];
        const _monthAdder = monthAdder(fromDate.getFullYear(), fromDate.getMonth());

        let i = installments;

        // 1/1/0001 -> 31/12/9999
        // (Android) 78ms
        // (PC 4x slow) 16.7ms
        // (PC) 4.7ms
        while (i-- > 0) {
            const [year, monthIndice] = _monthAdder.next().value!;
            expensesToAdd.push({
                name, value: value / installments,
                date: new Date(year, monthIndice)
            });
        }

        // const currentDate = new Date(fromDate);
        // 
        // 1/1/0001 -> 31/12/9999
        // (Android) 962ms kkkkkkkkkkkkkkk
        // (PC 4x slow) 365.6ms
        // (PC) 43ms
        // while (currentDate <= toDate) {
        //     expensesToAdd.push({
        //         name, value,
        //         date: new Date(currentDate)
        //     });

        //     currentDate.setMonth(currentDate.getMonth() + 1);
        // }

        await db.transaction('rw', [db.expenses, db.categories, db.expenseCategory], async () => {
            const ids = await bulkAddExpense(expensesToAdd);

            if (categoryName !== '') {
                const categoryId = await getOrAddCategoryByName(categoryName);
                if (categoryId === undefined) return; //como categoria é opcional, não preciso throw Error pra cancelar a transação
                const mapsToAdd = ids.map(expenseId => { return { expenseId, categoryId } });
                await bulkAddExpenseCategory(mapsToAdd);
            }
        });


        toggleIsOpen();
    }

    const cleanForm = () => {
        setName('');
        setCategory('');
        setValue(0);
        setFromDate(() => new Date)
        setInstallments(0);
        // setToDate(() => {
        //     const today = new Date;
        //     today.setMonth(today.getMonth() + 1);
        //     return today;
        // });
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
                    Adicionar Gasto Parcelado
                </header>
                <form id="add-recurrent-expense-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <label htmlFor="add-recurrent-expense-name" className="text-sm font-semibold inline-block w-full">Nome</label>
                        <input value={name} onChange={ev => setName(ev.target.value)}
                            className="focus-border p-1"
                            type="text" name="expense-name"
                            id="add-recurrent-expense-name"
                            required
                        />
                        <div className="flex gap-1">
                            <div className="grow">
                                <label htmlFor="add-recurrent-expense-category" className="text-sm font-semibold inline-block w-full">Categoria</label>
                                <input value={categoryName} onChange={ev => setCategory(ev.target.value)}
                                    list="categories-list"
                                    className="focus-border p-1"
                                    type="text" name="expense-category"
                                    id="add-recurrent-expense-category"
                                />
                            </div>
                            <label className="grow">
                                <span className="text-sm font-semibold inline-block w-full">Valor</span>
                                <div className="focus-border p-1">
                                    <MonetaryInput
                                        value={value} setValue={(value) => setValue(value)}
                                        alignRight required
                                    />
                                </div>
                            </label>
                        </div>

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
                                className="focus-border p-1"
                                type="date"
                                name="date-from"
                                id="add-recurrent-expense-date-from"
                                required
                                max="9999-12-31"
                            />
                        </div>

                        <div className="grow basis-0">
                            <label htmlFor="add-recurrent-expense-installments" className="text-sm font-semibold inline-block w-full">Parcelas</label>
                            <input
                                value={installments || ""}
                                onChange={ev => setInstallments(ev.target.valueAsNumber)}
                                className="focus-border p-1"
                                type="number" name="installments"
                                min={0} step={1}
                                id="add-recurrent-expense-installments"
                                required
                            />
                        </div>

                        {/* <div className="grow">
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
                        </div> */}
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