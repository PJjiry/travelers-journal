import React, {useEffect, useRef} from 'react';
import classes from '../UI.module.css';
import {ModalProps} from '../../../types.ts';
import {createPortal} from 'react-dom';

// Component for the modal dialog
const Modal: React.FC<ModalProps> = ({title, message, open, children, ...props}) => {

    // using ref to access the dialog element
    const dialogRef = useRef<null | HTMLDialogElement>(null)

    // using effect to show or hide the modal dialog
    useEffect(() => {
        if (open && dialogRef.current && !dialogRef.current.open) { // if the condition is open and the dialog is not open
            dialogRef.current.showModal(); // show the dialog
        }

        if (!open && dialogRef.current && dialogRef.current.open) { // if the condition is not open and the dialog is open
            dialogRef.current.close(); // close the dialog
        }
    }, [open]);

    if (!open) return null; // if the modal is not open, return null

    // Render the modal dialog...portal is used to render the dialog in the modal HTML element
    return createPortal(
        <dialog {...props} className={classes.modal} ref={dialogRef} open={open}>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className={classes.modalActions}>
                {children}
            </div>
        </dialog>, document.getElementById('modal') as HTMLElement
    )
}

export default Modal