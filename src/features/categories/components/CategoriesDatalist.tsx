import useCategories from "../hooks/useCategories";

export default function CategoriesDatalist() {
    const categories = useCategories();

    return <>
        <datalist id="categories-list">
            {categories.map((categ, idx) => <option key={`category-${idx}`} value={categ} />)}
        </datalist>
    </>
}