import React from 'react';
import classes from '../UI.module.css';

// Component for displaying the backdrop for the modal
export const Backdrop: React.FC<{ show: boolean }> = ({show}) => {

    // Render the backdrop if the modal is shown
    return show ? <div className={classes.backdrop}></div> : null;
};