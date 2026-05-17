import { getDecimalCount } from "@/shared/utils/getDecimalCount";

type Props = {
    value?: number;
    required?: boolean;
    setValue: (value: number) => void;
    onBlur?: (value: number) => void;
    alignRight?: boolean;
}

export default function MonetaryInput({ value, required = false, setValue, onBlur, alignRight = false }: Props) {
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (Number.isNaN(ev.target.valueAsNumber) || getDecimalCount(ev.target.value) > 2) return;
        setValue(ev.target.valueAsNumber);
    };

    return (
        <input
            type="number"

            min={1}
            step={0.01}

            value={value || ""}
            onChange={handleChange}
            placeholder="1500.00"

            className={"outline-none min-w-0 flex-1 " + (alignRight && "text-right")}
            onBlur={onBlur ? (ev) => onBlur(ev.target.valueAsNumber) : undefined}
            required={required}
        />
    );
}