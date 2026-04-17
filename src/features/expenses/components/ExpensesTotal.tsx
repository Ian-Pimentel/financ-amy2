import MonetaryDisplay from "@/shared/components/MonetaryDisplay";

type Props = {
    total: number;
}

export default function ExpensesTotal({ total }: Props) {
    return <>
        <span className="p-1 font-semibold border-(--light-border-color) border-r border-b">
            Total
        </span>
        <span className="p-1 justify-end border-(--light-border-color) border-r border-b">
            <MonetaryDisplay amount={total} alignRight />
        </span>
        <span className="border-(--light-border-color) border-b"></span>
    </>;
}
