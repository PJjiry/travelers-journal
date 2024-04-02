import React from 'react';
import classes from './VisitedBanner.module.css';
import {isPastDate} from '../../utils/utils.ts';

const VisitedBanner: React.FC<{ date: string }> = ({ date}) => {
    return <div className={classes.visitedBanner}>{isPastDate(date)?'Visited':'Plan to visit'}</div>;
};

export default VisitedBanner;