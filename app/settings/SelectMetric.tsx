import { IHealthMetric } from "@/app/types";
import { ChangeEvent } from "react";

export const SelectMetric = ( { metrics, value, onChange }: {metrics: IHealthMetric[], value: string, onChange: ( event: ChangeEvent<HTMLSelectElement> ) => void} ) => {
	return (
		<select className='text-black' value={value} onChange={onChange}>
			{metrics.map( metric => <option key={metric.name} value={metric.name}>{metric.label}</option> )}
		</select>
	);
};