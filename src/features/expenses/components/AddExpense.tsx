import { useRef, useState } from "react"
import useExpenseMutation from "../hooks/useExpenseMutation";
import useYear from "../../year/hooks/useYear";
import MonetaryInput from "@/shared/components/MonetaryInput";
import useCategoryQuery from "@/features/categories/hooks/useCategoryQuery";
import uniqolor from "uniqolor";
import { db } from "@/shared/dexieDB";

type Props = {
    monthIdx: number;
}

const mapExpenseCategory = async (expenseId: number, categoryId: number) => await db.expenseCategory.add({ expenseId, categoryId });

export default function AddExpense({ monthIdx }: Props) {
    const { createExpense } = useExpenseMutation();
    const { getCategoryByName, addCategory } = useCategoryQuery();

    const [year] = useYear();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(0);

    const nameInputRef = useRef<HTMLInputElement>(null);

    const clearForm = () => {
        setName('');
        setCategory('');
        setValue(0);

        nameInputRef.current?.focus();
    }

    const handleCreate = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        let categId = (await getCategoryByName(name))?.id;

        if (categId === undefined) {
            const color = uniqolor(name, { format: "hex", lightness: 50, saturation: 100 });

            categId = await addCategory({
                name: category,
                color: color.color
            });
        }

        const expenseId = await createExpense({
            name: name,
            value: value,
            date: new Date(year, monthIdx)
        });

        await mapExpenseCategory(expenseId, categId!);

        clearForm();
    }

    return <>
        <form onSubmit={handleCreate} className="contents *:border-(--light-border-color) *:border-[0_1_1_1]">
            <div className="flex p-1">
                <input value={name}
                    ref={nameInputRef}
                    className="w-full h-full"
                    type="text"
                    name="name"
                    id="add-expense-name"
                    placeholder="Novo gasto"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                />
                <span className="w-full h-full flex items-center before:content-['#']">
                    <input value={category}
                        className="w-full h-full placeholder:text-(--hint-color)"

                        type="text"
                        name="category"
                        placeholder="Categoria"
                        list="categories-list"
                        id="add-expense-category"

                        onChange={(ev) => setCategory(ev.target.value)}
                    />
                </span>
            </div>
            <MonetaryInput value={value}
                alignRight required
                setValue={setValue}
            />
            <input type="submit" className="cursor-pointer hidden" value="➕" />
            {/* <span className="p-1 flex justify-center items-center border-(--light-border-color) border-b">
            </span> */}
        </form>
    </>
}