import {Client} from "@/app/Client";
import {getDatabase} from "@/database/operations";

export const dynamic = 'force-dynamic';

export default async function Index() {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const user = await database.getUser();


	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Client user={user} done={done} />
		</div> );
}
