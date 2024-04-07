import React, {useContext} from 'react';
import classes from './CompletePlaceItem.module.css';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import {FaTrash} from "react-icons/fa";
import MapLocation from '../MapLocation/MapLocation.tsx';
import {MdOutlineEdit} from "react-icons/md";
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';
import PlaceForm from '../PlaceForm/PlaceForm.tsx';

const CompletePlaceItem: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;
    const [isEditing, setIsEditing] = React.useState(false);

    const handleStartEdit = () => {
        setIsEditing(true);
    }

    const handleStopEdit = () => {
        setIsEditing(false);
    }

    if (!place) return null;

    return (
        <>
            {!isEditing ? (
                    <article key={place.id} className={classes.place}>
                        <img src={place.imageUrl} alt={place.title}/>
                        <PlaceInfo place={place}/>
                        <div className={classes.map}>
                            <h4>Location:</h4>
                            <MapLocation lat={place.location.lat} lng={place.location.lng}/>
                        </div>
                        <div className={classes.actions}>
                            <button
                                onClick={handleStartEdit}
                                className={classes.editButton}>Edit
                                place <MdOutlineEdit/></button>
                            <button
                                className={classes.deleteButton}>Delete
                                place <FaTrash/></button>
                        </div>
                    </article>) :
                (<PlaceForm title="Edit place" place={place} stopEditing={handleStopEdit}
                            isEditing={isEditing}/>)
            }
        </>
    )
}
export default CompletePlaceItem