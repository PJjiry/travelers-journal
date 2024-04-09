import React from 'react';
import classes from './NewPlace.module.css';
import PlaceForm from '../../components/PlaceForm/PlaceForm.tsx';

// Component for adding a new place with a form
const NewPlace: React.FC = () => {

    // Render the form for adding a new place
    return (
        <main className={classes.main}>
            <PlaceForm title="Add a new place"/>
        </main>
    );
};

export default NewPlace;