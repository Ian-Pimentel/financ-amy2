import type { MonthIndices } from "@/types";
import { Dexie, type DBCoreMutateRequest, type EntityTable, type Table, type TransactionMode } from "dexie";

const EXPENSE_DB_NAME = "ExpensesDB";

type Expense = {
    id: number,
    year: number,
    monthIdx: MonthIndices,
    date: Date,
    name: string,
    value: number,
};

type Category = {
    id: number,
    name: string,

    color: string
}

type ExpenseCategory = {
    id: number,
    expenseId: number,
    categoryId: number,
}

type MonthSalary = {
    id: number,
    year: number,
    monthIdx: MonthIndices,

    salary: number,
};

type InsertExpense = Omit<Expense, 'id' | 'year' | 'monthIdx'>;
type InsertCategory = Omit<Category, 'id'>;
type InsertMonthSalary = Omit<MonthSalary, 'id'>;

type ExpenseTable = EntityTable<Expense, "id", InsertExpense>;
type CategoryTable = EntityTable<Category, "id", InsertCategory>;
type ExpenseCategoryTable = EntityTable<ExpenseCategory, "id">;
type MonthSalaryTable = EntityTable<MonthSalary, "id", InsertMonthSalary>;

const db = new Dexie(EXPENSE_DB_NAME) as Dexie & {
    expenses: ExpenseTable,
    categories: CategoryTable,
    expenseCategory: ExpenseCategoryTable,
    monthSalaries: MonthSalaryTable,
};

db.version(1).stores({
    expenses: "++id, [year+monthIdx], year, monthIdx, date, name, value, category",
    categories: "++id, &name",
    expenseCategory: "++id, [expenseId+categoryId], [categoryId+expenseId], expenseId, categoryId",

    monthSalaries: "++id, [year+monthIdx], year, salary",
});

// lambda nn tem acesso aos callbacks, pois nn herda o this.
db.expenses.hook('creating', (key, expense, trans) => {
    expense.year = expense.date.getFullYear();
    expense.monthIdx = expense.date.getMonth();
});

db.expenses.hook('updating', (modifications) => {
    const mods = modifications as Expense;
    if (mods.hasOwnProperty('date') && mods.date instanceof Date) {
        return {
            year: mods.date.getFullYear(),
            monthIdx: mods.date.getMonth()
        };
    }
});

export type {
    MonthSalary,
    Expense, Category,
    InsertExpense, InsertCategory,
    InsertMonthSalary
}
export { db }
