import "./index.css";
import useBaseSalary from "@/features/salary/hooks/useBaseSalary";
import SalaryPromptModal from "@/shared/components/MonetaryPromptModal";
import YearChanger from "./features/year/components/YearChanger";
import useYear from "./features/year/hooks/useYear";
import { MONTHS } from "./shared/constants";
import MonthWrapper from "./features/month/components/MonthWrapper";
import CategoriesDatalist from "./features/categories/components/CategoriesDatalist";
import SideMenu from "./features/sideMenu/components/SideMenu";
import Notes from "./features/notes/components/Notes";


export function App() {
  const [baseSalary, setBaseSalary] = useBaseSalary();
  const [year, setYear] = useYear();

  const needsSalary = baseSalary <= 0;

  return <>
    {needsSalary &&
      <SalaryPromptModal
        isOpen={needsSalary}
        onSave={setBaseSalary}
      />
    }

    <header className="grid grid-cols-[1fr_auto_1fr] items-center *:first:justify-self-start *:last:justify-self-end">
      <SideMenu />
      <YearChanger year={year} setYear={setYear} />
      <div />
    </header>

    <main>
      {MONTHS.map((month, monthIdx) => {
        return <MonthWrapper key={month} month={month} monthIdx={monthIdx} />
      })}
      <CategoriesDatalist />

      <Notes />
    </main>
  </>;
}



export default App;