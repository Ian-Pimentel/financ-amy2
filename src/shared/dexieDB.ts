import type { MonthIndices } from "@/types";
import { Dexie, type EntityTable, type Table, type TransactionMode } from "dexie";

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

const db = new Dexie(EXPENSE_DB_NAME) as Dexie & {
    expenses: EntityTable<Expense, "id", InsertExpense>,
    categories: EntityTable<Category, "id", InsertCategory>,
    expenseCategory: EntityTable<ExpenseCategory>
    monthSalaries: EntityTable<MonthSalary, "id", InsertMonthSalary>,
};

// Usar isso aqui para fazer a validação ao invés do hooks?
// db.use({
//     stack: "dbcore",
//     name: "MyMiddleware",
//     create(downlevelDatabase) {
//         return {
//             ...downlevelDatabase,
//             table(tableName) {
//                 const downlevelTable = downlevelDatabase.table(tableName);
//                 return {
//                     ...downlevelTable,
//                     query(req) {
//                         // console.log(`Querying ${tableName}`, req);
//                         return downlevelTable.query(req);
//                     },
//                     mutate(req) {
//                         console.log(`Mutating ${tableName}`, req);
//                         return downlevelTable.mutate(req);
//                     }
//                 };
//             }
//         };
//     }
// });

db.version(1).stores({
    expenses: "++id, [year+monthIdx], date, name, value, category",
    categories: "++id, &name",
    expenseCategory: "  [expenseId+categoryId], [categoryId+expenseId], expenseId, categoryId",

    monthSalaries: "++id, [year+monthIdx], salary",
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

// monta a query, mas é lazy. dá pra reutilizar
export function getExpensesCollection(year?: number, monthIdx?: number) {
    if (year !== undefined) {
        if (monthIdx !== undefined) {
            return db.expenses.where('[year+monthIdx]').equals([year, monthIdx]);
        }
        return db.expenses.where('[year+monthIdx]').between([year, 0], [year, 11], true, true);
    }

    return db.expenses.orderBy("[year+monthIdx]");
}

export type {
    MonthSalary,
    Expense, Category,
    InsertExpense, InsertCategory,
    InsertMonthSalary
}
export { db }
