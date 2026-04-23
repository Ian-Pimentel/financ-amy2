type Props = {
    value?: number;
    required?: boolean;
    setValue: (value: number) => void;
    onBlur?: (value: number) => void;
    alignRight?: boolean;
}

export default function MonetaryInput({ value, required = false, setValue, onBlur, alignRight = false }: Props) {
    return (
        <input
            type="number"

            min={1}
            step={0.01}

            value={value || ""}
            onChange={ev => setValue(ev.target.valueAsNumber)}
            placeholder="1500.00"

            className={"outline-none min-w-0 flex-1 " + (alignRight && "text-right")}
            onBlur={onBlur ? (ev) => onBlur(ev.target.valueAsNumber) : undefined}
            required={required}
        />
    );
}