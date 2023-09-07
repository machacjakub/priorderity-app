'use server';
import {getDatabase} from "@/database/operations";

const db = getDatabase();
export async function addDoneActivity ( activityType: string ) {
	"use server";
	await db.addDoneActivity( activityType );
}

export async function deleteDoneActivity ( activityId: number ) {
	"use server";
	await db.deleteDoneActivity( activityId );
}