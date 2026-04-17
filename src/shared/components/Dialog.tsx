import { useEffect, useRef } from "react";

type DialogModalProps = {
    isOpen: boolean,
    onClose?: () => void,
    onCancel?: () => void,
    type?: 'modal' | 'top-left' | 'top-right'
    dismissable?: boolean
} & React.PropsWithChildren;

export default function Dialog({ isOpen, onClose, onCancel, children, type = 'modal', dismissable }: DialogModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current === null) return;

        if (isOpen) {
            dialogRef.current.showModal();
        } else dialogRef.current.close();
    }, [isOpen])

    return <>
        <dialog
            className={`bg-transparent border-0 ${type}`}
            ref={dialogRef}
            onClose={onClose}
            onCancel={onCancel}
            closedby={dismissable ? 'closerequest' : 'none'}
        >
            {children}
        </dialog>
    </>;
}