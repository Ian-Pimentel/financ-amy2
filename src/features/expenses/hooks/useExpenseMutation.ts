import { db, type Expense, type InsertExpense } from "@/shared/dexieDB";

export default function useExpenseMutation() {
    const createExpense = async (expense: InsertExpense) => await db.expenses.add(expense);

    const putExpense = async (expense: InsertExpense) => await db.expenses.put(expense);

    const editExpense = async (expense: Expense) => await db.expenses.update(expense.id, expense);

    const deleteExpense = async (id: number) => await db.expenses.delete(id);

    return { createExpense, putExpense, editExpense, deleteExpense };
}