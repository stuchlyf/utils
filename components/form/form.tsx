import React, {FormHTMLAttributes} from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {

}

export const Form: React.FC<FormProps> = ({className, ...props}) => {
    const classes = ['form', className].join(' ');

    return (
        <form {...props} className={classes}/>
    )
}