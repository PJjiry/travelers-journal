import React from 'react';
import classes from './SearchBar.module.css'
import { MdSearch } from "react-icons/md";

const SearchBar: React.FC<{value: string, onSearch:(text:string)=>void}> = ({value, onSearch}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onSearch(newValue);
    }

    return (
        <section className={classes.searchBar}>
            <h2>Your places:</h2>
            <div className={classes.searchContainer}>
                <MdSearch/>
                <input type="search" value={value} onChange={handleChange} className={classes.searchInput} placeholder="Search places..."/>
            </div>
        </section>
    )
}
export default SearchBar