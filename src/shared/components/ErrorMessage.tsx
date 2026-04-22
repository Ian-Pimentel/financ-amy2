export default function ErrorMessage({ message }: { message: string }) {
    return <span className="text-red-500 text-sm">{message}</span>;
}