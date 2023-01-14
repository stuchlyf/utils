import React, {PropsWithChildren} from 'react';

export interface InputGroupProps extends PropsWithChildren {
}

export const InputGroup: React.FC<InputGroupProps> = ({children}) => {
	return (
		<label className={'input-group'}>
			{children}
		</label>
	)
}