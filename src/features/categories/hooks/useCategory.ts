import { getCategoriesCollection } from "@/db/repositories/categoryRepository";
import { useLiveQuery } from "dexie-react-hooks";

export default function useCategoryQuery(qName?: string) {
    return useLiveQuery(() => getCategoriesCollection(qName).toArray(), [qName]);
}