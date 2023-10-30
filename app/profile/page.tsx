import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { ProfilePage } from "@/app/modules/profile/ProfilePage";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const user = await database.getUser();

	return (
		<div className="flex w-full flex-col items-center bg-background">
			{user ? (
				<ProfilePage user={user} />
			) : (
				<WelcomePage />
			)}
		</div>
	);
}
