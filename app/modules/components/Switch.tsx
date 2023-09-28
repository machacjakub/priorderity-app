import useBoolean from "@/app/utils/hooks/useBoolean";

type Sizes = 'tiny' | 'small' | 'medium' | 'large';
interface IProps {
    value: boolean;
    size?: Sizes
	onToggle? : () => void;
}

interface ISizeVariants {
    [key: string]: {
        outer: string;
        inner: string;
    }
}
export const Switch = ( {value, size, onToggle}: IProps ) => {
	const isSelected = useBoolean( value );
	const sizeVariants: ISizeVariants = {
		tiny: {
			outer:`${isSelected.value ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} w-10 h-5 rounded-full p-0.5 cursor-pointer`,
			inner:`bg-gray-700 w-4 h-4 ${isSelected.value && 'transform translate-x-5'} duration-500 rounded-full`,
		},
		small: {
			outer:`${isSelected.value ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} w-12 h-6 rounded-full p-0.5 cursor-pointer`,
			inner:`bg-gray-700 w-5 h-5 ${isSelected.value && 'transform translate-x-6'} duration-500 rounded-full`,
		},
		medium: {
			outer:`${isSelected.value ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} w-16 h-8 rounded-full p-0.5 cursor-pointer`,
			inner:`bg-gray-700 w-7 h-7 ${isSelected.value && 'transform translate-x-8'} duration-500 rounded-full`,
		},
		large: {
			outer: `${isSelected.value ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} w-20 h-10 rounded-full p-1 cursor-pointer`,
			inner: `bg-gray-700 w-8 h-8 ${isSelected.value && 'transform translate-x-10'} duration-500 rounded-full`,
		},
	};
	return (
		<div className={`${sizeVariants[size ?? 'tiny'].outer} transform duration-500`} onClick={() => {
			onToggle && onToggle();
			isSelected.toggle();
		}
		}>
			{!isSelected.value ?
				<div id='on' className={`${sizeVariants[size ?? 'tiny'].inner}`}></div>
				:
				<div id='off' className={`${sizeVariants[size ?? 'tiny'].inner} bg-blue-600`}></div>}
		</div>
	);
};