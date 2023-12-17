import { CategoryAttributes, IHealthMetric } from "@/app/types";
import { Nullable } from "fputils";

export interface IPredefinedActivity {
	type: string;
	label: string;
	metrics: {
		[key: string]: CategoryAttributes;
	};
}


type INestedRule = {
	logicalOperator?: 'and' | 'or';
	conditions: IConditionDefinition[];
}

export type IConditionDefinition = IMetricConditionDefinition | IDurationConditionDefinition;
export type IConditionToCompute = IMetricConditionToCompute | IDurationConditionToCompute;

export type IMetricConditionDefinition = {
	id: number;
	comparisonOperator: '<' | '>';
	metric: string;
	value: number;
}

export interface IMetricConditionToCompute {
	comparisonOperator: IMetricConditionDefinition['comparisonOperator'];
	metricScore: number;
	value: number;
}

export type IDurationConditionDefinition = {
	id: number;
	comparisonOperator: '<' | '>';
	activityType: string;
	userDuration: number;
	unit: 'd' | 'h';
}

export interface IDurationConditionToCompute {
	comparisonOperator: IDurationConditionDefinition['comparisonOperator'];
	userHours: number;
	hoursSinceLast: number;
}

export type IRules = {
	logicalOperator?: 'and' | 'or';
	conditions: ( IConditionDefinition | INestedRule )[];
}

export interface IRecommendation {
	activityType: string;
	activityLabel: string;
	rules: IRules;
}

export const isConditionDefinitionType = ( input: IConditionDefinition | INestedRule ): input is IConditionDefinition => input.hasOwnProperty( 'comparisonOperator' );
export const isMetricConditionDefinition = ( input: IConditionDefinition ): input is IMetricConditionDefinition => input.hasOwnProperty( 'metric' );
export const isMetricConditionToCompute = ( input: IConditionToCompute | IMetricConditionToCompute ): input is IMetricConditionToCompute => input.hasOwnProperty( 'metricScore' );
export const isDurationConditionToCompute = ( input: IConditionToCompute | IDurationConditionToCompute ): input is IDurationConditionToCompute => input.hasOwnProperty( 'hoursSinceLast' );


export interface IUserData {
	id: string;
	updated_at: Nullable<number>
	username: Nullable<string>;
	website: Nullable<string>;
	created_at: Date;
	firstname: Nullable<string>;
	lastname: Nullable<string>;
	metrics: Nullable<IHealthMetric[]>;
	activities_stats: Nullable<IPredefinedActivity[]>;
	recommendations: Nullable<IRecommendation[]>;
}
