import { IActivityAttributes, IDoneActivity, IHealthStats } from "@/app/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
 
export const isValidType = ( type: string, activities: IActivityAttributes[] ) => !!activities.find( activity => activity.type === type );
const getSingleStatPoints = ( rules: { points: number, duration: number } | null, hours: number ) => {
	if ( !rules ) return 0;
	const points = rules.duration >= hours ? rules.points : rules.points + rules.duration - hours;
	return points >= 0 ? points : 0;
};

const getStatsPoints = ( rules: IActivityAttributes, hours: number ) => {
	return {
		mental: getSingleStatPoints( rules.mental, hours ),
		physical: getSingleStatPoints( rules.physical, hours ),
		career: getSingleStatPoints( rules.career, hours ),
		realization: getSingleStatPoints( rules.realization, hours ),
		social: getSingleStatPoints( rules.social, hours ),
	};
};

const getCurrentStats = ( activity: IDoneActivity, activitiesRules: IActivityAttributes[] ): IHealthStats => {
	const lengthInHours = Math.floor( ( new Date().getTime() - new Date( activity.created_at ).getTime() ) / 3600000 );
	const thisActivityRules: IActivityAttributes = activitiesRules.filter( ( currentActivity ) => currentActivity.type === activity.type )[0];
	return getStatsPoints( thisActivityRules, lengthInHours );
};

export const getHealthStats = ( doneActivities: IDoneActivity[] ): IHealthStats => {
	return doneActivities.reduce( ( acc, curr ) => {
		const activitiesStats = getPredefinedActivitiesAttributes();
		if ( !isValidType( curr.type, activitiesStats ) ) {
			return acc;
		}
		return sumObjectProperties( getCurrentStats( curr, activitiesStats ), acc );
	}, { mental: 0, physical: 0, career: 0, social: 0, realization: 0 } );
};

export const sumObjectProperties = ( obj1: IHealthStats, obj2: IHealthStats ): IHealthStats => {
	return {
		mental: obj1.mental + obj2.mental,
		physical: obj1.physical + obj2.physical,
		career: obj1.career + obj2.career,
		social: obj1.social + obj2.social,
		realization: obj1.realization + obj2.realization,
	};
};

export const getHealthColor = ( percentage: number ) => {
	const red = 255 - ( percentage > 60 ? ( percentage - 60 ) * 4 : 0 );
	const green = 50 + ( percentage > 60 ? 170 : percentage * 2.8 );
	const blue = percentage < 60 ? 0 : ( percentage - 60 ) * 2;
	return `rgb(${red},${green},${blue})`;
};