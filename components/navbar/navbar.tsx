import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement>{}

export const Navbar: React.FC<NavbarProps> = ({className, ...props}) => {
	const classes = ['navbar', className].join(' ');

	return (
		<div {...props} className={classes}/>
	)
}