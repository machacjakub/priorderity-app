"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { IHealthMetric } from "@/app/types";
import { IPredefinedActivity, IRecommendation } from "@/app/modules/profile/types";
import { labelToName } from "@/app/modules/utils";

const supabase = createServerActionClient( { cookies } );

export const handleAddDoneActivity = async ( activity: IPredefinedActivity ) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	await supabase
		.from( "done-activities" )
		.insert( { type: activity.type, label: activity.label, user_id: user?.id } );

	revalidatePath( "/" );
};

export const handleDeleteDoneActivity = async ( activityId: number ) => {
	await supabase.from( "done-activities" ).delete().eq( "id", activityId );

	revalidatePath( "/" );
};

export interface IHandleAddPlannedActivityArguments { name: string; priority: number; deadline: Date | null; }
export type IHandleAddPlannedActivity = ( { name, priority, deadline }: IHandleAddPlannedActivityArguments ) => void;
export const handleAddPlannedActivity = async ( { name, priority, deadline, }: { name: string; priority: number; deadline: Date | null; } ) => {
	const { data: { user }, } = await supabase.auth.getUser();
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

export interface IHandleUpdatePlannedActivityArguments { id: number, name: string; priority: number; deadline: Date | null; }
export type IHandleUpdatePlannedActivity = ( { id, name, priority, deadline }: IHandleUpdatePlannedActivityArguments ) => void;
export const handleUpdatePlannedActivity = async ( { id, name, priority, deadline, }: IHandleUpdatePlannedActivityArguments ) => {
	const { data, error } = await supabase
		.from( "planned" )
		.update( { name, priority, deadline } )
		.eq( 'id', id );

	console.log( "data: ", data );
	console.log( "error: ", error );
	revalidatePath( "/" );
};

export const handleMarkAsDone = async ( activityId: number, label: string ) => {
	await supabase.from( "planned" ).delete().eq( "id", activityId );
	const {
		data: { user },
	} = await supabase.auth.getUser();
	await supabase
		.from( "done-activities" )
		.insert( { type: labelToName( label ), label: label, user_id: user?.id } );

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

export const handleUpdateRecommendations = async ( recommendations: IRecommendation[] ) => {
	const user = await supabase.auth.getUser();
	await supabase.from( "profiles" ).update( { recommendations } ).eq( 'id', user?.data.user?.id );

	revalidatePath( "/" );
};


