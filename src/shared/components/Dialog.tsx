import { useEffect, useRef } from "react";

type DialogModalProps = {
    isOpen: boolean,
    onClose?: () => void,
    onCancel?: () => void,
    type?: 'modal' | 'top-left' | 'top-right'
    dismissable?: boolean,
    closedby?: "none" | "closerequest" | "any"
} & React.PropsWithChildren;

export default function Dialog({ isOpen, onClose, onCancel, children, type = 'modal', dismissable, closedby }: DialogModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current === null) return;

        if (isOpen) {
            dialogRef.current.showModal();
            return;
        }

        dialogRef.current.close();
    }, [isOpen])

    return (
        <dialog
            className={type}
            ref={dialogRef}
            onClose={onClose}
            onCancel={onCancel}
            closedby={closedby === undefined ? (dismissable ? 'closerequest' : 'none') : closedby}
        >
            {children}
        </dialog>
    );
}