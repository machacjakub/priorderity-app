interface IProps {
    label: string;
    streak: number;
}

export const HabitStreakTag = ( { label, streak }: IProps ) => {
	return <div className='bg-background py-3 px-5 border-l-2 border-b-2 border-l-blue-600 border-b-blue-600 dark:border-l-blue-300 dark:border-b-blue-300 rounded-xl flex justify-between gap-3'>
		<span>{label}:</span> <span>{streak} days</span>
	</div>;
};