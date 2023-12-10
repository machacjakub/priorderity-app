import { IRecommendation } from "@/app/modules/profile/types";

export const mockRules: IRecommendation[] = [
	{
		activityType:  "30-ex",
		activityLabel: '30min exercise',
		rules: {
			logicalOperator: "and",
			conditions: [ { id: 0, comparisonOperator: "<", metric: 'physical_health', value: 60 }, { id: 1, comparisonOperator: "<", metric: 'mental_health', value: 40 } ],
		}
	},
	{
		activityType: "15-meditation",
		activityLabel: '15min meditation',
		rules: {
			logicalOperator: "and",
			conditions: [ { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 70 } ],
		}
	},
	{
		activityType: "40-reading",
		activityLabel: '40min reading',
		rules: {
			logicalOperator: "and",
			conditions: [ { id: 0, comparisonOperator: "<", userDuration: 80, activityType: '40-reading', unit: 'h' } ],
		}
	}
];