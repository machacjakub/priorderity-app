import { Simulate } from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

export interface IDoneActivity {
	id: number;
	type: string;
	created_at: Date;
}

export interface IPlannedActivity {
	id: number;
	name: string;
	created_at: Date;
	priority: number;
	deadline: Date;
}

export interface ITodoActivity extends IPlannedActivity {
	calculatedPriority: number;
}

export type CategoryAttributes = null | { points: number, duration: number };

export type TDefaultMetricsName = 'mental' | 'physical' | 'social' | 'career' | 'realization';
export const isDefaultMetricName = ( name: string ): name is TDefaultMetricsName => [ 'mental' , 'physical' , 'social' , 'career' , 'realization' ].includes( name );
export interface IActivityAttributes {
	type: string;
	physical: CategoryAttributes;
	mental: CategoryAttributes;
	social: CategoryAttributes;
	career: CategoryAttributes;
	realization: CategoryAttributes;
}


export interface IHealthStatsDefault {
	mental: number;
	physical: number;
	career: number;
	social: number;
	realization: number;
}

export interface IHealthMetric { name: string, label: string, hidden?: boolean }

export interface IHealthStat extends IHealthMetric { score: number }