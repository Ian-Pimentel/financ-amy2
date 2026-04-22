import Dialog from "./Dialog";

export default function FallbackModal({ title }: { title: string }) {
    return (
        <Dialog isOpen>
            <div className="bg-(--bg-color) p-2">
                <header className="text-xl font-semibold mb-2">
                    {title}
                </header>
            </div>
        </Dialog>
    )
}