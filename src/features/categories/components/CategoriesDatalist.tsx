import useCategoryQuery from "../hooks/useCategory";

export default function CategoriesDatalist() {
    const categories = useCategoryQuery();

    return <>
        <datalist id="categories-list">
            {categories?.map(categ => <option key={`category-${categ.id}`} value={categ.name} />)}
        </datalist>
    </>
}