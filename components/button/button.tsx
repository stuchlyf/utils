import React, {ButtonHTMLAttributes} from 'react'
import Link, {LinkProps} from "next/link";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & Omit<LinkProps, 'href'> & {
	href?: string;
};

export const Button: React.FC<ButtonProps> = ({className, href, ...props}) => {
	const classes = ['btn', className].join(' ')
	if (href) {
		return (
			<Link {...props} href={href} className={classes}/>
		)
	} else {
		return (
			<button {...props} className={classes}/>
		)
	}
}