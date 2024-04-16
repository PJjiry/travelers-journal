import React, {memo, useEffect, useState} from 'react';
import {ImAirplane} from "react-icons/im";
import classes from './Header.module.css'
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import {useNavigate} from 'react-router-dom';

// Component for the header of the application with the logout button
const Header: React.FC = memo(() => {

    // using the navigate hook to redirect to the login page
    const navigate = useNavigate();

    // state to store the current user's name
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // state to control the visibility of the logout button
    const [showLogout, setShowLogout] = useState<boolean>(false);

    // function to handle the logout using firebase signOut function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // useEffect to update the userName state when the auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUserEmail(user?.email || 'Anonymous');
        });

        // Cleanup function to unsubscribe from the auth state listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    // Render the header with the title, airplane icon and logout button
    return (
        <header className={classes.header}>
            <h1>Traveler's journal</h1>
            <ImAirplane/>
            <span onClick={() => setShowLogout(!showLogout)} className={classes.userName}>
                {userEmail}
            </span>
            {showLogout && <menu className={classes.menu}>
                <span>User email: {userEmail}</span>
                <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
            </menu>
            }
        </header>
    )
})

export default Header