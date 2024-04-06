import React, {useContext} from 'react';
import classes from './CompletePlaceItem.module.css';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import {FaTrash} from "react-icons/fa";
import MapLocation from '../MapLocation/MapLocation.tsx';
import {IoMdSave} from "react-icons/io";
import {MdOutlineEdit, MdCancel} from "react-icons/md";
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';
import PlaceForm from '../PlaceForm/PlaceForm.tsx';

const CompletePlaceItem: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const place = currentPlaceCtx?.currentPlace;
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEdit = () => {
        setIsEditing((prevState) => !prevState);
    }

    if (!place) return null;

    return (
        <>
            <div className={classes.actions}>
                <button
                    onClick={handleEdit}
                    className={isEditing ? classes.cancelButton : classes.editButton}>{isEditing ? <>Cancel <MdCancel/></> : <>Edit
                    place <MdOutlineEdit/></>}</button>
                <button
                    className={isEditing ? classes.saveButton : classes.deleteButton}>{isEditing ? <>Save <IoMdSave/></> : <>Delete
                    place <FaTrash/></>}</button>
            </div>
            {!isEditing ? (
                    <article key={place.id} className={classes.place}>
                        <img src={place.imageUrl} alt={place.title}/>
                        <PlaceInfo place={place}/>
                        <div className={classes.map}>
                            <h4>Location:</h4>
                            <MapLocation lat={place.location.lat} lng={place.location.lng}/>
                        </div>
                    </article>) :
                (<PlaceForm title="Edit place" place={place}/>)
            }
        </>
    )
}
export default CompletePlaceItem