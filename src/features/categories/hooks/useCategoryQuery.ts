import { db, type Category, type InsertCategory } from "@/shared/dexieDB";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";


export default function useCategoryQuery() {
    const categories = useLiveQuery(() => db.categories.toArray());
    const [error, setError] = useState('');

    const getCategory = async (id: number) => await db.categories.where('id').equals(id).first();

    const getCategoryByName = async (name: string) => await db.categories.where('name').equals(name).first();

    const addCategory = async (newCategory: InsertCategory) => await db.transaction('rw', db.categories,
        async () => {
            try {
                const res = await db.categories.add(newCategory);
                setError('');
                return res;
            } catch (err) {
                if (err instanceof Dexie.DexieError) {
                    setError('Categoria já existe.');
                } else {
                    console.error("Other error", err);
                }
            }
        }
    );

    const editCategory = async (category: Category) => {
        const { id, ...changes } = category;
        await db.transaction('rw', db.categories, async () => {
            await db.categories.update(id, changes);
        })
    };

    const deleteCategory = async (id: number) => await db.transaction('rw', db.categories, async () => {
        await db.categories.delete(id);
    });

    return { categories, addCategory, editCategory, deleteCategory, error, getCategoryByName, getCategory };
}