import React, {useContext} from 'react';
import classes from './CompletePlaceItem.module.css';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import MapLocation from '../MapLocation/MapLocation.tsx';
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';

const CompletePlaceItem: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;

    if (!place) return null;

    return (
        <article key={place.id} className={classes.place}>
            <img src={place.imageUrl} alt={place.title}/>
            <PlaceInfo />
            <div className={classes.map}>
                <h4>Location:</h4>
                <MapLocation lat={place.location.lat} lng={place.location.lng}/>
            </div>
        </article>
    )
}
export default CompletePlaceItem