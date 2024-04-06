import React from 'react';
import classes from '../UI.module.css'
import {MdHelpOutline} from 'react-icons/md';
import {InputProps} from '../../../types.ts';

const Input:React.FC<InputProps> = ({name, title, tooltip, isTextarea,value, onInputChange,...props}) => {
    return (
        <label htmlFor={name} className={classes.label}>
            {title}:
            <div className={classes.inputHelp}>
                {isTextarea ? <textarea id={name}
                                        {...props}
                                        name={name} value={value}
                                        onChange={onInputChange}/> :
                    <input type="text" id={name}
                            {...props}
                           name={name} value={value}
                           onChange={onInputChange}/>}
                <MdHelpOutline
                    title={tooltip}
                    className={classes.icon}/></div>
        </label>
    )
}
export default Input