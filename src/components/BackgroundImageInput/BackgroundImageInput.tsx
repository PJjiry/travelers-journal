import React from 'react';
import classes from './BackgroundImageInput.module.css';
import {FaImage} from 'react-icons/fa6';
import {MdHelpOutline} from 'react-icons/md';
import {ImageInputProps} from '../../types.ts';

const BackgroundImageInput:React.FC<ImageInputProps> = ({name,title,imageUrl,tooltip,onRemoveImage,onImageChange,onImageDrop,...props}) => {
    return (
        <div className={classes.imageFlexbox} >
            <label htmlFor={name} onDrop={onImageDrop} onDragOver={(event) => event.preventDefault()} className={`${classes.label} ${classes.customFileInput}`}>
                {title}:
                <input className={classes.hiddenFileInput} type="file" name="image"
                       multiple={false}
                       {...props}
                       id="image" accept=".jpg,.png,.jpeg"
                       onChange={onImageChange}/>
                <FaImage/>
                <div className={classes.imagePreview}>
                    {imageUrl &&
                        <img onClick={onRemoveImage} title="Remove current image and pick a new one."
                             src={imageUrl} alt="Background image"/>}
                </div>
            </label>
            <MdHelpOutline
                title={tooltip}
                className={classes.icon}/>
        </div>
    )
}
export default BackgroundImageInput