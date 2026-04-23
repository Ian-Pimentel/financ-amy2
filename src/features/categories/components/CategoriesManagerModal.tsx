import Dialog from "@/shared/components/Dialog";
import ColorPicker from "@/shared/components/ColorPicker";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import ErrorMessage from "@/shared/components/ErrorMessage";
import SwipeWrapper, { SwipeDelete } from "@/shared/components/SwipeWrapper";
import useCategoryQuery from "../hooks/useCategory";
import { addCategory, deleteCategory, getCategoryByName, updateCategory } from "@/db/repositories/categoryRepository";
import getStrongHexColor from "@/shared/utils/getHexColor";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export default function CategoriesManagerModal({ isOpen, toggleIsOpen }: Props) {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState('');

    const categories = useCategoryQuery();
    const debounced = useDebounceCallback(updateCategory, 200);

    const [name, setName] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    const clearForm = () => {
        setError('');
        setName('');
        formRef.current?.reset();
    }

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();

        if (!name) return;

        const exists = (await getCategoryByName(name)) !== undefined;

        if (exists) {
            setError(`Categoria ${name} já existe.`);
            return;
        }

        const color = getStrongHexColor(name);

        await addCategory({ name: name, color: color.color });

        clearForm();
        nameInputRef.current?.focus();
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Certeza O.o? Isso vai desvincular TODOS os gastos com esta categoria.')) {
            deleteCategory(id);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            clearForm();
            return;
        }
        nameInputRef.current?.focus();
    }, [isOpen]);

    return (
        <Dialog isOpen={isOpen} onCancel={toggleIsOpen} dismissable>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    Categorias cadastradas
                </header>

                <ul className="flex flex-col gap-1">
                    {categories?.map(category =>
                        <li key={category.id}>
                            <SwipeWrapper leftElement={<SwipeDelete />} onSwipeLeft={() => handleDelete(category.id)}>
                                <ColorPicker title={category.name} color={category.color} onChange={(color) => debounced({ ...category, color: color })} />
                            </SwipeWrapper>
                        </li>
                    )}
                </ul>

                <form onSubmit={handleSubmit} className="flex gap-2 mt-2" id="add-category-form" ref={formRef}>
                    <label className="grow border focus-border">
                        <input value={name}
                            ref={nameInputRef}
                            className="outline-none min-w-0 w-full"
                            type="text"
                            name="category-name"
                            id="add-category-name"
                            placeholder="Nova categoria"
                            required
                            onChange={(ev) => setName(ev.target.value)}
                        />
                    </label>
                    <input type="submit" form="add-category-form" value="➕" />
                </form>
                <footer className="mt-2 flex items-center">
                    {error && <ErrorMessage message={error} />}
                    <div className="ml-auto">

                        <button type="button" onClick={toggleIsOpen}>Fechar</button>
                    </div>
                </footer>
            </div>
        </Dialog >
    );
}

