import { db, type InsertMonthSalary, type MonthSalary } from "../dexieDB";

// QUERY
const getMonthSalary = (year: number, monthIdx: number) => db.monthSalaries.where('[year+monthIdx]').equals([year, monthIdx]).first();

// MUTATION
const addMonthSalary = (ms: InsertMonthSalary) => db.monthSalaries.add(ms);

const putMonthSalary = (ms: MonthSalary) => db.monthSalaries.put(ms);

const updateMonthSalary = (ms: MonthSalary) => {
    const { id, ...changes } = ms;
    return db.monthSalaries.update(id, changes);
}

const deleteMonthSalary = (id: number) => db.monthSalaries.delete(id);

export {
    getMonthSalary,

    addMonthSalary,
    putMonthSalary,
    updateMonthSalary,
    deleteMonthSalary,
};