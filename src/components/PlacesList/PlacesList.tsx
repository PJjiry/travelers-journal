import React from 'react';
import classes from './PlacesList.module.css'
import VisitedBanner from '../VisitedBanner/VisitedBanner.tsx';

type Place = {
    id: string,
    title: string,
    date: string,
    type: string,
    // description: string,
    imageUrl: string,
    country: string,
    continent: string,
    location: {
        lat: number,
        lng: number
    }
}

export const DUMMY_PLACES:Place[] = [
    {
        id: 'p1',
        title: 'New York',
        date: '2021-05-12',
        type:'City',
        // description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://s39023.pcdn.co/wp-content/uploads/2022/10/Where-Are-Those-Morgans-Empire-State-Building-728x546.jpg.optimal.jpg',
        country: 'United States',
        continent: 'North America',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        }
    },
    {
        id: 'p2',
        title: 'Paris',
        date: '2021-08-11',
        type:'City',
        // description: 'Unique experience in Paris!',
        imageUrl: 'https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg',
        country: 'France',
        continent: 'Europe',
        location: {
            lat: 48.8588443,
            lng: 2.2943506
        },
    },
    {
        id: 'p3',
        title: 'Angkor Wat',
        date: '2025-08-11',
        // description: 'Unique experience in Paris!',
        type:'Nature',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/20171126_Angkor_Wat_4712_DxO.jpg',
        country: 'Cambodia',
        continent: 'Europe',
        location: {
            lat: 48.8588443,
            lng: 2.2943506
        },
    },
    {
        id: 'p4',
        title: 'Delhi',
        date: '2021-08-11',
        type:'City',
        // description: 'Unique experience in Paris!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
        country: 'India',
        continent: 'Europe',
        location: {
            lat: 48.8588443,
            lng: 2.2943506
        },
    },
    {
        id: 'p5',
        title: 'Great wall of China',
        date: '2021-08-11',
        type:'Nature',
        // description: 'Unique experience in Paris!',
        imageUrl: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg',
        country: 'China',
        continent: 'Europe',
        location: {
            lat: 48.8588443,
            lng: 2.2943506
        },
    },
]

const PlacesList:React.FC = () => {
    return(
        <section className={classes.placesList}>
            {DUMMY_PLACES.map((place) => {
                return (
                    <article key={place.id} style={{backgroundColor: place.type === "Nature" ? "var(--nature-color)" : "var(--city-color)"}} className={classes.place}>
                        <VisitedBanner  date={place.date} />
                        <img src={place.imageUrl} alt={place.title}/>
                        <div  className={classes.placeInfo}>
                            <h3 >{place.title}</h3>
                            <p>{place.country}</p>
                            </div>
                    </article>
                )
            })}
        </section>
    )
}
export default PlacesList