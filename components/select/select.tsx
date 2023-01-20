import React, {SelectHTMLAttributes, useMemo} from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{

}

export const Select: React.FC<SelectProps> = ({className, ...props}) => {
  const classes = useMemo(() => {
    return ['select', 'w-full', 'max-w-xs', className].join(' ')
  }, [className]);

  return (
    <select className={classes} {...props} data-choose-theme={''} />
  )
}