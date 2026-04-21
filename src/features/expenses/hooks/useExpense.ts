import type { MonthIndices } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { getExpensesCollection } from "@/db/repositories/ExpenseRepository"

export default function useExpenseQuery(year?: number, monthIdx?: MonthIndices) {
    return useLiveQuery(() => getExpensesCollection(year, monthIdx).toArray(), [year, monthIdx]);
}