import getStrongHexColor from "@/shared/utils/getHexColor";
import { db, type Category, type InsertCategory } from "../dexieDB";
import { deleteExpensesRelationsByCategory, getExpensesCategoriesCollection } from "./expenseCategoryRepository";

// QUERY
const getCategoriesCollection = (qName?: string) => {
    if (qName) return db.categories.where('name').startsWithIgnoreCase(qName);
    return db.categories.orderBy("name");
}
const getCategory = (id: number) => db.categories.get(id);

const getCategoryByName = (name: string) => db.categories.where({ name }).first();

const getCategoryByExpense = async (expenseId: number) => {
    const expenseFirstCategory = await getExpensesCategoriesCollection(expenseId).first();

    if (!expenseFirstCategory) return;

    return await getCategory(expenseFirstCategory.categoryId);
}

// MUTATION

// esperado um ConstraintError
const addCategory = async (newCategory: InsertCategory) => {
    try {
        return await db.categories.add(newCategory);
    } catch (error) {
        console.error(error);
    }
}
const getOrAddCategoryByName = async (name: string) => {
    if (name) {
        let categoryId = (await getCategoryByName(name))?.id;
        if (categoryId === undefined) {
            const color = getStrongHexColor(name);
            categoryId = await addCategory({ name: name, color: color.color });
        }
        return categoryId;
    }
}

const updateCategory = async (category: Category) => {
    const { id, ...changes } = category;
    return db.categories.update(id, changes);
};

const deleteCategory = async (categoryId: number) => {
    db.transaction('rw', [db.categories, db.expenseCategory], async () => {
        await deleteExpensesRelationsByCategory(categoryId);
        await db.categories.delete(categoryId);
    })
};


export {
    getCategoriesCollection,
    getCategory,
    getCategoryByName,
    getCategoryByExpense,

    addCategory,
    getOrAddCategoryByName,
    updateCategory,
    deleteCategory,
}