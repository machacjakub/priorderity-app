import { IRule } from "@/app/modules/profile/types";

interface IProps {
    value: IRule["logicalOperator"];
    onChange: ( logicalOperator: IRule["logicalOperator"] ) => void;
}
export const LogicalOperatorSelect = ( { value, onChange }: IProps ) => {
	return <select className='text-black' value={value} onChange={( e ) => onChange( e.target.value as IRule["logicalOperator"] )}>
		<option key='and' value='and'>AND</option>
		<option key='or' value='or'>OR</option>
	</select>;
};