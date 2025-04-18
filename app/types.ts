import { IPredefinedActivity } from "@/app/modules/profile/types";

export interface IDoneActivity {
	id: number;
	type: string;
	label: string;
	created_at: Date;
	stats?: IPredefinedActivity['metrics'];
	planned?: ITodoActivity
}

export interface IPlannedActivity {
	id: number;
	name: string;
	created_at: Date;
	priority: number;
	deadline: Date | null;
	delayed_to: Date | null;
	tags?: string [];
	stats?: IPredefinedActivity['metrics']
}

export interface ITodoActivity extends IPlannedActivity {
	calculatedPriority: number;
	isRecommended: boolean;
}

export type CategoryAttributes = null | { points: number, duration: number };

export interface IHealthMetric { name: string, label: string, hidden?: boolean }

export interface IHealthStat extends IHealthMetric { score: number }