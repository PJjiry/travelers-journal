import React from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import ContinentsContainer from '../../components/ContinentsContainer/ContinentsContainer.tsx';

const Main: React.FC = () => {
    return (
        <main className={classes.main}>
            <SearchBar/>
            <ContinentsContainer/>
        </main>
    )
}
export default Main