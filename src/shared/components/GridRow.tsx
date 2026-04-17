export default function GridRow({ children }: React.PropsWithChildren) {
    return <>
        <div className="grid grid-cols-[minmax(0,8fr)_minmax(0,3fr)_minmax(0,2fr)]">
            {children}
        </div>
    </>
}