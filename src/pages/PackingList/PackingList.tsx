import React from 'react';
import classes from './PackingList.module.css';
import PackingListSection from '../../components/PackingListSection/PackingListSection.tsx';

const PackingList: React.FC = () => {
    return (
        <main className={classes.main}>
            <PackingListSection/>
        </main>
    )
}
export default PackingList