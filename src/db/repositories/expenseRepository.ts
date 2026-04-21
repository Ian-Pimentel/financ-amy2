import type { MonthIndices } from "@/types";
import { db, type Expense, type InsertExpense } from "../dexieDB";

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

// const getExpensesByCategory = (categoryId: number) => {
//     TODO
// }

// MUTATION

const addExpense = (expense: InsertExpense) => db.expenses.add(expense);

const putExpense = (expense: InsertExpense) => db.expenses.put(expense);

const updateExpense = (expense: Expense) => db.expenses.update(expense.id, expense);

const deleteExpense = (id: number) => db.expenses.delete(id);

export {
    getExpensesCollection,
    getExpense,
    // getExpensesByCategory,

    addExpense, putExpense, updateExpense, deleteExpense
}