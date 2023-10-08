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

export type CategoryAttributes = null | { points: number; duration: number };

export interface IActivityAttributes {
	type: string;
	physical: CategoryAttributes;
	mental: CategoryAttributes;
	social: CategoryAttributes;
	career: CategoryAttributes;
	realization: CategoryAttributes;
}

export interface IHealthStats {
	mental: number;
	physical: number;
	career: number;
	social: number;
	realization: number;
}
