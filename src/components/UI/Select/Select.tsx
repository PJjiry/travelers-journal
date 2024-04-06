import React from 'react';
import classes from '../UI.module.css'
import {MdHelpOutline} from 'react-icons/md';
import {SelectProps} from '../../../types.ts';

const Select:React.FC<SelectProps> = ({title,name,tooltip,value,onSelectChange, children,...props}) => {
    return (
        <label htmlFor={name} className={classes.label}>
            {title}:
            <div className={classes.inputHelp}><select name={name} id={name}
                                                       value={value}
                                                       onChange={onSelectChange}
                                                       {...props}>
                {children}
            </select>
                <MdHelpOutline
                    title={tooltip}
                    className={classes.icon}/></div>
        </label>
    )
}
export default Select