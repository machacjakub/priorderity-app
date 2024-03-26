interface IProps {
    label: string;
    streak: number;
	streakWithoutToday: number;
}

const colors = [ 'text-green-500','text-yellow-500','text-red-500' ];
export const HabitStreakTag = ( { label, streak, streakWithoutToday }: IProps ) => {
	const color = streak > 0 ? 'green' : streakWithoutToday > 1 ? 'yellow' : 'red';
	return <div className='text-foreground bg-background py-3 px-5 border-l-2 border-b-2 border-l-blue-600 border-b-blue-600 dark:border-l-blue-300 dark:border-b-blue-300 rounded-xl flex justify-between gap-3'>
		<span>{label}:</span> <span className={`text-${color}-500`}>{streak} days {color === 'yellow' && <span className='text-foreground/60'>({streakWithoutToday})</span>}</span>
	</div>;
};