import React, {useContext, useState} from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ContinentsContainer from '../../components/ContinentsContainer/ContinentsContainer.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {Link} from 'react-router-dom';

const Main: React.FC = () => {
    const placesCtx = useContext(PlacesContext);
    const [searchValue, setSearchValue] = useState<string>('');

    if (placesCtx?.places.length === 0) {
        return <div className={classes.noPlaceDiv}>
            <h3 className={classes.noPlaceTitle}>No places created. Click on this button to add new place to get
                started!</h3>
            <Link className={classes.linkButton} to='/new-place'>Add new place</Link>
        </div>
    }

    const handleSearchPlace = (value: string) => {
        setSearchValue(value);
    }

    const searchedPlaces = placesCtx!.places.filter((place) => {
        return place.title.toLowerCase().includes(searchValue.toLowerCase()) || place.country.toLowerCase().includes(searchValue.toLowerCase());
    })

    if (placesCtx?.loading) {
        return <div className="loading" style={{color:'var(--text-dark)'}}>Loading...</div>
    }

    if (placesCtx?.error) {
        return <div className="error">Error: {placesCtx.error}</div>;
    }


    return (
        <main className={classes.main}>
            <SearchBar value={searchValue} onSearch={handleSearchPlace}/>
            <ContinentsContainer searchedPlaces={searchedPlaces}/>
        </main>
    )
}
export default Main