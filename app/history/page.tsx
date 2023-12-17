import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { HistoryPage } from "@/app/history/HistoryPage";
import { IUserData } from "@/app/modules/profile/types";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const user = await database.getUser();
	const userData: IUserData = ( user ? await database.getUserData( user.id ) : [] )[0];

	return (
		<div className="flex w-full flex-col items-center bg-background">
			{user ? (
				<HistoryPage user={user} done={done} userData={userData} />
			) : (
				<WelcomePage />
			)}
		</div>
	);
}
