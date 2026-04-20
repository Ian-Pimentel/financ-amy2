export default function GridRow({ children }: React.PropsWithChildren) {
    return <>
        <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
            {children}
        </div>
    </>
}