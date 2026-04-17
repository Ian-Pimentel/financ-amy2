type ItemProps = {
    title: string;
    action: () => void;
}

export default function MenuItem({ title, action }: ItemProps) {
    return (
        <li onClick={action} className="border-b text-xl border-(--light-border-color) cursor-pointer hover:bg-black/10 p-2">
            <span>{title}</span>
        </li>
    );
}