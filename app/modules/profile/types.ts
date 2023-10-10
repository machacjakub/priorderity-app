import { CategoryAttributes } from "@/app/types";

interface IFollowedMetric {
	name: string;
}

interface IPredefinedActivity {
	type: string;
	metrics: {
		[key: string]: CategoryAttributes;
	};
}

interface IUserSettings {
	followedMetrics: IFollowedMetric[];
	predefinedActivities: IPredefinedActivity[];
}
