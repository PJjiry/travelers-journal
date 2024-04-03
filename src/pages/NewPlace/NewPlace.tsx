import React, {useState} from 'react';
import {PlaceForm} from '../../types.ts';
import classes from './NewPlace.module.css';
import {isPastDate} from '../../utils/utils.ts';

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
        sights: [{sightName: '', sightDescription: ''}],
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // if (event.target.name === 'imageUrl' && event.target.files) {
        //     const file = event.target.files[0];
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setPlaceForm({
        //             ...placeForm,
        //             imageUrl: reader.result as string,
        //         });
        //     };
        //     reader.readAsDataURL(file);
        // } else {
        setPlaceForm({
            ...placeForm,
            [event.target.name]: event.target.value,
        });
        // }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(placeForm);
    };

    const handleSightChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newSights = placeForm.sights?.map((sight, sightIndex) => {
            if (index !== sightIndex) return sight;
            return {...sight, [event.target.name]: event.target.value};
        });

        setPlaceForm({...placeForm, sights: newSights});
    };

    const handleAddSight = () => {
        // @ts-ignore
        setPlaceForm({...placeForm, sights: [...placeForm.sights, {sightName: '', sightDescription: ''}]});
    };

    return (
        <main className={classes.main}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label htmlFor="title" className={classes.label}>
                    Name of the place:
                    <input className={classes.input} type="text" id="title" name="title" value={placeForm.title}
                           onChange={handleChange}/>
                </label>
                <label htmlFor="image" className={classes.label}>
                    Background image:
                    <input className={classes.input} type="file" name="image" id="image" accept=".jpg,.png,.jpeg"
                           onChange={handleChange}/>
                </label>
                <label htmlFor="type" className={classes.label}>
                    Type:
                    <select className={classes.select} name="type" id="type" value={placeForm.type} onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="City">City</option>
                        <option value="Nature">Nature</option>
                    </select>
                </label>
                <label htmlFor="date" className={classes.label}>
                    Date:
                    <input className={classes.input} type="date" id="date" name="date" value={placeForm.date}
                           onChange={handleChange}/>
                </label>
                <label htmlFor="country" className={classes.label}>
                    Country:
                    <input className={classes.input} type="text" id="country" name="country" value={placeForm.country}
                           onChange={handleChange}/>
                </label>
                <label htmlFor="continent" className={classes.label}>
                    Continent:
                    <select className={classes.select} name="continent" id="continent" value={placeForm.continent}
                            onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        {continents.map(continent => (
                            <option key={continent} value={continent}>{continent}</option>
                        ))}
                    </select>
                </label>
                {(!placeForm.date || isPastDate(placeForm.date)) && <label htmlFor="budget" className={classes.label}>
                    Budget for the whole trip (optional)
                    <input className={classes.input} type="number" name="budget" id="budget" value={placeForm.budget}
                           onChange={handleChange}/>
                </label>}
                <label htmlFor="description" className={classes.label}>
                    Description of the place:
                    <textarea className={classes.textarea} name="description" id="description"
                              value={placeForm.description}
                              onChange={handleChange}/>
                </label>
                <label htmlFor="specialRequirements" className={classes.label}>
                    Special Requirements to visit the place:
                    <input className={classes.input} name="specialRequirements" id="specialRequirements"
                           value={placeForm.specialRequirements} onChange={handleChange}/>
                </label>
                {placeForm.type === "City" && <label htmlFor="sights" className={classes.label}>
                    Sights to visit (optional):
                    {placeForm.sights?.map((sight, index) => (
                        <div key={sight.sightName}>
                            <input className={classes.input} name="sightName" value={sight.sightName}
                                   onChange={event => handleSightChange(index, event)} placeholder="Sight Name"/>
                            <input className={classes.input} name="sightDescription" value={sight.sightDescription}
                                   onChange={event => handleSightChange(index, event)} placeholder="Sight Description"/>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSight}>Add another sight</button>
                </label>}

                <input className={classes.submit} type="submit" value="Submit"/>
            </form>
        </main>
    );
};

export default NewPlace;