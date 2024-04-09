import React from 'react';
import {ImAirplane} from "react-icons/im";
import classes from './Header.module.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import {useNavigate} from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <header className={classes.header}>
            <h1>Traveler's journal</h1>
            <ImAirplane/>
            <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
        </header>
    )
}
export default Header