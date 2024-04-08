import React from 'react';
import classes from './About.module.css';

const About: React.FC = () => {
    return (
        <main className={classes.main}>
            <h3>About Traveller's journal</h3>
            <article className={classes.motivation}>
                <h4>Motivation</h4>
                <p>
                    This project was created as a part of the bachelor thesis for the Prague University of Economics and Business.
                    The goal was to create a web application using React.js and TypeScript.
                </p>
            </article>
        </main>
    )
}
export default About