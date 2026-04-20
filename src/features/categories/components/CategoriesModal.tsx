import Dialog from "@/shared/components/Dialog";
import useCategoryQuery from "../hooks/useCategoryQuery";
import uniqolor from 'uniqolor';
import ColorPicker from "@/shared/components/ColorPicker";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

type Props = {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

export default function CategoriesModal({ isOpen, toggleIsOpen }: Props) {
    const { categories, addCategory, editCategory, error } = useCategoryQuery();
    const debounced = useDebounceCallback(editCategory, 200)

    const [name, setName] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (ev: React.SubmitEvent) => {
        ev.preventDefault();
        const color = uniqolor(name, { format: "hex", lightness: 50, saturation: 100 });
        addCategory({ name: name, color: color.color });

        setName('');
        nameInputRef.current?.focus();
    }

    const handleCancel = () => {
        setName('');
        toggleIsOpen();
    }

    useEffect(() => {
        nameInputRef.current?.focus();
    }, [isOpen]);

    return <>
        <Dialog isOpen={isOpen} onCancel={handleCancel} dismissable>
            <div className="bg-(--bg-color) w-[90vw] md:w-[50vw] lg:w-[40vw] p-2 rounded-xl border">
                <header className="text-xl font-semibold mb-2">
                    Categorias cadastradas
                </header>

                <ul className="flex flex-col gap-1">
                    {categories?.map(category =>
                        <li key={category.id}>
                            <ColorPicker rtl title={category.name} color={category.color} onChange={(color) => debounced({ ...category, color: color })} />
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
                    {error && <span className="text-red-600 line-clamp-1">{error}</span>}
                    <button type="button" className="button ml-auto" onClick={toggleIsOpen}>Fechar</button>
                </footer>
            </div>
        </Dialog>
    </>
} 