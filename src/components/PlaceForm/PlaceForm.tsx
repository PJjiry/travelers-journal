import React, {useContext} from 'react';
import classes from './PlaceForm.module.css';
import {isPastDate} from '../../utils/utils.ts';
import {CONTINENTS} from '../../utils/constants.ts';
import Input from '../UI/Input/Input.tsx';
import BackgroundImageInput from '../BackgroundImageInput/BackgroundImageInput.tsx';
import Select from '../UI/Select/Select.tsx';
import SightForm from '../SightForm/SightForm.tsx';
import LocationForm from '../LocationForm/LocationForm.tsx';
import PlaceFormContext from '../../store/PlaceFormContext.tsx';

const PlaceForm: React.FC = () => {
    const PlaceFormCtx = useContext(PlaceFormContext);

    if (!PlaceFormCtx) {
        throw new Error('PlaceFormContext is null');
    }

    const { placeForm, handleChange,sight, handleAddSight, handleRemoveSight, handleSightChange, handleImageChange, handleRemoveImage, handleLocationChange, handleReset } = PlaceFormCtx;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(placeForm);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h3 className={classes.title}>Add a new place</h3>
            <Input title="Name of the place" name="title" value={placeForm.title} onInputChange={handleChange}
                   tooltip="Enter name of the city (London) or name of the place you want to visit (the Alps)."/>
            <BackgroundImageInput title="Background image" name="image" tooltip="Click to choose a background image of the place. Allowed formats are: jpg, png, jpeg. Dropping of the image is not allowed."
            imageUrl={placeForm.imageUrl} onRemoveImage={handleRemoveImage} onImageChange={handleImageChange}/>
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
            {(!placeForm.date || isPastDate(placeForm.date)) && <Input title="Budget for the whole trip (in $USD)" name="budget" value={placeForm.budget} onInputChange={handleChange}
                                                                       tooltip="Enter a budget spent for the whole trip." min={0} type="number"/>}
            <Input title="Description of the place" name="description" value={placeForm.description} onInputChange={handleChange}
                     tooltip="Add some basic description about the place." isTextarea={true}/>
            <Input title="Special requirements" name="specialRequirements" value={placeForm.specialRequirements} onInputChange={handleChange}
                        tooltip="Mention special requirements that were needed to visit the place like visa or booking in advance." isTextarea={true}/>
            {placeForm.type === "City" &&
                <SightForm sights={placeForm.sights} sightName={sight.sightName} sightDescription={sight.sightDescription} onAddSight={() => {
                    handleAddSight(sight.sightName, sight.sightDescription);
                }} onRemoveSight={handleRemoveSight} onSightChange={handleSightChange}/>}
            <LocationForm location={placeForm.location} onLocationChange={handleLocationChange} />
            <div className={classes.actions}>
                <input className={classes.reset} onClick={handleReset} type="reset" value="Reset"/>
                <input className={classes.submit} type="submit" value="Submit"/>
            </div>
        </form>
    )
}
export default PlaceForm