type Props = {
    value: number;
    required?: boolean;
    setValue: (value: number) => void;
    onBlur?: (value: number) => void;
    currency?: string;
    alignRight?: boolean;
}

export default function MonetaryInput({ value, required = false, setValue, onBlur, currency = "R$", alignRight = false }: Props) {
    return (
        <label className="flex items-center">
            <span className="text-(--hint-color)">{currency}</span>
            <input
                type="number"

                min={1}
                step={0.01}

                value={value}
                onChange={ev => setValue(ev.target.valueAsNumber)}
                placeholder="1500.00"

                className={"outline-none min-w-0 flex-1 " + (alignRight && "text-right")}
                onBlur={onBlur ? (ev) => onBlur(ev.target.valueAsNumber) : undefined}
                required={required}
            />
        </label>
    );
}