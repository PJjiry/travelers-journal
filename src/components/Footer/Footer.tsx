import React, {memo} from 'react';
import classes from './Footer.module.css'

// Component for the footer with copyright sign
const Footer: React.FC = memo(() => {

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Render the footer with the current year
    return (
        <div className={classes.footer}>
            <p>© {currentYear} Traveler's Journal. Author: Petr Jiránek. All rights reserved.</p>
        </div>
    )
})

export default Footer