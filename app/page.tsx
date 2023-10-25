import { App } from "@/app/App";
import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const planned = await database.getPlannedActivities();
	const user = await database.getUser();
	const userData = user ? await database.getUserData( user.id ) : null;
	return (
		<div className="flex w-full flex-col items-center bg-background">
			{user ? (
				<App
					user={user}
					done={done}
					userData={userData[0]}
					planned={planned}
				/>
			) : (
				<WelcomePage />
			)}
		</div>
	);
}
