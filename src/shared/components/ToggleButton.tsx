import { useState } from "react";

type Props = {
    isActive: boolean,
    toggleActive: () => void;
    required?: boolean;
} & React.PropsWithChildren

export default function ToggleButton({ isActive, toggleActive, children, required }: Props) {
    return <>
        <label className={"inline-block button " + (isActive && "bg-(--font-color) text-(--bg-color) font-semibold")}>
            <input type="checkbox" className="hidden" checked={isActive} required={required} onChange={toggleActive} />
            {children}
        </label>
    </>;
}