import { CategoryAttributes, IHealthMetric } from "@/app/types";
import { Nullable } from "fputils";

interface IPredefinedActivity {
	type: string;
	metrics: {
		[key: string]: CategoryAttributes;
	};
}


export interface IUserData {
	id: string;
	updated_at: Nullable<number>
	username: Nullable<string>;
	website: Nullable<string>;
	created_at: Date;
	firstname: Nullable<string>;
	lastname: Nullable<string>;
	metrics: Nullable<IHealthMetric[]>;
	predefinedActivities: Nullable<IPredefinedActivity[]>;
	recommended: Nullable<any>;
}
