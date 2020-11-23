import React from 'react';
import {inputContainer, selected as selectedClass,inputLabel, input} from './RadioButton.module.scss';

const RadioButton = ({name, children, value, selected, handleSelect}) => {
    return (
        <div className={`${inputContainer} ${selected ? selectedClass : ''}`}>
            <label className={inputLabel} htmlFor={value}>{children}</label>
            <input onClick={handleSelect} className={input} type="radio" name={name} id={value} value={value}  />
        </div>
    )
}

export default RadioButton