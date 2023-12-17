import { ReactNode } from "react";

type IColors = 'error' | 'warning' | 'success';
type ISize = 'lg' | 'sm' | 'xl';

interface IButtonProps {
	children: string | ReactNode;
	type?: 'secondary' | 'tertiary';
	size?: ISize;
	color?: IColors;
	tailwind?: string;
	onClick?: () => void;
	buttonType?: 'submit';
}

const getSize = ( size?: ISize ) => {
	switch ( size ) {
	case "sm":
		return 'px-4 py-1 text-sm sm:text-base';
	case "lg":
		return 'px-6 py-2 sm:text-lg font-semibold';
	case "xl":
		return 'px-8 py-3 sm:text-xl font-semibold';
	default:
		return 'px-5 py-1.5 font-semibold';
	}
};

const getPrimaryButtonColor = ( color?: IColors ) => {
	switch ( color ) {
	case "error":
		return 'bg-error hover:bg-error/80';
	case "warning":
		return 'bg-warning hover:bg-warning/80';
	case "success":
		return 'bg-success-light dark:bg-success-dark hover:bg-success-light/80 dark:hover:bg-success-dark/80';
	default:
		return 'bg-action-light dark:bg-action-dark hover:bg-action-light/80 dark:hover:bg-action-dark/80';
	}
};
const getSecondaryButtonColor = ( color?: IColors ) => {
	switch ( color ) {
	case "error":
		return 'border-error hover:bg-error/80';
	case "warning":
		return 'border-warning hover:bg-warning/80';
	case "success":
		return 'border-success-light dark:border-success-dark hover:bg-success-light/80 dark:hover:bg-success-dark/80';
	default:
		return 'border-action-light dark:border-action-dark hover:bg-action-light/80 dark:hover:bg-action-dark/80';
	}
};

const getTertiaryButtonColor = ( color?: IColors ) => {
	switch ( color ) {
	case "error":
		return 'hover:text-error';
	case "warning":
		return 'hover:text-warning/80';
	case "success":
		return 'hover:text-success-light/80 dark:hover:text-success-dark/80';
	default:
		return 'hover:text-action-light/80 dark:hover:text-action-dark/80';
	}
};

export const Button = ( { children, type, tailwind, onClick, size, color, buttonType }: IButtonProps ) => {
	if ( type === 'tertiary' ) {
		return ( <button type={buttonType} formAction={onClick} className={`text-foreground ${getTertiaryButtonColor( color )} sm:text-md rounded-xl ${getSize( size )} ${tailwind}`}>
			{children}
		</button> );
	}
	if ( type === 'secondary' ) {
		return ( <button type={buttonType} formAction={onClick} className={`text-foreground ${getSecondaryButtonColor( color )} border sm:text-md rounded-xl hover:bg-blue-400 ${getSize( size )}  ${tailwind}`}>
			{children}
		</button> );
	}
	return (
		<button type={buttonType} formAction={onClick} className={`text-foreground ${getPrimaryButtonColor( color )} sm:text-md rounded-xl  ${getSize( size )}  ${tailwind}`}>
			{children}
		</button>
	);
};