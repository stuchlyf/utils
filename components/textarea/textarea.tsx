import React, {TextareaHTMLAttributes} from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{

}

export const Textarea: React.FC<TextareaProps> = ({className, ...props}) => {
  const classes = ['textarea', className].join(' ')

  return (
    <textarea {...props} className={classes} />
  )
}