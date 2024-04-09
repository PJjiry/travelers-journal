import React, {useContext} from 'react';
import classes from './PackingList.module.css';
import PackingListSection from '../../components/PackingListSection/PackingListSection.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

// Packing list page component...it displays the packing list section
const PackingList: React.FC = () => {

    // importing the packing list context to use its state
    const packingListCtx = useContext(PackingListContext);

    // if the packing list is loading, display a loading message
    if (packingListCtx?.loading) {
        return <div className={`${classes.main} loading`}>Loading...</div>
    }

    // if there is an error, display an error message
    if (packingListCtx?.error) {
        return <div className={`${classes.main} error`}>Error: {packingListCtx.error}</div>;
    }

    // render the packing list
    return (
        <main className={classes.main}>
            <PackingListSection/>
        </main>
    )
}

export default PackingList