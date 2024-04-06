import React, {useState} from 'react';
import {PlaceForm} from '../../types.ts';
import classes from './NewPlace.module.css';
import {isPastDate} from '../../utils/utils.ts';
import {MdHelpOutline} from "react-icons/md";
import {FaTrashAlt} from "react-icons/fa";
import {FaImage} from "react-icons/fa6";
import MapLocation from '../../components/MapLocation/MapLocation.tsx';

const continents = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Australia/Oceania', 'South America'];

const NewPlace: React.FC = () => {
    const [placeForm, setPlaceForm] = useState<PlaceForm>({
        title: '',
        imageUrl: '',
        type: '',
        date: '',
        country: '',
        continent: '',
        budget: undefined,
        description: '',
        specialRequirements: undefined,
        sights: undefined,
        location: {
            lat: 50.073658,
            lng: 14.418540,
        },
    });

    const [sightName, setSightName] = useState('');
    const [sightDescription, setSightDescription] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setPlaceForm({
            ...placeForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPlaceForm({...placeForm, imageUrl: reader.result as string});
        };
        reader.readAsDataURL(file);
    }

    const removeImage = () => {
        setPlaceForm({...placeForm, imageUrl: ''});
    }

    const handleAddSight = (sightName: string, sightDescription: string) => {
        if (!placeForm.sights) {
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [{sightName: sightName, sightDescription: sightDescription}]
            }));
        } else {
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [...prevPlaceForm.sights!, {sightName: sightName, sightDescription: sightDescription}]
            }));
        }

    };

    const removeSight = (sightName: string) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                sights: prevPlaceForm.sights!.filter(sight => sight.sightName !== sightName)
            };
        });
    }

    const handleReset = () => {
        setPlaceForm({
            title: '',
            imageUrl: '',
            type: '',
            date: '',
            country: '',
            continent: '',
            budget: undefined,
            description: '',
            specialRequirements: undefined,
            sights: undefined,
            location: {
                lat: 50.073658,
                lng: 14.418540,
            },
        });
        setSightName('');
        setSightDescription('');
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(placeForm);
    };

    return (
        <main className={classes.main}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3 className={classes.title}>Add a new place</h3>
                <label htmlFor="title" className={classes.label}>
                    Name of the place:
                    <div className={classes.inputHelp}><input className={classes.input} type="text" id="title"
                                                              name="title" value={placeForm.title}
                                                              onChange={handleChange}/>
                        <MdHelpOutline
                            title="Enter name of the city (London) or name of the place you want to visit (the Alps)."
                            className={classes.icon}/></div>
                </label>
                <div className={classes.imageFlexbox}>
                    <label htmlFor="image" className={`${classes.label} ${classes.customFileInput}`}>
                        Background image:
                        <input className={`${classes.input} ${classes.hiddenFileInput}`} type="file" name="image"
                               multiple={false}
                               id="image" accept=".jpg,.png,.jpeg"
                               onChange={handleImageChange}/>
                        <FaImage/>
                        <div className={classes.imagePreview}>
                            {placeForm.imageUrl &&
                                <img onClick={removeImage} title="Remove current image and pick a new one."
                                     src={placeForm.imageUrl} alt="Background image"/>}
                        </div>
                    </label>
                    <MdHelpOutline
                        title="Click to choose a background image of the place. Allowed formats are: jpg, png, jpeg. Dropping of the image is not allowed."
                        className={classes.icon}/>
                </div>
                <label htmlFor="type" className={classes.label}>
                    Type of place:
                    <div className={classes.inputHelp}><select className={classes.select} name="type" id="type"
                                                               value={placeForm.type}
                                                               onChange={handleChange}>
                        <option className={classes.option} value="">--Please choose an option--</option>
                        <option className={`${classes.option} ${classes.cityOption}`} value="City">City</option>
                        <option className={`${classes.option} ${classes.natureOption}`} value="Nature">Nature</option>
                    </select>
                        <MdHelpOutline
                            title="Type of the place determines the appearance of the place. City type allows you to enter sights."
                            className={classes.icon}/></div>
                </label>
                <label htmlFor="date" className={classes.label}>
                    Date of visit:
                    <div className={classes.inputHelp}><input className={classes.input} type="date" id="date"
                                                              name="date" value={placeForm.date}
                                                              onChange={handleChange}/>
                        <MdHelpOutline title="Pick a date you have visited the place or are planning to visit."
                                       className={classes.icon}/></div>
                </label>
                <label htmlFor="country" className={classes.label}>
                    Country:
                    <div className={classes.inputHelp}><input className={classes.input} type="text" id="country"
                                                              name="country"
                                                              value={placeForm.country}
                                                              onChange={handleChange}/>
                        <MdHelpOutline title="Type a country where is the place located." className={classes.icon}/>
                    </div>
                </label>
                <label htmlFor="continent" className={classes.label}>
                    Continent:
                    <div className={classes.inputHelp}><select className={classes.select} name="continent"
                                                               id="continent" value={placeForm.continent}
                                                               onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        {continents.map((continent, index) => (
                            <option key={continent} className={`${classes['continent' + index]}`}
                                    value={continent}>{continent}</option>
                        ))}
                    </select>
                        <MdHelpOutline
                            title="Select place's continent. The country should be inside the selected continent."
                            className={classes.icon}/></div>
                </label>
                {(!placeForm.date || isPastDate(placeForm.date)) && <label htmlFor="budget" className={classes.label}>
                    Budget for the whole trip (in $USD):
                    <div className={classes.inputHelp}>
                        <input min={0} className={classes.input} type="number" name="budget" id="budget"
                               value={placeForm.budget} onChange={handleChange}/>
                        <MdHelpOutline title="Enter a budget for the whole trip." className={classes.icon}/></div>
                </label>}
                <label htmlFor="description" className={classes.label}>
                    Description of the place:
                    <div className={classes.inputHelp}><textarea className={classes.textarea} name="description"
                                                                 id="description"
                                                                 value={placeForm.description}
                                                                 onChange={handleChange}/>
                        <MdHelpOutline title="Add some basic description about the place." className={classes.icon}/>
                    </div>
                </label>
                <label htmlFor="specialRequirements" className={classes.label}>
                    Special requirements:
                    <div className={classes.inputHelp}><input className={classes.input} name="specialRequirements"
                                                              id="specialRequirements"
                                                              value={placeForm.specialRequirements}
                                                              onChange={handleChange}/>
                        <MdHelpOutline
                            title="Mention special requirements that were needed to visit the place like visa or booking in advance."
                            className={classes.icon}/>
                    </div>
                </label>
                {placeForm.type === "City" &&
                    <label htmlFor="sights" className={`${classes.label} ${classes.sightsBox}`}>
                        <div className={classes.sights}>
                            <div className={classes.sightsTitle}>
                                <h4>Sights to visit:</h4>
                                <MdHelpOutline
                                    title="Mention sights you want to or have visited in the city. Add also basic description of each site."
                                    className={classes.icon}/></div>
                            <div
                                className={classes.sightsContainer}>{placeForm.sights && placeForm.sights.map((sight) => (
                                <div className={classes.sightItem}>
                                    <span
                                        title={`Sight name: ${sight.sightName} \nSight description: ${sight.sightDescription}`}
                                        key={sight.sightName}>{sight.sightName}</span><FaTrashAlt onClick={()=>removeSight(sight.sightName)}/></div>
                            ))}</div>
                        </div>
                        <div className={classes.sightInputs}>
                            <input className={classes.input} name="newSightName" id="newSightName" value={sightName}
                                   onChange={event => setSightName(event.target.value)} placeholder="Sight Name"/>
                            <input className={classes.input} name="newSightDescription" id="newSightDescription"
                                   value={sightDescription}
                                   onChange={event => setSightDescription(event.target.value)}
                                   placeholder="Sight Description"/>
                        </div>
                        <button className={classes.addSightButton} type="button" onClick={() => {
                            handleAddSight(sightName, sightDescription);
                            setSightName('');
                            setSightDescription('')
                        }}
                        >Add sight
                        </button>
                    </label>}
                <label htmlFor="location" className={`${classes.label} ${classes.location}`}>
                    <div className={classes.locationTitle}>
                        Location of the place:
                        <MdHelpOutline
                            title="Set the location on the map of the place. You can scroll and zoom the map as you wish to."
                            className={classes.icon}/>
                    </div>
                    <MapLocation mapContainerStyle={{width: '100%', height: '400px', borderRadius: '10px'}}
                                 lat={placeForm.location.lat} lng={placeForm.location.lng}
                                 onLocationChange={(newLocation) => {
                                     setPlaceForm(prevPlaceForm => {
                                         return {
                                             ...prevPlaceForm,
                                             location: newLocation,
                                         };
                                     });
                                 }}
                    />
                </label>
                <div className={classes.actions}>
                    <input className={classes.reset} onClick={handleReset} type="reset" value="Reset"/>
                    <input className={classes.submit} type="submit" value="Submit"/>
                </div>
            </form>
        </main>
    );
};

export default NewPlace;