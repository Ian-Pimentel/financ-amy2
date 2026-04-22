import { useEffect } from "react";
import CategoriesDatalist from "./features/categories/components/CategoriesDatalist";
import Notes from "./features/notes/components/Notes";
import useBaseSalary from "./features/salary/hooks/useBaseSalary";
import YearChanger from "./features/year/components/YearChanger";
import useYear from "./features/year/hooks/useYear";
import "./index.css";
import { useModals } from "./shared/components/ModalContext";
import ToggleButton from "./shared/components/ToggleButton";
import MonthWrapper from "./features/month/components/MonthWrapper";
import { MONTHS } from "./shared/constants";
import type { MonthIndices } from "./types";

// teste dippozz

export function App() {
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

  return (<>
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
        <div className="text-lg">⚙️</div>
      </ToggleButton>
      <YearChanger year={year} setYear={setYear} />
      <div />
    </header>

  );
}

export default App;