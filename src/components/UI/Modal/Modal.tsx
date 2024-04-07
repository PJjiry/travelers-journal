import React, {useEffect, useRef} from 'react';
import classes from '../UI.module.css';
import {ModalProps} from '../../../types.ts';
import {createPortal} from 'react-dom';

export const Backdrop: React.FC<{ show: boolean }> = ({show}) => {
    return show ? <div className={classes.backdrop}></div> : null;
};

const Modal:React.FC<ModalProps> = ({title,message, open,children, ...props}) => {
    const dialogRef = useRef<null | HTMLDialogElement>(null)

    useEffect(() => {
        if(open && dialogRef.current && !dialogRef.current.open){
            dialogRef.current.showModal();
        }

        if(!open && dialogRef.current && dialogRef.current.open){
            dialogRef.current.close();
        }
    }, [open]);

    if(!open) return null;

    return createPortal(
        <dialog {...props} className={classes.modal} ref={dialogRef} open={open}
        >
            <h3>{title}</h3>
            <p>{message}</p>
            <div className={classes.modalActions}>
                {children}
            </div>
        </dialog>, document.getElementById('modal') as HTMLElement
    )
}
export default Modal