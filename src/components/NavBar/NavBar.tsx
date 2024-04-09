import React, {memo} from 'react';
import {NavLink} from 'react-router-dom'
import classes from './NavBar.module.css'
import {FaHome} from "react-icons/fa";

// Component for the navigation bar tha contains the links to the main pages of the App
const NavBar: React.FC = memo(() => {

    // Render the navigation bar with the links
    return (
        <nav className={classes.navbar}>
            <ul className={classes.links}>
                <li className={classes.home}><NavLink className={({isActive}) => isActive ? classes.active : undefined}
                                                      to='/'><FaHome/></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/new-place'>New
                    place</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/packing-list'>Packing
                    list</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined}
                             to='/about'>About</NavLink></li>
            </ul>
        </nav>
    )
})

export default NavBar