import React from 'react';
import classes from '../UI.module.css'
import {MdHelpOutline} from 'react-icons/md';
import {InputProps} from '../../../types.ts';

// Component for displaying the input field or textarea with a title and tooltip
const Input: React.FC<InputProps> = ({name, title, tooltip, hasNoIcon, isTextarea, value, onInputChange, ...props}) => {

    // Render the input field or textarea with a title and tooltip
    return (
        <label htmlFor={name} className={classes.label}>
            {title}:
            <div className={classes.inputHelp}>
                {isTextarea ?
                    <textarea id={name}
                              {...props}
                              name={name} value={value}
                              onChange={onInputChange}/> :
                    <input type="text" id={name}
                           {...props}
                           name={name} value={value}
                           onChange={onInputChange}/>}
                {!hasNoIcon &&
                    <MdHelpOutline
                        title={tooltip}
                        className={classes.icon}/>}
            </div>
        </label>
    )
}

export default Input