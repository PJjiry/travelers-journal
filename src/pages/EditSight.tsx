import React from 'react';
import classes from '../components/PlacesList/PlacesList.module.css';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {DUMMY_PLACES} from '../dummy_places.ts';

const EditSight:React.FC = () => {
  return(
      <section>
        {DUMMY_PLACES.map((place) => {
          return (
              <article key={place.id} className={classes.place}>
                <img src={place.imageUrl} alt={place.title}/>
                <div className={classes.placeInfo}>
                  <h3>{place.title}</h3>
                  {/*<p>{place.description}</p>*/}
                  <p>{place.date}</p>
                  <p>{place.country}</p>
                  <p>{place.continent}</p>
                </div>
                <LoadScript googleMapsApiKey="AIzaSyAkJEGW4P__lSJITHtP_jSJl542ean0QIQ">
                  <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '200px' }}
                      center={{ lat: 40.7484405, lng: -73.9878531 }}
                      zoom={10}
                      options={{
                        draggable: false,
                        zoomControl: true,
                        scrollwheel: false,
                        streetViewControl: false,
                      }}
                  >
                    {DUMMY_PLACES.map((place) => (
                        <Marker key={place.id} position={{ lat: place.location.lat, lng: place.location.lng } } draggable={false} />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </article>
          )
        })}
      </section>
  )
}
export default EditSight