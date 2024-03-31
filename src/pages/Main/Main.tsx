import React from 'react';
import classes from './Main.module.css'
import SearchBar from '../../components/SearchBar/SearchBar.tsx';

const Main:React.FC = () => {
  return(
      <main className={classes.main}>
        <SearchBar />
      </main>
  )
}
export default Main