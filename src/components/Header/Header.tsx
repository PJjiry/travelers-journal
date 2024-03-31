import React from 'react';
import {ImAirplane} from "react-icons/im";
import classes from './Header.module.css'

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <h1>Traveler's journal</h1>
            <ImAirplane/>
        </header>
    )
}
export default Header