import React from 'react';
import classes from './SearchBar.module.css'
import { MdSearch } from "react-icons/md";

const SearchBar: React.FC = () => {
    return (
        <section className={classes.searchBar}>
            <div className={classes.searchContainer}>
                <MdSearch/>
                <input type="search" className={classes.searchInput} placeholder="Search places..."/>
            </div>
        </section>
    )
}
export default SearchBar