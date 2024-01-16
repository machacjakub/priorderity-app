import { PlusOutlined } from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {
	IRecommendation
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useState } from "react";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { delay, labelToName } from "@/app/modules/utils";
import { handleUpdateRecommendations } from "@/database/actions";
import { EditButton } from "@/app/settings/EditButton";
import { DoneButton } from "@/app/settings/DoneButton";
import { DeleteButton } from "@/app/settings/DeleteButton";
import { mockRules } from "@/database/mockData";
import { AddButton } from "@/app/settings/AddButton";
import { RuleEditForm } from "@/app/settings/recommendation/RuleEditForm";
import { RuleCard } from "@/app/settings/recommendation/RuleCard";

interface IActivityFormFieldProps {
    recommendation: IRecommendation ,
    userMetrics: IHealthMetric[],
    onDelete: ( activityType: string ) => void,
    onSave: ( label: string, rules: IRecommendation["rules"] ) => void
    isEditing?: boolean;
}

const RecommendationField = ( { recommendation, userMetrics, onDelete, onSave, isEditing } : IActivityFormFieldProps ) => {
	const editing = useBoolean( isEditing );
	const [ label, setLabel ] = useState<string>( recommendation.activityLabel );
	const [ rules, setRules ] = useState<IRecommendation["rules"]>( recommendation.rules );
	const handleSave = () => {
		onSave( label, rules );
		editing.setFalse();
	};
	return (
		<div className='border-2 p-2 pl-4 rounded-xl my-2'>
			<div className='flex justify-between'>
				{editing.value ? <input className='text-black pl-1' defaultValue={label} onChange={( e ) => setLabel( e.target.value ) }/> : <div className='mt-0.5 flex'>{label}</div>}
				<div className='flex gap-2'>
					{editing.value
						? <DoneButton onClick={handleSave} />
						: <EditButton onClick={editing.setTrue} />}
					<DeleteButton onClick={() => onDelete( recommendation.activityType )} />
				</div>
			</div>
			{editing.value
				? <RuleEditForm rules={recommendation.rules} userMetrics={userMetrics} onChange={setRules}/>
				:
				<RuleCard rules={recommendation.rules} userMetrics={userMetrics}/>
			}
		</div>
	);
};
export const RecommendationsForm = ( { recommendationRules, userMetrics }: { recommendationRules: IRecommendation[], userMetrics: IHealthMetric[]} ) => {
	const [ recommendations, setRecommendations ] = useState<IRecommendation[]>( recommendationRules );
	const addingNew = useBoolean( false );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const handleRuleDelete = ( activityType: string ) => setRecommendations( recommendations.filter( rule => rule.activityType !== activityType ) );
	const handleRuleUpdate = ( type: string ) => ( activityLabel: string, rules: IRecommendation["rules"] ) => {
		setRecommendations( recommendations.map( ( recommendation ) => recommendation.activityType === type ? ( { ...recommendation, activityLabel, rules } ) : recommendation ) );
	};
	const handleAddNewRule = ( label: string, rules: IRecommendation["rules"] ) => {
		setRecommendations( [ ...recommendations, { activityType: labelToName( label ), activityLabel: label, rules } ] );
		addingNew.setFalse();
	};

	const handleAddInspiration = ( ) => {
		setRecommendations( [ ...recommendations, ...mockRules ] );
	};

	const handleSave = async () => {
		loading.setTrue();
		await handleUpdateRecommendations( recommendations );
		loading.setFalse();
		done.setTrue();
		await delay( 4000 );
		done.setFalse();
	};
	return (
		<div className='text-foreground px-4 mb-2'>
			{recommendations.map( ( rule, i ) => <RecommendationField key={`${i}-${rule.activityType}`} recommendation={rule} userMetrics={userMetrics} onDelete={handleRuleDelete} onSave={handleRuleUpdate( rule.activityType )} /> )}
			{addingNew.value
				? <RecommendationField userMetrics={userMetrics} onDelete={addingNew.setFalse} onSave={handleAddNewRule} recommendation={{ activityLabel: '', activityType: '', rules: { logicalOperator: 'and', conditions: [] } }} isEditing={true} />
				: <div className='flex justify-center gap-4'>
					<AddButton onClick={addingNew.setTrue}/>
					{recommendations.length === 0 && (
						<button className='flex gap-2 bg-warning/20 border border-warning dark:border-warning/80 p-1 my-3
						 rounded-full text-sm' onClick={handleAddInspiration}>
							<PlusOutlined/> <span className='my-auto pr-2'>Add some for inspiration</span>
						</button>
					)}
				</div>
			}
			<div className='text-right'><SaveChangesButton loading={loading.value} done={done.value} onClick={handleSave}/></div>
		</div>
	);
};