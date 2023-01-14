import React from 'react';
import Image from 'next/image';
import utilsLogo from '../../public/utils-logo.svg';
import {Button} from "@/components/button/button";
import {IonIcon} from '@ionic/react';
import {Navbar} from "@/components/navbar/navbar";

export interface HeaderProps {
	onDrawerToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({onDrawerToggle: handleDrawerToggle}) => {
	return (
		<header className={'p-2'}>
			<Navbar className={'h-16 rounded-2xl flex items-center navbar-center bg-base-100'}>
				<label
					htmlFor={'menu-drawer'}
					className={'btn btn-ghost btn-square drawer-button'}
					onClick={handleDrawerToggle}
				>
					<IonIcon icon={'menu'} className={'text-2xl'}/>
				</label>
				<Button className={'btn-ghost'} href={'/'}>
					<Image
						src={utilsLogo}
						alt={'Utils Logo'}
						height={36}
					/>
				</Button>
			</Navbar>
		</header>
	)
}