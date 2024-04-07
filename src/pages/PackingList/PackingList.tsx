import React from 'react';
import classes from './PackingList.module.css';

const PackingList:React.FC = () => {
    return(
        <main className={classes.main}>
            <section className={classes.packingList}>
                <div className={classes.title}>
                    <h3>Packing List</h3>
                </div>
                <div className={classes.addItem}>
                    <input type="text" placeholder="Add an item"/>
                    <button>Add</button>
                </div>
                <div className={classes.packingListItems}>
                    <p>Here is a list of items you may need to pack for your trips:</p>
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <input type="checkbox"/>
                            <span>Passport</span>
                        </li>
                        <li className={classes.listItem}>
                            <input type="checkbox"/>
                            <span>Headphones</span>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    )
}
export default PackingList