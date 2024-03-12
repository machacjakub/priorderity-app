import { ITag } from "@/app/modules/profile/types";

interface IProps {
    value: ITag['color'];
    onChange:( e: any ) => void;
}
export const TagColorPicker = ( { value, onChange }: IProps ) => {
	return <div className='my-auto mr-4'>
		<select id="colorSelect" value={value} onChange={onChange} className='text-black'>
			<option value="gray">Select a color</option>
			<option value="yellow">Yellow</option>
			<option value="red">Red</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
			<option value="orange">Orange</option>
			<option value="gray">Gray</option>
			<option value="cyan">Cyan</option>
			<option value="pink">Pink</option>
			<option value="purple">Purple</option>
			<option value="lime">Lime</option>
		</select>
	</div>;
};