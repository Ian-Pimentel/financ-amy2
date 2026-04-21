import MonetaryDisplay from "@/shared/components/MonetaryDisplay";

type Props = {
    total: number;
}

export default function ExpensesTotal({ total }: Props) {
    return <div className="contents *:border-(--light-border-color) *:border-[0_1_1_1] *:p-1 *:md:px-2">
        <span className="font-semibold ">
            Total
        </span>
        <span className="justify-end">
            <MonetaryDisplay amount={total} alignRight />
        </span>
        {/* <span className="border-(--light-border-color) border-b"></span> */}
    </div>;
}
