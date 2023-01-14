import React, {InputHTMLAttributes} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input: React.FC<InputProps> = ({className, ...props}) => {
    const classes = ['input', className].join(' ');

    return (
        <input {...props} className={classes}/>
    )
}