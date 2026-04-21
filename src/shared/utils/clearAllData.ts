import { db } from "../../db/dexieDB";

export default async function clearAllData() {
    await db.delete({ disableAutoOpen: false });
    localStorage.clear();
    location.reload();
}