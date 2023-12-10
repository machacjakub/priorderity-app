export interface IDoneActivity {
	id: number;
	type: string;
	label: string;
	created_at: Date;
}

export interface IPlannedActivity {
	id: number;
	name: string;
	created_at: Date;
	priority: number;
	deadline: Date | null;
}

export interface ITodoActivity extends IPlannedActivity {
	calculatedPriority: number;
	isRecommended: boolean;
}

export type CategoryAttributes = null | { points: number, duration: number };

export interface IHealthMetric { name: string, label: string, hidden?: boolean }

export interface IHealthStat extends IHealthMetric { score: number }