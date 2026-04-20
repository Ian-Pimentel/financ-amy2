import { db } from "@/shared/dexieDB";
import { useLiveQuery } from "dexie-react-hooks";

export default function useMonthSalaryQuery(year: number, monthIdx: number) {
    const monthSalary = useLiveQuery(
        () => db.monthSalaries.where('[year+monthIdx]').equals([year, monthIdx]).first(),
        [year, monthIdx]
    );

    return {
        monthSalary,
    }
}