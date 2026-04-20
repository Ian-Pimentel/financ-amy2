import { db, type InsertMonthSalary, type MonthSalary } from "@/shared/dexieDB";

export default function useMonthSalaryMutation() {

    const addMonthSalary = async (ms: InsertMonthSalary) => await db.monthSalaries.add(ms);

    const putMonthSalary = async (ms: MonthSalary) => await db.monthSalaries.put(ms);

    const editMonthSalary = async (ms: MonthSalary) => {
        const { id, ...changes } = ms;
        return await db.monthSalaries.update(id, changes);
    }

    const deleteMonthSalary = async (id: number) => await db.monthSalaries.delete(id);

    return {
        addMonthSalary,
        putMonthSalary,
        editMonthSalary,
        deleteMonthSalary
    }
}