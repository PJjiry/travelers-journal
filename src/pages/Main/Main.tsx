import React, {useContext} from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ContinentsContainer from '../../components/ContinentsContainer/ContinentsContainer.tsx';
import PlacesContext from '../../store/PlacesContext.tsx';
import {Link} from 'react-router-dom';

const Main: React.FC = () => {
    const placesCtx = useContext(PlacesContext);
    if(placesCtx?.places.length===0) {
        return <div className={classes.noPlaceDiv}>
            <h3 className={classes.noPlaceTitle} >No places created. Click on this button to add new place to get started!</h3>
            <Link className={classes.linkButton} to='/new-place'>Add new place</Link>
        </div>
    }

    return (
        <main className={classes.main}>
            <SearchBar/>
            <ContinentsContainer/>
        </main>
    )
}
export default Main