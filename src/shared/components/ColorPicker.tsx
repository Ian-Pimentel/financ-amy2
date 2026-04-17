type Props = {
    color: string;
    onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: Props) {
    return <>
        <label className="button focus-within:border-(--focus-color)">
            <span className="flex gap-1">
                <div className={`w-1/3`} style={{ backgroundColor: color }}></div>
                <div>{color}</div>
                <input type="color" name="theme-picker" className="w-0 h-0 outline-none" value={color} onChange={(ev) => onChange(ev.target.value)} />
            </span>
        </label>
    </>;
}