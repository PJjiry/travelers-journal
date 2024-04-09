import React, {useContext} from 'react';
import classes from './PackingList.module.css';
import PackingListSection from '../../components/PackingListSection/PackingListSection.tsx';
import PackingListContext from '../../store/PackingListContext.tsx';

const PackingList: React.FC = () => {
    const PackingListCtx = useContext(PackingListContext);
    if (PackingListCtx?.loading) {
        return <div className={`${classes.main} loading`}>Loading...</div>
    }

    if (PackingListCtx?.error) {
        return <div className={`${classes.main} error`}>Error: {PackingListCtx.error}</div>;
    }

    return (
        <main className={classes.main}>
            <PackingListSection/>
        </main>
    )
}
export default PackingList