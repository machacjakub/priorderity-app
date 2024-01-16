import { ChangeEvent } from "react";

export const SelectComparisonOperator = ( { value, onChange }: { value: string, onChange: ( event: ChangeEvent<HTMLSelectElement> ) => void} ) => {
	return (
		<select className='text-black mx-4 w-12 pl-1' value={value} onChange={onChange}>
			<option key={'<'} value={'<'}>{`<`}</option>
			<option key={'>'} value={'>'}>{`>`}</option>
		</select>
	);
};