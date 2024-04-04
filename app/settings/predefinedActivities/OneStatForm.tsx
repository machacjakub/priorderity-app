import { ChangeEvent } from "react";
import { ArrowSmallUpOutlined, ClocksOutlined } from "@/icons";

interface IProps {
    metricLabel: string;
    defaultValues: {points?: number, duration?: number};
    onPointsChange: ( e: ChangeEvent<HTMLInputElement> ) => void;
    onDurationChange: ( e: ChangeEvent<HTMLInputElement> ) => void;
}
export const OneStatForm = ( { metricLabel, defaultValues, onPointsChange, onDurationChange }:IProps ) => {
	return ( <div className='text-sm flex gap-4 my-1 justify-between'>
		<div>{metricLabel}</div>
		<div className='flex gap-4'>
			<div className='flex'><ArrowSmallUpOutlined className='w-4 mx-1'/><input type='number' name='stat_points' className='w-12 text-black pl-1' onChange={onPointsChange} defaultValue={defaultValues.points}/></div>
			<div className='flex'><ClocksOutlined className='w-4 mx-1'/><input type='number' name='stat_duration' className='w-12 text-black pl-1' onChange={onDurationChange} defaultValue={defaultValues.duration}/></div>
		</div>
	</div> );
};