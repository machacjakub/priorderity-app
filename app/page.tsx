import {App} from "@/app/App";
import {getDatabase} from "@/database/operations";
import {WelcomePage} from "@/app/WelcomePage";

export const dynamic = 'force-dynamic';

export default async function Index() {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const user = await database.getUser();


	return (
		<div className="w-full flex flex-col items-center bg-background">
			{ user ? <App user={user} done={done} /> : <WelcomePage />}
		</div> );
}
