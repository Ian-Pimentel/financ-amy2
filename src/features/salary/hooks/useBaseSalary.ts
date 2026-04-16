import { useLocalStorage } from "usehooks-ts";

const BASE_SALARY_KEY = "SALARIO_BASE";

export default function useBaseSalary() {
    return useLocalStorage(BASE_SALARY_KEY, 0);
}