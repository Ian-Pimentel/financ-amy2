import { useEffect, useState } from "react";

type Props = {
    amount: number;
    required?: boolean;
    onChange: (value: number) => void;
    onBlur?: (value: number) => void;
    currency?: string;
    alignRight?: boolean;
}

export default function MonetaryInput({ amount, required = false, onChange, onBlur, currency = "R$", alignRight = false }: Props) {

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = ev.target.valueAsNumber
        if (!Number.isNaN(value)) {
            onChange(value);
        };
    }

    return <>
        <label className="flex items-center ">
            <span className="text-(--hint-color) mx-1">{currency}</span>
            <input
                type="number"

                min={1}
                step={0.01}

                value={Number.isNaN(amount) ? (required ? 0 : '') : amount}
                onChange={handleChange}
                placeholder="1500.00"

                className={"outline-none min-w-0 " + (alignRight && "text-right")}
                onBlur={onBlur ? (ev) => onBlur(ev.target.valueAsNumber) : undefined}
                required={required}
            />
        </label>
    </>;
}