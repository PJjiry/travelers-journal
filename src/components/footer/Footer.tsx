import React from 'react';
import classes from './footer.module.css'

const Footer:React.FC = () => {
    const year = new Date().getFullYear();
    return(
        <div className={classes.footer}>
            <p>© {year} Traveler's Journal. Author: Petr Jiránek. All rights reserved.</p>
        </div>
    )
}
export default Footer