'use server';
import {getDatabase} from "@/database/operations";
import {IDoneActivity} from "@/app/types";
import {Nullable} from "fputils";

const db = getDatabase();

export const getDoneActivities = async ( ):Promise<Nullable<IDoneActivity[]>> => {
	"use server";
	const result = await db.getDoneActivities();
	return result;
};
export async function addDoneActivity ( activityType: string ) {
	"use server";
	await db.addDoneActivity( activityType );
}

export async function deleteDoneActivity ( activityId: number ) {
	"use server";
	await db.deleteDoneActivity( activityId );
}