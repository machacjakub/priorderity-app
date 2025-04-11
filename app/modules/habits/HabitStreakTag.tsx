import { IStreaks } from "@/app/modules/habits/utils";

interface IProps {
    label: string;
	streaks: IStreaks
}

const colors = [ 'text-green-500','text-yellow-500','text-red-500' ];
export const HabitStreakTag = ( { label, streaks }: IProps ) => {
	const color = streaks.clearStreak > 0 ? 'green' : streaks.clearWithToday > 1 ? 'yellow' : 'red';
	return <div className='text-foreground bg-white dark:bg-background bg-gradient-to-tr from-white dark:from-background to-white dark:to-gray-400/30 py-3 px-5 border-l-2 border-b-2 border-l-blue-600 border-b-blue-600 dark:border-l-blue-300 dark:border-b-blue-300 rounded-xl flex flex-col'>
		<div className={'flex justify-between gap-3 w-full'}><span>{label}:</span> <span className={`text-${color}-500`}>{streaks.clearStreak} days {color === 'yellow' && <span className='text-foreground/60'>({streaks.clearWithToday})</span>}</span></div>
		<div className={'text-xs text-white/70'}>Since start: {streaks.totalStreak} days</div>
	</div>;
};