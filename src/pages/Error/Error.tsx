import classes from './Error.module.css';
import React from 'react';

// Component for displaying an error message
const Error:React.FC = () => {

    // render the error message and the 404 not found message...this component is used when the user tries to access a page that does not exist
    return (
        <div className={classes.errorContainer}>
            <h3>404 Not Found</h3>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default Error;