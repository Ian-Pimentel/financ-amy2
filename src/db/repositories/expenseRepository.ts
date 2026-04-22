import type { MonthIndices } from "@/types";
import { db, type Expense, type InsertExpense } from "../dexieDB";
import { deleteCategoriesRelationsByExpense, getExpensesCategoriesCollection } from "./expenseCategoryRepository";

// QUERY
const getExpensesCollection = (year?: number, monthIdx?: MonthIndices) => {
    if (year !== undefined && monthIdx !== undefined) return db.expenses.where({ year, monthIdx });

    if (year !== undefined) return db.expenses.where({ year });

    if (monthIdx !== undefined) return db.expenses.where({ monthIdx });

    return db.expenses.orderBy("[year+monthIdx]");
}

const getExpense = (expenseId: number) => {
    return db.expenses.get(expenseId);
}

const getBulkExpenses = (expensesIds: number[]) => {
    return db.expenses.bulkGet(expensesIds);
}

const getExpensesByCategory = async (categoryId: number) => {
    const expenses = await getExpensesCategoriesCollection(undefined, categoryId).toArray();

    if (!expenses) return;

    return getBulkExpenses(expenses.map(relation => relation.expenseId));
}

// MUTATION

const addExpense = (expense: InsertExpense) => db.expenses.add(expense);

const bulkAddExpense = (expenses: InsertExpense[]) => db.expenses.bulkAdd(expenses, { allKeys: true });

const putExpense = (expense: InsertExpense) => db.expenses.put(expense);

const updateExpense = (expense: Expense) => db.expenses.update(expense.id, expense);

const deleteExpense = (expenseId: number) => {
    db.transaction('rw', [db.expenses, db.expenseCategory], async () => {
        await deleteCategoriesRelationsByExpense(expenseId);
        await db.expenses.delete(expenseId);
    })
};

export {
    getExpensesCollection,
    getExpense,
    getBulkExpenses,
    getExpensesByCategory,

    bulkAddExpense,
    addExpense,
    putExpense,
    updateExpense,
    deleteExpense
}