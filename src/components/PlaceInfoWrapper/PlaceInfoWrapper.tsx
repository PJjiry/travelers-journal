import React, {ReactNode} from 'react';
import classes from './PlaceInfoWrapper.module.css'

// Component for displaying the place information with a label
const PlaceInfoWrapper: React.FC<{ label: string, children: ReactNode }> = ({label, children}) => {

    // Component for displaying the place information with a label
    return (
        <div className={classes.placeInfoWrapper}>
            <span className={classes.label}>{label}</span>
            <p>{children}</p>
        </div>
    )
}

export default PlaceInfoWrapper