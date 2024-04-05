import {
	IDoneActivity,
	IHealthMetric,
	IHealthStat
} from "@/app/types";
import { Optional } from "fputils";
import { IPredefinedActivity } from "@/app/modules/profile/types";
const getSingleStatPoints = (
	rules: { points: number; duration: number } | null,
	hours: number,
) => {
	if ( !rules ) return 0;
	const points =
		rules.duration >= hours
			? rules.points
			: rules.points + rules.duration - hours;
	return points >= 0 ? points : 0;
};

const getStatsPoints = ( rules: IPredefinedActivity, hours: number, userMetrics: IHealthMetric[] ): IHealthStat[] => {
	const getRules = ( name: string ) => rules.metrics[ name ];
	return userMetrics.map( metric => ( { ...metric, score: getSingleStatPoints( getRules( metric.name ), hours ) } ) );
};

const getCurrentStats = (
	activity: IDoneActivity,
	activitiesRules: IPredefinedActivity[],
	userMetrics: IHealthMetric[],
	day?: Date
): Optional<IHealthStat[]> => {
	const lengthInHours = Math.floor(
		( ( day ? day.getTime() : new Date().getTime() ) -
			new Date( activity.created_at ).getTime() ) /
			3600000,
	);
	const thisActivityAssignedRules: IPredefinedActivity | undefined = !!activity.stats ? { metrics: activity.stats ?? {}, type: activity.type, label: activity.label } : undefined;
	if ( thisActivityAssignedRules ) {
		return getStatsPoints( thisActivityAssignedRules, lengthInHours, userMetrics );
	}
	const thisActivityPredefinedRules: IPredefinedActivity | undefined = activitiesRules.find(
		( currentActivity ) => currentActivity.type === activity.type,
	);
	if ( thisActivityPredefinedRules === undefined ) {
		return;
	}
	return getStatsPoints( thisActivityPredefinedRules, lengthInHours, userMetrics );
};

export const isNotHidden = ( metric: IHealthMetric ): boolean => !metric.hidden;

export const getHealthStats = ( doneActivities: IDoneActivity[], userMetrics: IHealthMetric[], activitiesStats: IPredefinedActivity[], day?:Date ): IHealthStat[] => {
	return doneActivities.reduce(
		( acc, curr ) => {
			const currentStats = getCurrentStats( curr, activitiesStats, userMetrics, day );
			if ( currentStats === undefined ) {
				return acc;
			}
			return sumHealthStatsScores(
				currentStats,
				acc,
			);
		},
		userMetrics.map( metric => ( { ...metric, score: 0 } ) ),
	);
};

export const sumHealthStatsScores = (
	arr1: IHealthStat[],
	arr2: IHealthStat[],
): IHealthStat[] => {
	return arr1.map( ( healthStat, i ) => ( { ...healthStat, score: healthStat.score + arr2[i].score } ) ) ;
};

export const getHealthColor = ( percentage: number ) => {
	const red = 255 - ( percentage > 60 ? ( percentage - 60 ) * 4 : 0 );
	const green = 50 + ( percentage > 60 ? 170 : percentage * 2.8 );
	const blue = percentage < 60 ? 0 : ( percentage - 60 ) * 2;
	return `rgb(${red},${green},${blue})`;
};
