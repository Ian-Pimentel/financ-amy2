type Props = {
    currency?: string;
}

export default function CurrencyTag({ currency = "R$" }: Props) {
    return (
        <div className="text-(--hint-color) mr-2">{currency}</div>
    );
}