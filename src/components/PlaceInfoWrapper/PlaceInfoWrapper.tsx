import React, {ReactNode} from 'react';
import classes from './PlaceInfoWrapper.module.css'

const PlaceInfoWrapper: React.FC<{label:string, children:ReactNode}> = ({label, children}) => {
    return (
        <div className={classes.placeInfoWrapper}>
            <span className={classes.label}>{label}</span>
            <p>{children}</p>
        </div>
    )
}
export default PlaceInfoWrapper