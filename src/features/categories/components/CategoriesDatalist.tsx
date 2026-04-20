import useCategoryQuery from "../hooks/useCategoryQuery";

export default function CategoriesDatalist() {
    const { categories } = useCategoryQuery();

    return <>
        <datalist id="categories-list">
            {categories?.map(categ => <option key={`category-${categ.id}`} value={categ.name} />)}
        </datalist>
    </>
}