import { useLocalStorage } from "usehooks-ts";

const YEAR_KEY = "ANO";

export default function useYear() {
    return useLocalStorage(YEAR_KEY, () => new Date().getFullYear());
}