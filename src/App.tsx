import "./index.css";
import useBaseSalary from "@/features/salary/hooks/useBaseSalary";
import SalaryPromptModal from "@/features/salary/components/SalaryPromptModal";
import YearChanger from "./features/year/components/YearChanger";
import useYear from "./features/year/hooks/useYear";
import { MONTHS } from "./shared/constants";
import MonthWrapper from "./features/month/MonthWrapper";
import CategoriesDatalist from "./features/categories/components/CategoriesDatalist";

export function App() {
  const [baseSalary, setBaseSalary, removeBaseSalary] = useBaseSalary();
  const [year, setYear] = useYear();

  const needsSalary = baseSalary <= 0;
  if (needsSalary) return (
    <SalaryPromptModal
      isOpen={needsSalary}
      onSave={setBaseSalary}
    />
  );

  return <>
    <YearChanger year={year} setYear={setYear} />

    <div>Salário: {baseSalary}</div>
    <button type="button" className="button" onClick={() => removeBaseSalary()}>Limpar Salário</button>


    {MONTHS.map((month, monthIdx) => {
      return <MonthWrapper key={month} month={month} monthIdx={monthIdx} />
    })}

    <CategoriesDatalist />
  </>;
}

export default App;