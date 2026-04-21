import Dialog from "@/shared/components/Dialog";
import uniqolor from 'uniqolor';
import ColorPicker from "@/shared/components/ColorPicker";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import ErrorMessage from "@/shared/components/ErrorMessage";
import SwipeWrapper, { SwipeDelete } from "@/shared/components/SwipeWrapper";
import useExpenseCategoryQuery from "@/features/expenseCategory/useExpenseCategory";
import useCategoryQuery from "../hooks/useCategory";
import { addCategory, deleteCategory, getCategoryByName, updateCategory } from "@/db/repositories/CategoryRepository";
import Dexie from "dexie";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export default function CategoriesManagerModal({ isOpen, toggleIsOpen }: Props) {
    const [error, setError] = useState('');

    const categories = useCategoryQuery();
    const debounced = useDebounceCallback(updateCategory, 200);

    const [name, setName] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        const exists = (await getCategoryByName(name)) !== undefined;

        if (exists) {
            setError(`Categoria ${name} já existe.`);
            return;
        }

        const color = uniqolor(name, { format: "hex", lightness: 50, saturation: 100 });
        await addCategory({ name: name, color: color.color });

        setError('');
        setName('');
        nameInputRef.current?.focus();
    }

    const handleDelete = (id: number) => {
        console.log('init delete');
        if (window.confirm('Certeza O.o? Isso vai desvincular TODOS os gastos com esta categoria.')) {
            deleteCategory(id);
            console.log('deleted sucessfully');
            return;
        }
        console.log('delete canceled');
    };

    useEffect(() => {
        if (isOpen) {
            setName('');
            setError('');
            nameInputRef.current?.focus();
        }
    }, [isOpen]);

    return <>
        <Dialog isOpen={isOpen} onCancel={toggleIsOpen} dismissable>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    Categorias cadastradas
                </header>

                <ul className="flex flex-col gap-1">
                    {categories?.map(category =>
                        <li key={category.id}>
                            <SwipeWrapper leftElement={<SwipeDelete />} onSwipeLeft={() => handleDelete(category.id)}>
                                <ColorPicker rtl title={category.name} color={category.color} onChange={(color) => debounced({ ...category, color: color })} />
                            </SwipeWrapper>
                        </li>
                    )}
                </ul>

                <form onSubmit={handleSubmit} className="flex gap-2 mt-2" id="add-category-form">
                    <fieldset className="flex-1">
                        <div className="button focus-within:border-(--focus-color)">
                            <input value={name}
                                ref={nameInputRef}
                                className="outline-none min-w-0 w-full"
                                type="text"
                                name="category-name"
                                id="add-category-name"
                                placeholder="Nova categoria"
                                autoFocus={true}
                                required
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                    </fieldset>
                    <input type="submit" form="add-category-form" className="button" value="➕" />
                </form>
                <footer className="mt-2">
                    {error && <ErrorMessage message={error} />}
                    <button type="button" className="button ml-auto" onClick={toggleIsOpen}>Fechar</button>
                </footer>
            </div>
        </Dialog>
    </>
}

