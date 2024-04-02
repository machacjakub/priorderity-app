import { IPredefinedActivity, IUserData } from "@/app/modules/profile/types";
import { OneStatForm } from "@/app/settings/predefinedActivities/OneStatForm";

interface IProps {
	userMetrics: IUserData['metrics']
	metrics: IPredefinedActivity['metrics'];
	onChange: ( x: IPredefinedActivity['metrics'] ) => void;
}

export const PredefinedStatsForm = ( { userMetrics, metrics, onChange }: IProps ) => {
	return <div>
	  {userMetrics?.map( ( metric ) =>
		  <OneStatForm key={`${metric.name}`} metricLabel={metric.label} defaultValues={{ points:metrics[metric.name]?.points, duration: metrics[metric.name]?.duration }} onDurationChange={( e ) => onChange( { ...metrics, [metric.name]: { duration: Number( e.target.value ), points: metrics[metric.name]?.points ?? 0 } } )} onPointsChange={( e ) => onChange( { ...metrics, [metric.name]: { points: Number( e.target.value ), duration: metrics[metric.name]?.duration ?? 0 } } )}/>
	  )}
	</div>;
};