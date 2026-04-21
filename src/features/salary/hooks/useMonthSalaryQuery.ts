import { getMonthSalary } from "@/db/repositories/monthSalaryRepository";
import { useLiveQuery } from "dexie-react-hooks";

export default function useMonthSalaryQuery(year: number, monthIdx: number) {
    return useLiveQuery(() => getMonthSalary(year, monthIdx),
        [year, monthIdx]
    );
}