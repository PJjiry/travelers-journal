import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PlaceForm.module.css';
import {isPastDate} from '../../utils/utils.ts';
import { MdError } from "react-icons/md";
import {CONTINENTS} from '../../utils/constants.ts';
import Input from '../UI/Input/Input.tsx';
import BackgroundImageInput from '../BackgroundImageInput/BackgroundImageInput.tsx';
import Select from '../UI/Select/Select.tsx';
import SightForm from '../SightForm/SightForm.tsx';
import LocationForm from '../LocationForm/LocationForm.tsx';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {Place} from '../../types.ts';

const PlaceForm: React.FC<{place?:Place, title:string}> = ({place, title}) => {
    const PlaceFormCtx = useContext(PlaceFormContext);
    const PlaceCtx = useContext(PlacesContext);
    const navigate = useNavigate();

    const [hasError, setHasError] = React.useState(false);

    if (!PlaceFormCtx || !PlaceCtx) {
        throw new Error('Context is null');
    }
    const { placeForm, setPlaceForm,handleChange,sight, handleAddSight, handleRemoveSight, handleSightChange,handleImageDrop, handleImageChange, handleRemoveImage, handleLocationChange, handleReset } = PlaceFormCtx;

    useEffect(() => {
        if (place) {
            setPlaceForm(place);
        }
    }, [PlaceFormCtx, place, setPlaceForm]);
    


    const validateForm = () => {
        const { title, imageUrl, type,budget, date, country, continent, description } = placeForm;
        if (!title || !imageUrl || !type || budget < 0 || !date || !country || !continent || !description) {
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
        PlaceCtx.addNewPlace(placeForm);
        handleReset()
        navigate('/')
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h3 className={classes.title}>{title}</h3>
            <Input title="Name of the place" name="title" value={placeForm.title} onInputChange={handleChange}
                   tooltip="Enter name of the city (London) or name of the place you want to visit (the Alps)."/>
            <BackgroundImageInput title="Background image" name="image" tooltip="Click to choose a background image of the place. Allowed formats are: jpg, png, jpeg. Dropping of the image is not allowed."
            imageUrl={placeForm.imageUrl} onRemoveImage={handleRemoveImage} onImageChange={handleImageChange} onImageDrop={handleImageDrop}/>
            <Select title="Type of place" name="type" value={placeForm.type}
                    tooltip="Type of the place determines the appearance of the place. City type allows you to enter sights."
                    onSelectChange={handleChange}>
                <option className={classes.option} value="">--Please choose an option--</option>
                <option className={`${classes.option} ${classes.cityOption}`} value="City">City</option>
                <option className={`${classes.option} ${classes.natureOption}`} value="Nature">Nature</option>
            </Select>
            <Input title="Date of visit" name="date" value={placeForm.date} onInputChange={handleChange}
                   tooltip="Pick a date you have visited the place or are planning to visit." type="date" />
            <Input title="Country" name="country" value={placeForm.country} onInputChange={handleChange}
                     tooltip="Type a country where is the place located." />
            <Select title="Continent" name="continent" value={placeForm.continent}
                    tooltip="Select place's continent. Name of the country should belong to the selected continent."
                    onSelectChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {CONTINENTS.map((continent, index) => (
                    <option key={continent} className={`${classes['continent' + index]}`}
                            value={continent}>{continent}</option>
                ))}
            </Select>
            {(!placeForm.date || isPastDate(placeForm.date)) && <Input title="Budget for the whole trip in $USD (optional)" name="budget" value={placeForm.budget} onInputChange={handleChange}
                                                                       tooltip="Enter a budget spent for the whole trip." min={0} type="number"/>}
            <Input title="Description of the place" name="description" value={placeForm.description} onInputChange={handleChange}
                     tooltip="Add some basic description about the place." isTextarea={true}/>
            <Input title="Special requirements (optional)" name="specialRequirements" value={placeForm.specialRequirements} onInputChange={handleChange}
                        tooltip="Mention special requirements that were needed to visit the place like visa or booking in advance." isTextarea={true}/>
            {(placeForm.type === "City") &&
                <SightForm sights={placeForm.sights} sightName={sight.sightName} sightDescription={sight.sightDescription} onAddSight={() => {
                    handleAddSight(sight.sightName, sight.sightDescription);
                }} onRemoveSight={handleRemoveSight} onSightChange={handleSightChange}/>}
            <LocationForm location={placeForm.location} onLocationChange={handleLocationChange} />
            {hasError && <div className={classes.error}>Please fill in all required fields{placeForm.budget<0 ? '. Budget cannot be negative number':''}<MdError/></div>}
            <div className={classes.actions}>
                <input className={classes.reset} onClick={handleReset} type="reset" value="Reset"/>
                <input className={classes.submit} type="submit" value="Submit"/>
            </div>
        </form>
    )
}
export default PlaceForm