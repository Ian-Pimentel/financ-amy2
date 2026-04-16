import { db, getExpensesCollection } from "@/shared/dexieDB";
import type { MonthIndices } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";

type Filters = { year?: number; monthIdx?: MonthIndices };

export default function useExpenseQuery({ year, monthIdx }: Filters) {
    const expenses = useLiveQuery(() => {
        return getExpensesCollection(year, monthIdx).toArray();
    }, [year, monthIdx]);

    // const isLoading = !expenses;

    return { expenses };
}