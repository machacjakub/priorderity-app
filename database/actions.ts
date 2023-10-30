"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { IHealthMetric } from "@/app/types";
import { IPredefinedActivity } from "@/app/modules/profile/types";

const supabase = createServerActionClient( { cookies } );

export const handleAddDoneActivity = async ( type: string ) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	await supabase
		.from( "done-activities" )
		.insert( { type, user_id: user?.id } );

	revalidatePath( "/" );
};

export const handleDeleteDoneActivity = async ( activityId: number ) => {
	await supabase.from( "done-activities" ).delete().eq( "id", activityId );

	revalidatePath( "/" );
};
export const handleAddPlannedActivity = async ( {
	name,
	priority,
	deadline,
}: {
	name: string;
	priority: number;
	deadline: Date | null;
} ) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from( "planned" )
		.insert( { name, priority, deadline, user_id: user?.id } );

	console.log( "data: ", data );
	console.log( "error: ", error );
	revalidatePath( "/" );
};

export const handleDeletePlannedActivity = async ( activityId: number ) => {
	await supabase.from( "planned" ).delete().eq( "id", activityId );

	revalidatePath( "/" );
};

export const handleMarkAsDone = async ( activityId: number, type: string ) => {
	await supabase.from( "planned" ).delete().eq( "id", activityId );

	const {
		data: { user },
	} = await supabase.auth.getUser();
	await supabase
		.from( "done-activities" )
		.insert( { type, user_id: user?.id } );

	revalidatePath( "/" );
};

export const handleUpdateMetrics = async ( metrics: IHealthMetric[] ) => {
	const user = await supabase.auth.getUser();
	const { error } = await supabase.from( "profiles" ).update( { metrics } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	return error;
};

export const handleUpdatePredefinedActivities = async ( activities: IPredefinedActivity[] ) => {
	const user = await supabase.auth.getUser();
	await supabase.from( "profiles" ).update( { activities_stats: activities } ).eq( 'id', user?.data.user?.id );

	revalidatePath( "/" );
};


