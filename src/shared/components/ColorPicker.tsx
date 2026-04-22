type Props = {
    color: string;
    title?: boolean | string;
    rtl?: boolean;
    autoFocus?: boolean;

    onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange, title = true, rtl = false, autoFocus = false }: Props) {
    let label;

    if (title === true) label = <span className={`flex-1 ${rtl && 'text-left'}`}>{color}</span>;
    else if (title === false) label = undefined;
    else label = <span className={`flex-1 ${rtl && 'text-left'}`}>{title}</span>;

    return (
        <label className="button focus-within:border-(--focus-color)">
            <span className={`flex gap-1 ${rtl && 'flex-row-reverse'}`}>
                <div className={`w-6 rounded-md`} style={{ backgroundColor: color }}></div>
                <input
                    type="color" autoFocus={autoFocus}
                    name="theme-picker"
                    className="sr-only"
                    value={color} onChange={(ev) => onChange(ev.target.value)}
                />
                {label}
            </span>

        </label>
    );
}