type Props = {
    color: string;
    title?: boolean | string;
    autoFocus?: boolean;

    onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange, title = true, autoFocus = false }: Props) {
    let label;

    if (title === true) label = <span className={`flex-1`}>{color}</span>;
    else if (title === false) label = undefined;
    else label = <span className={`flex-1`}>{title}</span>;



    return (
        <label role="button" className="flex">
            <span className="block grow">{label}</span>
            <input type="color" className="basis-0"
                autoFocus={autoFocus}
                name="theme-picker"
                value={color} onChange={(ev) => onChange(ev.target.value)}
            />
        </label>
    );
}