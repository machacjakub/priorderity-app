"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { IHealthMetric } from "@/app/types";
import { IHabit, IPredefinedActivity, IRecommendation, ITag } from "@/app/modules/profile/types";
import { getLogger } from "@/app/modules/logger/logger";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const supabase = createServerActionClient( { cookies } );

const logSupabaseResult = ( module: string, result: PostgrestSingleResponse<null>, successMessage: string, errorMessage: string, detail?: string ) => {
	const log = getLogger( module );
	if ( result.error ) {
		log.error( result.statusText,errorMessage, result.error.message, detail );
	} else {
		log.info( result.statusText, successMessage, detail );
	}
};
export const handleAddDoneActivity = async ( activity: { label: string; type: string; } ) => {
	const { data: { user } } = await supabase.auth.getUser();
	const result = await supabase
		.from( "done-activities" )
		.insert( { type: activity.type, label: activity.label, user_id: user?.id } );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleAddDoneActivity', result,'New doneActivity successfully added','Failed to add doneActivity',JSON.stringify( activity ) );
};

export const handleUpdateDoneActivity = async ( { id, created_at }: {id: number, created_at: Date} ) => {
	const { data: { user } } = await supabase.auth.getUser();
	const result = await supabase
		.from( "done-activities" )
		.update( { created_at } )
		.eq( 'id', id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdateDoneActivity', result,'DoneActivity successfully updated','Failed to update doneActivity',`activityId: ${id}` );
};

export const handleDeleteDoneActivity = async ( activityId: number ) => {
	const result = await supabase.from( "done-activities" ).delete().eq( "id", activityId );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleDeleteDoneActivity', result,'DoneActivity successfully deleted','Failed to delete doneActivity', `activityId: ${activityId}` );
};

export interface IHandleAddPlannedActivityArguments { name: string; priority: number; deadline: Date | null; delayed_to: Date | null; tags: string[] }
export type IHandleAddPlannedActivity = ( { name, priority, deadline, delayed_to, tags }: IHandleAddPlannedActivityArguments ) => void;
export const handleAddPlannedActivity = async ( { name, priority, deadline, delayed_to, tags }: { name: string; priority: number; deadline: Date | null; delayed_to: Date | null; tags: string[] } ) => {
	const { data: { user }, } = await supabase.auth.getUser();
	const result = await supabase
		.from( "planned" )
		.insert( { name, priority, deadline, delayed_to, tags, user_id: user?.id } );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleAddPlannedActivity', result, 'PlannedActivity successfully created','Failed to create plannedActivity', JSON.stringify( { name, priority, deadline, delayed_to, tags } ) );
};

export const handleDeletePlannedActivity = async ( activityId: number ) => {
	const result = await supabase.from( "planned" ).delete().eq( "id", activityId );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleDeletePlannedActivity', result,'PlannedActivity successfully deleted', 'Failed to delete plannedActivity',`activityId: ${activityId}` );
};

export interface IHandleUpdatePlannedActivityArguments { id: number, name: string; priority: number; deadline: Date | null; delayed_to: Date | null; tags: string[] }
export type IHandleUpdatePlannedActivity = ( { id, name, priority, deadline, delayed_to, tags }: IHandleUpdatePlannedActivityArguments ) => void;
export const handleUpdatePlannedActivity = async ( { id, name, priority, deadline, delayed_to, tags }: IHandleUpdatePlannedActivityArguments ) => {
	const result = await supabase
		.from( "planned" )
		.update( { name, priority, deadline, delayed_to, tags } )
		.eq( 'id', id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdatePlannedActivity', result, 'PlannedActivity successfully updated','Failed to update plannedActivity',JSON.stringify( { name, priority, deadline, delayed_to, tags } ) );
};

export const handleUpdateMetrics = async ( metrics: IHealthMetric[] ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { metrics } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdateMetrics', result,'Metrics successfully updated','Failed to update metrics' );
};
export const handleUpdateTags = async ( tags: ITag[] ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { tags } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdateTags', result, 'Tags successfully updated', 'Failed to update tags' );
};

export const handleUpdatePredefinedActivities = async ( activities: IPredefinedActivity[] ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { activities_stats: activities } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdatePredefinedActivities', result,'PredefinedActivities successfully updated','Failed to update predefinedActivities' );
};

export const handleUpdateHabits = async ( activities: IHabit[] ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { habits: activities } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdatePredefinedActivities', result,'Habits successfully updated','Failed to update habits' );
};

export const handleUpdateRecommendations = async ( recommendations: IRecommendation[] ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { recommendations } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleUpdateRecommendations', result,'Recommendations successfully updated', 'Failed to update recommendations' );
};

export const handleSaveFirstname = async ( firstname: string ) => {
	const user = await supabase.auth.getUser();
	const result = await supabase.from( "profiles" ).update( { firstname } ).eq( 'id', user?.data.user?.id );
	revalidatePath( "/" );
	logSupabaseResult( 'db - handleSaveFirstname',result,'Firstname successfully saved','Failed to save firstname', firstname );
};


