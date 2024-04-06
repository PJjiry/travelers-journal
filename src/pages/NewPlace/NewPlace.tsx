import React from 'react';
import classes from './NewPlace.module.css';
import PlaceForm from '../../components/PlaceForm/PlaceForm.tsx';



const NewPlace: React.FC = () => {


    return (
        <main className={classes.main}>
            <PlaceForm title="Add a new place"/>
        </main>
    );
};

export default NewPlace;