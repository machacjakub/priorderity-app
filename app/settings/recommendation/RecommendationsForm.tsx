import { PlusOutlined } from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {
	IRecommendation
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useContext, useState } from "react";
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
import userDataContext from "@/app/modules/context/userDataContext";
import { Tags } from "@/app/modules/todo/Tags";

interface IActivityFormFieldProps {
    recommendation: IRecommendation ,
    userMetrics: IHealthMetric[],
    onDelete: ( activityType: string ) => void,
    onSave: ( label: string, rules: IRecommendation["rules"], tags: string[] ) => void
    isEditing?: boolean;
}

const RecommendationField = ( { recommendation, userMetrics, onDelete, onSave, isEditing } : IActivityFormFieldProps ) => {
	const editing = useBoolean( isEditing );
	const [ label, setLabel ] = useState<string>( recommendation.activityLabel );
	const [ rules, setRules ] = useState<IRecommendation["rules"]>( recommendation.rules );
	const [ tags, setTags ] = useState( recommendation.tags ?? [] );
	const userTags = useContext( userDataContext )?.tags ?? [];
	const handleSave = () => {
		onSave( label, rules, tags );
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
				?
				<div>
					<RuleEditForm rules={recommendation.rules} userMetrics={userMetrics} onChange={setRules}/>
					<div className='mt-2 mb-1'><Tags tags={userTags.map( tag => tags.includes( tag.label ) ? { ...tag, selected: true } : { ...tag, selected: false } )} onUpdate={( clicked: string ) => setTags( tags?.includes( clicked ) ? tags?.filter( tag => tag !== clicked ) : [ ...tags, clicked ] )}/></div>
				</div>
				:
				<div>
					<RuleCard rules={recommendation.rules} userMetrics={userMetrics}/>
					<div className='mt-2 mb-1'><Tags tags={userTags.filter( tag => tags.includes( tag.label ) ).map( tag => ( { ...tag, selected: true } ) )} readOnly={true}/></div>
				</div>
			}

		</div>
	);
};
export const RecommendationsForm = () => {
	const userData = useContext( userDataContext );
	const userMetrics = userData?.metrics ?? [];
	const [ recommendations, setRecommendations ] = useState<IRecommendation[]>( userData?.recommendations ?? [] );
	const addingNew = useBoolean( false );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const handleRuleDelete = ( activityType: string ) => setRecommendations( recommendations.filter( rule => rule.activityType !== activityType ) );
	const handleRuleUpdate = ( type: string ) => ( activityLabel: string, rules: IRecommendation["rules"], tags: string[] ) => {
		setRecommendations( recommendations.map( ( recommendation ) => recommendation.activityType === type ? ( { ...recommendation, activityLabel, rules, tags } ) : recommendation ) );
	};
	const handleAddNewRule = ( label: string, rules: IRecommendation["rules"], tags: string[] ) => {
		setRecommendations( [ ...recommendations, { activityType: labelToName( label ), activityLabel: label, rules, tags } ] );
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
				? <RecommendationField userMetrics={userMetrics} onDelete={addingNew.setFalse} onSave={handleAddNewRule} recommendation={{ activityLabel: '', activityType: '', rules: { logicalOperator: 'and', conditions: [] }, tags:[] }} isEditing={true} />
				: <div className='flex justify-center gap-4 my-2'>
					<AddButton onClick={addingNew.setTrue}/>
					{recommendations.length === 0 && (
						<button className='flex gap-2 bg-warning/20 border border-warning dark:border-warning/80 p-1 my-1
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