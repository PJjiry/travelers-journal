import React from 'react';
import classes from './About.module.css';

const About: React.FC = () => {
    return (
        <main className={classes.main}>
            <h3>About Traveller's journal</h3>
            <article className={classes.article}>
                <h4>Motivation</h4>
                <p>
                    This project was created as a part of my bachelor thesis for the Prague University of Economics and
                    Business.
                    The goal was to create a web application using React.js and TypeScript.</p>
                <p>For author of this project, it was a great opportunity to learn modern web development technologies
                    and improve his skills of programming.
                    This application will be useful mainly for author, who likes to travel and wants to keep track of
                    his trips and plan his future trips. Author is planning to mainly use this application during his
                    next
                    exchange programme on his Master's degree.
                </p>
            </article>
            <article className={classes.article}>
                <h4>Functionality</h4>
                <p>
                    Traveller's journal is a web application that allows user to create his own trips (places that he
                    visited or is planning to visit).
                    Users can add, edit and delete trips.</p>
                <p>Each trip has several attributes like name of destination, date, description, country and continent, special requirements to enter the
                    location, budget spent on the trip, location in the map and photos.
                    User can also view all trips grouped according the continent and search for specific trip. Each
                    trip has type, which can be either nature or city.
                    If the type is set to city, user can also add the sights he visited during the trip. </p>
                <p>The last part of the application is packing list, where user can create his own list of things that he needs to pack for the
                    trips. He can also add, edit, delete items from the list and check them as packed. In the future, author is planning to add more
                    features like creating a profile, sharing trips with other users, adding comments and ratings to the trips and sights.
                </p>
            </article>
        </main>
    )
}
export default About