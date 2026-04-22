import { getExpensesCollection } from "@/db/repositories/expenseRepository";
import type { MonthIndices } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";

export default function useExpenseQuery(year?: number, monthIdx?: MonthIndices) {
    return useLiveQuery(() => getExpensesCollection(year, monthIdx).toArray(), [year, monthIdx]);
}