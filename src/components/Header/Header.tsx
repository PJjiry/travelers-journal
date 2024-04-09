import React, {memo} from 'react';
import {ImAirplane} from "react-icons/im";
import classes from './Header.module.css'
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import {useNavigate} from 'react-router-dom';

// Component for the header of the application with the logout button
const Header: React.FC = memo(() => {

    // using the navigate hook to redirect to the login page
    const navigate = useNavigate();

    // function to handle the logout using firebase signOut function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Render the header with the title, airplane icon and logout button
    return (
        <header className={classes.header}>
            <h1>Traveler's journal</h1>
            <ImAirplane/>
            <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
        </header>
    )
})

export default Header