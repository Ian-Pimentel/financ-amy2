import { db } from "@/shared/dexieDB";
import type { Month, MonthIndices } from "@/types";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import useBaseSalary from "../salary/hooks/useBaseSalary";
import useYear from "../year/hooks/useYear";
import ExpenseList from "../expenses/ExpenseList";
import useExpenseQuery from "../expenses/hooks/useExpenseQuery";

type Props = {
    month: Month;
    monthIdx: MonthIndices;
}

export default function MonthWrapper({ month, monthIdx }: Props) {
    const [salary] = useBaseSalary();
    const [year] = useYear();

    const { expenses } = useExpenseQuery({ year, monthIdx });

    const [open, setOpen] = useState(() => monthIdx === (new Date).getMonth());

    const toggleOpen = () => setOpen(!open);
    const handleOpen = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === "Enter") {
            ev.preventDefault();
            toggleOpen();
        }
    };

    if (!expenses) return <div>Carregando {month}...</div>;

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.value, 0);
    const totalSaved = salary - totalSpent;

    return <>
        <div>
            <div tabIndex={0} className="flex cursor-pointer" onClick={toggleOpen} onKeyUp={handleOpen}>
                <div className={`${open && "rotate-90"} align-middle`}>{">"}</div>
                <div className='grow'>{month}</div>
                <div className={`${(totalSaved < 0) && 'text-red-400'} text-right before:content-['R$_'] before:text-(--hint-color)`}>{(totalSaved).toFixed(2)}</div>
            </div>
            {open && <ExpenseList expenses={expenses} monthIdx={monthIdx} />}
        </div>
    </>
}