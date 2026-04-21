import { getExpensesCategoriesCollection } from "@/db/repositories/expenseCategoryRepository";
import { useLiveQuery } from "dexie-react-hooks";

type Filters = { expenseId?: number, categoryId?: number }

export default function useExpenseCategoryQuery({ expenseId, categoryId }: Filters) {
    return useLiveQuery(() => getExpensesCategoriesCollection(expenseId, categoryId).toArray(), [expenseId, categoryId]);
}