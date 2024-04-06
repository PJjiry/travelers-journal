import React from 'react';
import classes from './SightForm.module.css';
import {MdHelpOutline} from 'react-icons/md';
import {FaTrashAlt} from 'react-icons/fa';
import {SightFormProps} from '../../types.ts';

const SightForm: React.FC<SightFormProps> = ({
                                                 sightName,
                                                 sightDescription,
                                                 sights,
                                                 onAddSight,
                                                 onRemoveSight,
                                                 onSightChange
                                             }) => {
    return (
        <label htmlFor="sights" className={`${classes.label} ${classes.sightsBox}`}>
            <div className={classes.sights}>
                <div className={classes.sightsTitle}>
                    <h4>Sights to visit (optional):</h4>
                    <MdHelpOutline
                        title="Mention sights you want to or have visited in the city. Add also basic description of each site."
                        className={classes.icon}/></div>
                <div
                    className={classes.sightsContainer}>{sights && sights.map((sight) => (
                    <div className={classes.sightItem} key={sight.sightName}>
                                    <span
                                        title={`Sight name: ${sight.sightName} \nSight description: ${sight.sightDescription}`}
                                        key={sight.sightName}>{sight.sightName}</span><FaTrashAlt
                        onClick={() => onRemoveSight(sight.sightName)}/></div>
                ))}</div>
            </div>
            <div className={classes.sightInputs}>
                <input className={classes.input} name="sightName" id="sightName" value={sightName}
                       onChange={onSightChange} placeholder="Sight Name"/>
                <input className={classes.input} name="sightDescription" id="sightDescription"
                       value={sightDescription}
                       onChange={onSightChange}
                       placeholder="Sight Description"/>
            </div>
            <button className={classes.addSightButton} type="button" onClick={onAddSight}
            >Add sight
            </button>
        </label>
    )
}
export default SightForm