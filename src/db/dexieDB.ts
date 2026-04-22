import type { MonthIndices } from "@/types";
import { Dexie, type EntityTable } from "dexie";

const EXPENSE_DB_NAME = "ExpensesDB";

export type Expense = {
    id: number,
    year: number,
    monthIdx: MonthIndices,
    date: Date,
    name: string,
    value: number,
};

export type Category = {
    id: number,
    name: string,

    color: string
}

export type ExpenseCategory = {
    id: number,
    expenseId: number,
    categoryId: number,
}

export type MonthSalary = {
    id: number,
    year: number,
    monthIdx: MonthIndices,

    salary: number,
};

export type InsertExpense = Omit<Expense, 'id' | 'year' | 'monthIdx'>;
export type InsertCategory = Omit<Category, 'id'>;
export type InsertExpenseCategory = Omit<ExpenseCategory, 'id'>;
export type InsertMonthSalary = Omit<MonthSalary, 'id'>;

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

export { db }
