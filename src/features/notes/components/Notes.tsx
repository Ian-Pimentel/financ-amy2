import useNotes from "../hooks/useNotes";

export default function Notes() {
    const [notes, setNotes] = useNotes();

    return <div className="p-1 ">
        <header className="text-lg font-semibold">
            Notas
        </header>
        <textarea
            className="w-full min-h-24 max-h-40 whitespace-pre-wrap field-sizing-content"
            name="notes"
            value={notes} onChange={ev => setNotes(ev.target.value)}
        />
    </div>;
}