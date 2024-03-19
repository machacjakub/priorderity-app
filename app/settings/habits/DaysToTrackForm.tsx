import { IHabit } from "@/app/modules/profile/types";

const DayButton = ( { editing, selected, day, onClick }: {editing?: boolean, selected: boolean, day: string, onClick: () => void} ) => {
	const selectedClassName = 'border-b-2 border-l-2 border-b-blue-400 border-l-blue-400 py-1.5 rounded-md w-full';
	const notSelectedClassName = 'border-b-2 border-l-2 border-b-background border-l-background py-1.5 rounded-md text-foreground/30 w-full';
	if ( editing ) {
		return ( selected
			? <button onClick={onClick} className={selectedClassName}>{day}</button>
			: <button onClick={onClick} className={notSelectedClassName}>{day}</button> );
	}
	return ( selected
		? <div className={selectedClassName}>{day}</div>
		: <div className={notSelectedClassName}>{day}</div> );
};
interface IProps {
	editing?: boolean;
	days: IHabit["daysToTrack"];
	onChange?: ( index: number ) => void;
}


const colors = [ 'bg-blue-500/20', 'bg-blue-500/70' ];
export const DaysToTrackForm = ( { editing, days, onChange }:IProps ) => {
	const daysOfWeek = [ 'MO','TU','WE','TH','FR','SA','SU' ];
	return (
		<div>
			<div className='flex'>
				{daysOfWeek.map( ( day, i ) => <div key={day} className='border border-4 border-background w-12 text-center'>
					<DayButton editing={editing} selected={days.includes( i )} day={day} onClick={() => onChange && onChange( i )} />
				</div> )}
			</div>
		</div>
	);
};