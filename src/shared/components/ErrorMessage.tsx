export default function ErrorMessage({ message }: { message: string }) {
    return <span className="text-red-600 text-sm">{message}</span>;
}