import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './PlaceForm.module.css';
import {isPastDate} from '../../utils/utils.ts';
import {MdCancel, MdError} from "react-icons/md";
import {CONTINENTS} from '../../utils/constants.ts';
import Input from '../UI/Input/Input.tsx';
import BackgroundImageInput from '../BackgroundImageInput/BackgroundImageInput.tsx';
import Select from '../UI/Select/Select.tsx';
import SightForm from '../SightForm/SightForm.tsx';
import LocationForm from '../LocationForm/LocationForm.tsx';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {PlaceFormProps} from '../../types.ts';
import {IoMdSave} from 'react-icons/io';

const PlaceForm: React.FC<PlaceFormProps> = ({place, title, isEditing, stopEditing}) => {
    const PlaceFormCtx = useContext(PlaceFormContext);
    const PlaceCtx = useContext(PlacesContext);
    const navigate = useNavigate();

    const [hasError, setHasError] = React.useState(false);

    if (!PlaceFormCtx || !PlaceCtx) {
        throw new Error('Context is null');
    }
    const {
        placeForm,
        setPlaceForm,
        handleChange,
        sight,
        handleAddSight,
        handleRemoveSight,
        handleSightChange,
        handleImageDrop,
        handleImageChange,
        handleRemoveImage,
        handleLocationChange,
        handleReset
    } = PlaceFormCtx;

    useEffect(() => {
        if (place) {
            setPlaceForm(place);
        }
        return () => {
            handleReset();
        }
    }, [place, setPlaceForm]);


    const validateForm = () => {
        const {title, imageUrl, type, date, country, continent, description} = placeForm;
        if (!title || !imageUrl || !type ||!date || !country || !continent || !description) {
            setHasError(true);
            return false;
        }
        setHasError(false);
        return true;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        if (!place) {
            PlaceCtx.addNewPlace(placeForm);
            handleReset()
            navigate('/')
        }
        if (place) {
            PlaceCtx.updatePlace(placeForm);
            if (typeof stopEditing === 'function') {
                stopEditing();
            }
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h3 className={classes.title}>{title}</h3>
            <Input title="Name of the place" name="title" value={placeForm.title} onInputChange={handleChange}
                   tooltip="Enter name of the city (London) or name of the place you want to visit (the Alps)."/>
            <BackgroundImageInput title="Background image" name="image"
                                  tooltip="Click to choose a background image of the place. Allowed formats are: jpg, png, jpeg. Dropping of the image is not allowed."
                                  imageUrl={placeForm.imageUrl} onRemoveImage={handleRemoveImage}
                                  onImageChange={handleImageChange} onImageDrop={handleImageDrop}/>
            <Select title="Type of place" name="type" value={placeForm.type}
                    tooltip="Type of the place determines the appearance of the place. City type allows you to enter sights."
                    onSelectChange={handleChange}>
                <option className={classes.option} value="">--Please choose an option--</option>
                <option className={`${classes.option} ${classes.cityOption}`} value="City">City</option>
                <option className={`${classes.option} ${classes.natureOption}`} value="Nature">Nature</option>
            </Select>
            <Input title="Date of visit" name="date" value={placeForm.date} onInputChange={handleChange}
                   tooltip="Pick a date you have visited the place or are planning to visit." type="date"/>
            <Input title="Country" name="country" value={placeForm.country} onInputChange={handleChange}
                   tooltip="Type a country where is the place located."/>
            <Select title="Continent" name="continent" value={placeForm.continent}
                    tooltip="Select place's continent. Name of the country should belong to the selected continent."
                    onSelectChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {CONTINENTS.map((continent, index) => (
                    <option key={continent} className={`${classes['continent' + index]}`}
                            value={continent}>{continent}</option>
                ))}
            </Select>
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
            {(placeForm.type === "City") &&
                <SightForm sights={placeForm.sights} sightName={sight.sightName}
                           sightDescription={sight.sightDescription} onAddSight={() => {
                    handleAddSight(sight.sightName, sight.sightDescription);
                }} onRemoveSight={handleRemoveSight} onSightChange={handleSightChange}/>}
            <LocationForm location={placeForm.location} onLocationChange={handleLocationChange}/>
            {hasError && <div className={classes.error}>Please fill in all required
                fields<MdError/></div>}
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