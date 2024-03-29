import { ChangeEvent, useContext } from "react";
import userDataContext from "@/app/modules/context/userDataContext";

export const PredefinedActivitySelect = ( { value, onChange }: { value: string, onChange: ( event: ChangeEvent<HTMLSelectElement> ) => void} ) => {
	const userData = useContext( userDataContext );
	return (
		<select className='text-black w-12 pl-1 w-32' value={value} onChange={onChange}>
			<option key={'-'} value={'-'}>{'-'}</option>
			{userData?.activities_stats?.map( activity => <option key={activity.type} value={activity.type}>{activity.label}</option> )}
		</select>
	);
};