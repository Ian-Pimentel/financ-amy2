import { db, type Category, type InsertCategory } from "../dexieDB";

// QUERY
const getCategoriesCollection = (qName?: string) => {
    if (qName) return db.categories.where('name').startsWithIgnoreCase(qName);
    return db.categories.orderBy("name");
}
const getCategory = (id: number) => db.categories.get(id);
const getCategoryByName = (name: string) => db.categories.where({ name }).first();

// MUTATION

// esperado um ConstraintError
const addCategory = async (newCategory: InsertCategory) => {
    try {
        await db.categories.add(newCategory);
    } catch (error) {
        console.error(error);
    }
}

const updateCategory = async (category: Category) => {
    const { id, ...changes } = category;
    return db.categories.update(id, changes);
};

const deleteCategory = async (id: number) => db.categories.delete(id);


export {
    getCategoriesCollection,
    getCategory,
    getCategoryByName,

    addCategory,
    updateCategory,
    deleteCategory,
}