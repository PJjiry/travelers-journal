import classes from './Error.module.css';
import React from 'react';

const Error:React.FC = () => {
    return (
        <div className={classes.errorDiv}>
            <h3>404 Not Found</h3>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default Error;