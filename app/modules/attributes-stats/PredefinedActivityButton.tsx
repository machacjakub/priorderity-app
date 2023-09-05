interface IProps {
    activity:string;
	handleClick: ( activity: string ) => void;
}

export const PredefinedActivityButton = ( {activity, handleClick}: IProps ) => {
	return <button className="bg-blue-400 text-center rounded-lg p-3 w-44 flex-grow max-w-40" onClick={async() => {
		await handleClick( activity );
		return null;
	}}>{activity}</button>;
};