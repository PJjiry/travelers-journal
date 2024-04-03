import React from 'react';
import {useParams} from 'react-router-dom';
import classes from './EditPlace.module.css'
import {PiConfettiFill} from "react-icons/pi";
import {MdCardTravel} from "react-icons/md";
import {IoEarth} from "react-icons/io5";
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {FaLandmarkFlag} from "react-icons/fa6";
import {DUMMY_PLACES} from '../../dummy_places.ts';
import {Place} from '../../types.ts';
import Error from '../Error.tsx';
import {isPastDate} from '../../utils/utils.ts';
import {differenceInDays, format} from 'date-fns';

const EditPlace: React.FC = () => {
    const id: string | undefined = useParams().id;
    const place: Place | undefined = DUMMY_PLACES.find((place) => place.id === id);

    if (!place) return (
        <Error/>
    )

    return (
        <main className={place.type === "Nature" ? classes.natureBackground : classes.cityBackground}>
            <article key={place.id} className={classes.place}>
                <img src={place.imageUrl} alt={place.title}/>
                <div className={classes.placeInfo}>
                    <h3>{place.title}</h3>
                    <div className={classes.date}>
                        <span className={classes.label}>Date of visit: </span>
                        <p>{format(new Date(place.date), 'MMMM do, yyyy')} ({isPastDate(place.date) ? <>Already
                            visited <PiConfettiFill/></> : <>Coming
                            in {differenceInDays(new Date(place.date), new Date())} days <MdCardTravel/></>})</p></div>
                    <div className={classes.country}>
                        <span className={classes.label}>Country: </span>
                        <p>{place.country} ({place.continent} <IoEarth/>)</p>
                    </div>
                    {isPastDate(place.date) && place.budget && <div className={classes.budget}>
                        <span className={classes.label}>Budget: </span>
                        <p>{new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(place.budget)}</p>
                    </div>}
                    <div className={classes.description}>
                        <span className={classes.label}>Description: </span>
                        <p>{place.description}</p>
                    </div>
                    {place.specialRequirements &&
                        <div className={classes.specialRequirements}>
                            <span className={classes.label}>Special requirements: </span>
                            <p>{place.specialRequirements}</p></div>}
                    {place.type === "City" && (place.sights?.length ?? 0) > 0 && place.sights?.map((sight) => {
                        return (
                            <>
                                <h4 className={classes.sightsLabel}>Places of interest:</h4>
                                <div className={classes.sight} key={sight.sightName}>
                                    <div><h5>{sight.sightName}</h5>
                                        <FaLandmarkFlag/></div>
                                    <p>{sight.sightDescription}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className={classes.map}>
                    <h4>Location:</h4>
                    <LoadScript googleMapsApiKey="AIzaSyAkJEGW4P__lSJITHtP_jSJl542ean0QIQ">
                        <GoogleMap
                            mapContainerStyle={{width: '100%', height: '400px', borderRadius: '0 0 10px 10px'}}
                            center={{lat: place.location.lat, lng: place.location.lng}}
                            zoom={10}
                            options={{
                                draggable: false,
                                zoomControl: true,
                                scrollwheel: false,
                                streetViewControl: false,
                            }}
                        >
                            {DUMMY_PLACES.map((place) => (
                                <Marker key={place.id} position={{lat: place.location.lat, lng: place.location.lng}}
                                        draggable={false}/>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </article>
        </main>
    )
}
export default EditPlace