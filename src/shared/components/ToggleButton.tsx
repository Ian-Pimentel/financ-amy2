import { useState } from "react";

type Props = {
    isActive: boolean,
    toggleActive: () => void;
    required?: boolean;
} & React.PropsWithChildren

export default function ToggleButton({ isActive, toggleActive, children, required }: Props) {
    return (
        <label className={"button " + (isActive && "bg-(--focus-color) text-(--font-color) font-semibold")}>
            <input type="checkbox" className="hidden" checked={isActive} required={required} onChange={toggleActive} />
            {children}
        </label>
    );
}