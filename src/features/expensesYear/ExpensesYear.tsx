import { useModals } from "@/shared/components/ModalContext";
import useBaseSalary from "../salary/hooks/useBaseSalary";
import { useEffect } from "react";
import type { MonthIndices } from "@/types";
import MonthWrapper from "../month/components/MonthWrapper";
import CategoriesDatalist from "../categories/components/CategoriesDatalist";
import Notes from "../notes/components/Notes";
import ToggleButton from "@/shared/components/ToggleButton";
import useYear from "../year/hooks/useYear";
import YearChanger from "../year/components/YearChanger";
import { MONTHS } from "@/shared/constants";

export default function ExpensesYear() {
    const [baseSalary, setBaseSalary] = useBaseSalary();
    const { openMonetaryPromptModal } = useModals();

    const needsSalary = baseSalary <= 0;

    useEffect(() => {
        if (needsSalary) openMonetaryPromptModal({
            onSave(amount) {
                setBaseSalary(amount);
            },
            title: "Informe seu salário."
        });
    }, []);

    return !needsSalary && (<>
        <TopBar />
        <main>
            {MONTHS.map((month, monthIdx: MonthIndices) => {
                return <MonthWrapper key={month} monthIdx={monthIdx} />
            })}

            <CategoriesDatalist />
            <Notes />
        </main>
    </>
    );
}

function TopBar() {
    const { isMenuOpen, toggleMenuIsOpen } = useModals();
    const [year, setYear] = useYear();

    return (
        <header className="grid grid-cols-[1fr_auto_1fr] items-center *:first:justify-self-start *:last:justify-self-end">
            <ToggleButton isActive={isMenuOpen} toggleActive={toggleMenuIsOpen}>
                <div className="text-lg transition-transform ease-out duration-400 has-[+:checked]:rotate-180">⚙️</div>
            </ToggleButton>
            <YearChanger year={year} setYear={setYear} />
            <div />
        </header>

    );
}