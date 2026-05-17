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

export default function AddRecurrentExpenseModal({ isOpen, toggleIsOpen }: Props) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [total, setValue] = useState(0);
    const [fromDate, setFromDate] = useState(() => new Date);
    const [isInstallment, setIsInstallment] = useState(false);
    const [installments, setInstallments] = useState<number>();
    const [toDate, setToDate] = useState(() => {
        const date = new Date;
        date.setMonth(date.getMonth() + 1);
        return date
    });

    const [error, setError] = useState('');

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        let expensesToAdd: InsertExpense[];

        if (isInstallment) {
            expensesToAdd = expenseInInstallments(fromDate, installments!, name, total);
        }
        else {
            if (toDate <= fromDate) {
                setError('A data de final deve ser maior que a inicial.');
                return;
            }
            expensesToAdd = recurrentExpenses(fromDate, toDate, name, total);
        }

        await bulkAddExpenseAndCategory(expensesToAdd, category);

        toggleIsOpen();
    }

    const cleanForm = () => {
        setName('');
        setCategory('');
        setValue(0);
        setFromDate(() => new Date)
        setInstallments(0);
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
                        <div className="md:flex md:gap-1">
                            <label className="md:grow">
                                <span className="text-sm font-semibold">Nome</span>
                                <div className="focus-border p-1">
                                    <input value={name} onChange={ev => setName(ev.target.value)}
                                        type="text" name="expense-name"
                                        id="add-recurrent-expense-name"
                                        required
                                    />
                                </div>
                            </label>
                            <label className="md:grow">
                                <span className="text-sm font-semibold">Categoria</span>
                                <div className="focus-border p-1">
                                    <input value={category} onChange={ev => setCategory(ev.target.value)}
                                        type="text" name="expense-category"
                                        id="add-recurrent-expense-category"
                                        list="categories-list"
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-1 items-end">
                            <label className="grow">
                                <span className="text-sm font-semibold">Valor Total</span>
                                <div className="focus-border p-1">
                                    <MonetaryInput
                                        value={total} setValue={(value) => setValue(value)}
                                        alignRight required
                                    />
                                </div>
                            </label>
                            <label className="flex gap-1 bg-transparent!">
                                <span className="text-sm font-semibold">Parcelado?</span>
                                <input
                                    checked={isInstallment} onChange={ev => setIsInstallment(ev.target.checked)}
                                    type="checkbox" name="expense-is-installment"
                                    id="add-recurrent-expense-is-installment"
                                />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="md:flex md:gap-1">
                        <label className="md:grow">
                            <span className="text-sm font-semibold">Começo</span>
                            <div className="focus-border p-1">
                                <input
                                    value={toISODate(fromDate)}
                                    onChange={ev => {
                                        const raw = ev.target.value;
                                        if (raw) setFromDate(new Date(`${raw}T00:00:00`));
                                    }}
                                    type="date"
                                    name="date-from"
                                    id="add-recurrent-expense-date-from"
                                    required
                                    max="9999-12-31"
                                />
                            </div>
                        </label>

                        {isInstallment &&
                            <label className="md:grow">
                                <span className="text-sm font-semibold">Parcelas</span>
                                <div className="focus-border p-1">
                                    <input
                                        value={installments || ""}
                                        onChange={ev => setInstallments(ev.target.valueAsNumber)}
                                        type="number" name="installments"
                                        min={1} step={1}
                                        id="add-recurrent-expense-installments"
                                        required
                                    />
                                </div>
                            </label>}

                        {!isInstallment &&
                            <label className="md:grow">
                                <span className="text-sm font-semibold">Fim</span>
                                <div className="focus-border p-1">
                                    <input
                                        value={toISODate(toDate)}
                                        onChange={ev => {
                                            const raw = ev.target.value;
                                            if (raw) setToDate(new Date(`${raw}T00:00:00`));
                                        }}

                                        type="date" name="date-to"
                                        max="9999-12-31"
                                        id="add-recurrent-expense-date-to"
                                        required
                                    />
                                </div>
                            </label>}
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

const bulkAddExpenseAndCategory = (expensesToAdd: InsertExpense[], category: string) =>
    db.transaction('rw', [db.expenses, db.categories, db.expenseCategory], async () => {
        const ids = await bulkAddExpense(expensesToAdd);

        if (category !== '') {
            const categoryId = await getOrAddCategoryByName(category);
            if (categoryId === undefined) return; //como categoria é opcional, não preciso throw Error pra cancelar a transação
            const mapsToAdd = ids.map(expenseId => { return { expenseId, categoryId }; });
            await bulkAddExpenseCategory(mapsToAdd);
        }
    });

const expenseInInstallments = (fromDate: Date, installments: number, name: string, total: number) => {
    const expensesToAdd: InsertExpense[] = [];
    const _monthAdder = monthAdder(fromDate.getFullYear(), fromDate.getMonth());

    let i = installments;

    while (i-- > 0) {
        const [year, monthIndice] = _monthAdder.next().value!;
        expensesToAdd.push({
            name, value: total / installments,
            date: new Date(year, monthIndice)
        });
    }
    return expensesToAdd;
}

const recurrentExpenses = (fromDate: Date, toDate: Date, name: string, total: number) => {
    const expensesToAdd: InsertExpense[] = [];
    const _monthAdder = monthAdder(fromDate.getFullYear(), fromDate.getMonth());

    const toYear = toDate.getFullYear();
    const toMonthIndice = toDate.getMonth();

    while (true) {
        const [year, monthIndice] = _monthAdder.next().value!;
        if (year > toYear || (year === toYear && monthIndice > toMonthIndice)) break;

        expensesToAdd.push({
            name, value: total,
            date: new Date(year, monthIndice)
        });
    }
    return expensesToAdd;
}
