import type { Month, MonthIndices } from "@/types";
import useBaseSalary from "../../salary/hooks/useBaseSalary";
import useYear from "../../year/hooks/useYear";
import ExpenseList from "../../expenses/components/ExpenseList";
import useExpenseQuery from "../../expenses/hooks/useExpense";
import MonetaryDisplay from "@/shared/components/MonetaryDisplay";
import { useToggle } from "usehooks-ts";
import MonetaryPromptModal from "@/shared/components/MonetaryPromptModal";
import useMonthSalaryQuery from "@/features/salary/hooks/useMonthSalaryQuery";
import GridRow from "@/shared/components/GridRow";
import AddExpense from "@/features/expenses/components/AddExpense";
import ExpensesTotal from "@/features/expenses/components/ExpensesTotal";
import { addMonthSalary, putMonthSalary } from "@/db/repositories/monthSalaryRepository";

type Props = {
    month: Month;
    monthIdx: MonthIndices;
}

export default function MonthWrapper({ month, monthIdx }: Props) {
    const [year] = useYear();
    const [baseSalary] = useBaseSalary();

    const expenses = useExpenseQuery(year, monthIdx);
    const monthSalary = useMonthSalaryQuery(year, monthIdx);

    const [open, toggleOpen] = useToggle(monthIdx === (new Date).getMonth());

    // MODAIS
    const [isSalaryModalOpen, toggleSalaryModal] = useToggle(false);

    if (!expenses) return <div>Carregando {month}...</div>;

    const salary = monthSalary?.salary || baseSalary;
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.value, 0);
    const totalSaved = salary - totalSpent;
    const monthName = month.charAt(0) + month.slice(1).toLowerCase();

    const handleOpen = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === "Enter") {
            ev.preventDefault();
            toggleOpen();
        }
    };

    const handlePutMonthSalary = (value: number) => {
        if (monthSalary) putMonthSalary({ ...monthSalary, salary: value });
        else {
            const newMonthSalary = { year: year, monthIdx: monthIdx, salary: value };
            addMonthSalary(newMonthSalary);
        }
        toggleSalaryModal();
    }

    return <>
        <div className={`${open && "my-1"}`}>
            <div tabIndex={0} className="flex cursor-pointer!" onClick={toggleOpen} onKeyUp={handleOpen}>
                <div className={`mr-1 ${open && "rotate-90"}`}>{">"}</div>
                <div className={`grow ${open && "text-xl font-semibold"}`} >{month}</div>
                <span onClick={(ev) => { ev.stopPropagation(); toggleSalaryModal() }}>
                    <MonetaryDisplay amount={totalSaved} />
                </span>
            </div>
            {open &&
                <div className="md:px-4">
                    <ExpenseList expenses={expenses} />
                    <GridRow>
                        <AddExpense monthIdx={monthIdx} />
                    </GridRow>
                    <GridRow>
                        <ExpensesTotal total={totalSpent} />
                    </GridRow>
                </div>
            }

            <MonetaryPromptModal isOpen={isSalaryModalOpen} onSave={handlePutMonthSalary} initialValue={salary} onCancel={toggleSalaryModal} title={`Salário no mês de ${monthName}`} />
        </div>
    </>
}