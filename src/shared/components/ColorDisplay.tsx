
type Props = {
    color: string;
    title?: boolean | string;
    rtl?: boolean;
} & React.PropsWithChildren;

export default function ColorDisplay({ color, title = true, rtl = false, children }: Props) {
    let label;

    if (title === true) label = <span className={`grow ${rtl && 'text-left'}`}>{color}</span>;
    else if (title === false) label = undefined;
    else label = <span className={`grow ${rtl && 'text-left'}`}>{title}</span>;

    return <>
        <label className="button focus-border flex! items-center">
            {children}
            <span className={`flex flex-1 gap-1 ${rtl && 'flex-row-reverse'}`}>
                <div className={`w-6 rounded-md`} style={{ backgroundColor: color }}></div>
                {label}
            </span>
        </label>
    </>;
}