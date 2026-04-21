import { useLocalStorage } from "usehooks-ts";

const NOTE_KEY = "NOTAS";

export default function useNotes() {
    return useLocalStorage(NOTE_KEY, '');
}