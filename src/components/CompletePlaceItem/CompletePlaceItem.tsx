import React, {useContext} from 'react';
import classes from './CompletePlaceItem.module.css';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import {FaTrash} from "react-icons/fa";
import MapLocation from '../MapLocation/MapLocation.tsx';
import {MdOutlineEdit} from "react-icons/md";
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';
import PlaceForm from '../PlaceForm/PlaceForm.tsx';
import Modal, {Backdrop} from '../UI/Modal/Modal.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {useNavigate} from 'react-router-dom';

const CompletePlaceItem: React.FC = () => {
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const placesCtx = useContext(PlacesContext);
    const place = currentPlaceCtx?.currentPlace;
    const [isEditing, setIsEditing] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    if (!place) return null;

    const handleStartEdit = () => {
        setIsEditing(true);
    }

    const handleStopEdit = () => {
        setIsEditing(false);
    }

    const handleDeletePlace = () => {
        placesCtx?.handleDeletePlace(place.id);
        setOpen(false);
        navigate('/');
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }


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
                                onClick={handleOpenModal}
                                className={classes.deleteButton}>Delete
                                place <FaTrash/></button>
                        </div>
                    </article>) :
                (<PlaceForm title="Edit place" place={place} stopEditing={handleStopEdit}
                            isEditing={isEditing}/>)
            }
            <Modal title="Delete place" open={open} message="Are you sure you want to delete this place?">
                <button className={classes.closeButton} onClick={handleCloseModal}>Close</button>
                <button className={classes.deleteButton} onClick={handleDeletePlace}>Delete</button>

            </Modal>
            <Backdrop show={open} />
        </>
    )
}
export default CompletePlaceItem