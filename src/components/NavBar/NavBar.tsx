import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './NavBar.module.css'
import { FaHome } from "react-icons/fa";

const NavBar:React.FC = () => {
    return(
        <nav className={classes.navbar}>
            <ul className={classes.links}>
                <li className={classes.home}><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/'><FaHome /></NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/new-sight'>New sight</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/packing-list'>Packing list</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? classes.active : undefined} to='/about'>About</NavLink></li>
            </ul>
        </nav>
    )
}
export default NavBar