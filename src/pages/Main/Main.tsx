import React from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import PlacesList from '../../components/PlacesList/PlacesList.tsx';

const Main:React.FC = () => {
  return(
      <main className={classes.main}>
        <SearchBar />
          <PlacesList/>
      </main>
  )
}
export default Main