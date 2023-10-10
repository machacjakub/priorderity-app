import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { User } from "@supabase/gotrue-js";
import { IDoneActivity, IPlannedActivity } from "@/app/types";
import { Nullable } from "fputils";
import { PostgrestError } from "@supabase/supabase-js";

export interface IDbOperations {
	getUser: () => Promise<Nullable<User>>;
	getDoneActivities: () => Promise<Nullable<IDoneActivity[]>>;
	getPlannedActivities: () => Promise<Nullable<IPlannedActivity[]>>;
	addDoneActivity: (
		activityType: string,
	) => Promise<Nullable<PostgrestError>>;
	deleteDoneActivity: (
		activityId: number,
	) => Promise<Nullable<PostgrestError>>;
}

export const getDatabase = (): IDbOperations => {
	const supabase = createServerComponentClient({ cookies });

	return {
		getUser: async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			return user;
		},
		getDoneActivities: async () => {
			const { data: done } = await supabase
				.from("done-activities")
				.select()
				.order("created_at", {
					ascending: false,
				});
			return done;
		},
		getPlannedActivities: async () => {
			const { data: done } = await supabase
				.from("planned")
				.select()
				.order("priority", {
					ascending: false,
				});
			return done;
		},
		addDoneActivity: async (activityType: string) => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			const { data, error } = await supabase
				.from("done-activities")
				.insert({
					type: activityType,
					user_id: user?.id,
				});
			if (error) {
				return error;
			}
			return data;
		},
		deleteDoneActivity: async (activityId: number) => {
			const { data, error } = await supabase
				.from("done-activities")
				.delete()
				.eq("id", activityId);
			if (error) {
				return error;
			}
			return data;
		},
	};
};
