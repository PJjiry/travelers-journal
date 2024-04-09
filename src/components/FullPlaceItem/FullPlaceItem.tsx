import React, {useCallback, useContext} from 'react';
import classes from './FullPlaceItem.module.css';
import PlaceInfo from '../PlaceInfo/PlaceInfo.tsx';
import {FaTrash} from "react-icons/fa";
import GoogleMapsContainer from '../GoogleMapsContainer/GoogleMapsContainer.tsx';
import {MdOutlineEdit} from "react-icons/md";
import CurrentPlaceContext from '../../store/CurrentPlaceContext.tsx';
import PlaceForm from '../PlaceForm/PlaceForm.tsx';
import Modal from '../UI/Modal/Modal.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {useNavigate} from 'react-router-dom';
import {Backdrop} from '../UI/Backdrop/Backdrop.tsx';

// Component for displaying a complete place item with all its details
const FullPlaceItem: React.FC = () => {
    // importing the current place and places context to use their state and functions
    const currentPlaceCtx = useContext(CurrentPlaceContext);
    const placesCtx = useContext(PlacesContext);
    const place = currentPlaceCtx?.currentPlace;

    // using state to manage the edit mode and modal
    const [isEditing, setIsEditing] = React.useState(false);
    // using state to manage the modal visibility
    const [isOpen, setIsOpen] = React.useState(false);
    // using the navigate hook to redirect to the main page
    const navigate = useNavigate();

    // function to stop the edit mode, delete the place, open the modal and close the modal
    const handleStopEdit = useCallback(() => {
        setIsEditing(false);
    }, []);

    if (!place) return null;

    // function to start the edit mode
    const handleStartEdit = () => {
        setIsEditing(true);
    }

    // function to delete the place
    const handleDeletePlace = () => {
        placesCtx?.handleDeletePlace(place.id);
        setIsOpen(false);
        navigate('/');
    }

    // function to open the modal
    const handleOpenModal = () => {
        setIsOpen(true);
    }

    // function to close the modal
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    //if the places context is loading, display a loading message
    if (placesCtx?.loading) {
        return <div className="loading" style={{color: 'var(--text-light)'}}>Loading...</div>
    }

    //if there is an error in the places context, display an error message
    if (placesCtx?.error) {
        return <div className="error">Error: {placesCtx.error}</div>;
    }

    //if the place is in edit mode, display the place form, otherwise display the place details with buttons to start editing and delete the place
    return (
        <>
            {!isEditing ? (
                    <article key={place.id} className={classes.place}>
                        <img src={place.imageUrl} alt={place.title}/>
                        <PlaceInfo place={place}/>
                        <div className={classes.map}>
                            <h4>Location:</h4>
                            <GoogleMapsContainer place={place}/>
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
            <Modal title="Delete place" open={isOpen} message="Are you sure you want to delete this place?">
                <button className={classes.closeButton} onClick={handleCloseModal}>Close</button>
                <button className={classes.deleteButton} onClick={handleDeletePlace}>Delete</button>
            </Modal>
            <Backdrop show={isOpen}/>
        </>
    )
}

export default FullPlaceItem