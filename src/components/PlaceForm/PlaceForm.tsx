import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './PlaceForm.module.css';
import {isPastDate} from '../../utils/utils.ts';
import {MdCancel, MdError} from "react-icons/md";
import {CONTINENTS, COUNTRIES} from '../../utils/constants.ts';
import Input from '../UI/Input/Input.tsx';
import BackgroundImageInput from '../BackgroundImageInput/BackgroundImageInput.tsx';
import Select from '../UI/Select/Select.tsx';
import SightForm from '../SightForm/SightForm.tsx';
import LocationForm from '../LocationForm/LocationForm.tsx';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {PlaceFormProps} from '../../types.ts';
import {IoMdSave} from 'react-icons/io';

// Component for the form to add or edit a place
const PlaceForm: React.FC<PlaceFormProps> = ({place, title, isEditing, stopEditing}) => {

    // importing the place form and places context to use their state and functions
    const placeFormCtx = useContext(PlaceFormContext);
    const placeCtx = useContext(PlacesContext);

// use error state to show error message if form is not filled correctly
    const [hasError, setHasError] = React.useState(false);

    // using the navigate hook to redirect to the main page
    const navigate = useNavigate();

    if (!placeFormCtx || !placeCtx) {
        throw new Error('Context is null');
    }

    const {
        placeForm,
        setPlaceForm,
        handleChange,
        sight,
        isImageTooLarge,
        handleAddSight,
        handleRemoveSight,
        handleSightChange,
        handleImageDrop,
        handleImageChange,
        handleRemoveImage,
        handleReset
    } = placeFormCtx;

    // using effect to set the form values when editing a place
    useEffect(() => {
        if (place) {
            setPlaceForm(place);
        }
        return () => {
            handleReset();
        }
    }, [place, setPlaceForm]);

    // function to validate the form (check if the inputs are filled)
    const validateForm = () => {
        const {title, imageUrl, type, date, country, continent, description} = placeForm;
        if (!title || !imageUrl || !type || !date || !country || !continent || !description || isImageTooLarge) {
            setHasError(true);
            return false;
        }
        setHasError(false);
        return true;
    };

    // function to handle the form submission...if there is no place, add a new place, otherwise update the current place
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        if (!place) {
            placeCtx.handleAddNewPlace(placeForm); // add new place
            handleReset()
            navigate('/')
        }
        if (place) {
            placeCtx.handleUpdatePlace(placeForm); // update the current place
            if (typeof stopEditing === 'function') {
                stopEditing();
            }
        }
    };

    // Render the form with the input fields for the place details: title, image, type, date, country, continent, budget, description, special requirements, sights, and location
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h3 className={classes.title}>{title}</h3>
            <Input title="Name of the place" name="title" value={placeForm.title} onInputChange={handleChange}
                   tooltip="Enter name of the city (London) or name of the place you want to visit (the Alps)."/>
            <BackgroundImageInput title="Background image" name="image"
                                  tooltip="Click to choose or drop a background image of your place. Allowed formats are: jpg, png, jpeg. Maximum size is 1MB."
                                  imageUrl={placeForm.imageUrl} onRemoveImage={handleRemoveImage}
                                  onImageChange={handleImageChange} onImageDrop={handleImageDrop}/>
            {isImageTooLarge && <p className={classes.error}>The image is too large<MdError/></p>}
            <Select title="Type of place" name="type" value={placeForm.type}
                    tooltip="Type of the place determines the appearance of the place. City type allows you to enter sights."
                    onSelectChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option className={classes.cityOption} value="City">City</option>
                <option className={classes.natureOption} value="Nature">Nature</option>
            </Select>
            <Input title="Date of visit" name="date" value={placeForm.date} onInputChange={handleChange}
                   tooltip="Pick a date you have visited the place or are planning to visit it." type="date"/>
            <Select title="Country" name="country" value={placeForm.country} onSelectChange={handleChange}
                    tooltip="Select a country where the place is located.">
                <option value="">--Please choose a country--</option>
                {COUNTRIES.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </Select>
            <Select title="Continent" name="continent" value={placeForm.continent}
                    tooltip="Select place's continent. Name of the country should belong to the selected continent."
                    onSelectChange={handleChange}>
                <option value="">--Please choose a continent--</option>
                {CONTINENTS.map((continent, index) => (
                    <option key={continent} className={`${classes['continent' + index]}`}
                            value={continent}>{continent}</option>
                ))}
            </Select>
            {/*Show the budget input only if user have visited the place (according the date).*/}
            {(!placeForm.date || isPastDate(placeForm.date)) && <div className={classes.budgetDiv}>
                <Input title="Budget for the whole trip (optional)" name="budget" value={placeForm.budget}
                       onInputChange={handleChange} hasNoIcon
                       min={0} type="number"/>
                <Select title="Currency" name="currency" value={placeForm.currency!} onSelectChange={handleChange}
                        tooltip="Enter a budget spent for the whole trip and select currency.">
                    <option value="USD">$USD</option>
                    <option value="EUR">€EUR</option>
                    <option value="GBP">£GBP</option>
                    <option value="CZK">CZK</option>
                </Select>
            </div>}
            <Input title="Description of the place" name="description" value={placeForm.description}
                   onInputChange={handleChange}
                   tooltip="Add some basic description about the place." isTextarea={true}/>
            <Input title="Special requirements (optional)" name="specialRequirements"
                   value={placeForm.specialRequirements} onInputChange={handleChange}
                   tooltip="Mention special requirements that were needed to visit the place like visa or booking in advance."
                   isTextarea={true}/>
            {/*Display the sights only if the type is equal to City.*/}
            {(placeForm.type === "City") &&
                <SightForm sights={placeForm.sights} sightName={sight.sightName}
                           sightDescription={sight.sightDescription} onAddSight={() => {
                    handleAddSight(sight.sightName, sight.sightDescription);
                }} onRemoveSight={handleRemoveSight} onSightChange={handleSightChange}/>}
            <LocationForm/>
            {hasError && <div className={classes.error}>Please fill in all required
                fields<MdError/></div>}
            {/*If the user is editing the place display Cancel and Save buttons, otherwise Reset and Submit inputs.*/}
            {!isEditing && <div className={classes.actions}>
                <input className={classes.reset} onClick={handleReset} type="reset" value="Reset"/>
                <input className={classes.submit} type="submit" value="Submit"/>
            </div>}
            {isEditing && <div className={classes.actions}>
                <button className={classes.cancelButton} onClick={stopEditing}>Cancel <MdCancel/></button>
                <button className={classes.saveButton} type="submit">Save <IoMdSave/></button>
            </div>}
        </form>
    )
}

export default PlaceForm