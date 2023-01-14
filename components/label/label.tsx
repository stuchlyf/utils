import React, {LabelHTMLAttributes} from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text?: string;
    altText?: string;
}

export const Label: React.FC<LabelProps> = ({text, altText, className, ...props}) => {
    const classes = ['label', className].join(' ');

    return (
        <label {...props} className={classes}>
            {text && <span className={'label-text'}>{text}</span>}
            {altText && <span className={'label-text'}>{altText}</span>}
        </label>
    )
}