import { IRecommendation } from "@/app/modules/profile/types";

export const mockRules: IRecommendation[] = [
	{
		activityType:  "30-ex",
		activityLabel: '30min exercise',
		rules: {
			logicalOperator: "or",
			conditions: [ { id: 0, comparisonOperator: "<", metric: 'physical_health', value: 60 }, { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 40 } ],
		},
		tags: [],
	},
	{
		activityType: "15-meditation",
		activityLabel: '15min meditation',
		rules: {
			logicalOperator: "and",
			conditions: [ { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 70 } ],
		},
		tags: [],
	}
];