import { db } from "../dexieDB";

// QUERY
const getExpenseCategory = (expenseId: number, categoryId: number) => {
    return db.expenseCategory.where({ expenseId, categoryId }).first();
}

const getExpensesCategoriesCollection = (expenseId?: number, categoryId?: number) => {
    if (expenseId !== undefined && categoryId !== undefined) return db.expenseCategory.where({ expenseId, categoryId });

    if (expenseId !== undefined) return db.expenseCategory.where({ expenseId });

    if (categoryId !== undefined) return db.expenseCategory.where({ categoryId });

    return db.expenseCategory.orderBy("[expenseId+categoryId]");
}

// MUTATION
const addExpenseCategory = (expenseId: number, categoryId: number) => {
    //asudhausdhua é esperado um ConstraintError
    return db.expenseCategory.add({ expenseId, categoryId });
};

const deleteExpenseCategory = (expenseId: number, categoryId: number) => {
    return db.expenseCategory.where({ expenseId, categoryId }).delete();
}

const deleteCategoriesRelationsByExpense = (expenseId: number) => {
    return db.expenseCategory.where({ expenseId }).delete();
}

const deleteExpensesRelationsByCategory = (categoryId: number) => {
    return db.expenseCategory.where({ categoryId }).delete();
}

export {
    getExpenseCategory,
    getExpensesCategoriesCollection,

    addExpenseCategory,
    deleteExpenseCategory,
    deleteCategoriesRelationsByExpense,
    deleteExpensesRelationsByCategory,
}