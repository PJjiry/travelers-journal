import React, {memo} from 'react';
import classes from './SearchBar.module.css'
import { MdSearch } from "react-icons/md";

// Component for displaying the search bar with a search input
const SearchBar: React.FC<{value: string, onSearch:(text:string)=>void}> = memo(({value, onSearch}) => {

    // function to handle the search input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onSearch(newValue);
    }

    // Render the title and search bar with a search input
    return (
        <section className={classes.searchBar}>
            <h2>Your places:</h2>
            <div className={classes.searchContainer}>
                <MdSearch/>
                <input type="search" value={value} onChange={handleChange} className={classes.searchInput} placeholder="Search places..."/>
            </div>
        </section>
    )
})

export default SearchBar