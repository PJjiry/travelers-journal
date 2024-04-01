import React from 'react';
import {format, isPast} from 'date-fns';
import classes from './VisitedBanner.module.css';

const VisitedBanner: React.FC<{ date: string }> = ({ date}) => {
    const visitDate = format(new Date(date), 'yyyy-MM-dd');

    return <div className={classes.visitedBanner}>{isPast(new Date(visitDate))?'Visited':'Plan to visit'}</div>;
};

export default VisitedBanner;