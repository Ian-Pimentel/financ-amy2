import { useState } from "react";

type Props = {
    isActive: boolean,
    toggleActive: () => void;
    required?: boolean;
} & React.PropsWithChildren

export default function ToggleButton({ isActive, toggleActive, children, required }: Props) {
    return (
        <label role="button" className="inline-block">
            {children}
            <input type="checkbox"
                checked={isActive} required={required} onChange={toggleActive}
                className="sr-only peer"
            />
        </label>
    );
}