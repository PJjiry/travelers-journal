import React from 'react';
import classes from './VisitedBanner.module.css';
import {isPastDate} from '../../utils/utils.ts';

// Component for displaying the visited banner with the text 'Visited' or 'Plan to visit'
const VisitedBanner: React.FC<{ date: string }> = ({date}) => {

    // Render the visited banner with the text 'Visited' or 'Plan to visit' according to the date
    return <div className={classes.visitedBanner}>{isPastDate(date) ? 'Visited' : 'Plan to visit'}</div>;
};

export default VisitedBanner;