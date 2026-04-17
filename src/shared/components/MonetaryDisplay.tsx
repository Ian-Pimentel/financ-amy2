type Props = {
    amount?: number;
    currency?: string;
    alignRight?: boolean;
}

export default function MonetaryDisplay({ amount, currency = "R$", alignRight = false }: Props) {
    const negative = amount !== undefined && amount < 0;

    const css = () => {
        const className = `${alignRight && "text-right"} ${negative && "text-red-600"}` + " ";
        return className;
    }

    return <>
        <label className="flex items-center ">
            <span className={"text-(--hint-color) " + (!alignRight && "mr-1")}>{currency}</span>
            <span className={css() + "grow"}>{amount !== undefined ? amount.toFixed(2) : "-"}</span>
        </label>
    </>;
}