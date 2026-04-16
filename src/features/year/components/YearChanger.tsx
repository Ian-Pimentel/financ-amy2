type Props = {
    year: number;
    setYear: (year: number) => void;
}

export default function YearChanger({ year, setYear }: Props) {

    return <>
        <div className="flex justify-center items-center gap-2">
            <button type="button" className="button" onClick={() => setYear(year - 1)}>{year - 1}</button>
            <span>{year}</span>
            <button type="button" className="button" onClick={() => setYear(year + 1)}>{year + 1}</button>
        </div>
    </>;
}