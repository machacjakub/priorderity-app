import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { SettingsPage } from "@/app/settings/SettingsPage";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const user = await database.getUser();
	const userData = user ? await database.getUserData( user.id ) : null;
	return (
		<div className="flex w-full flex-col items-center bg-background">
			{user ? (
				<SettingsPage userData={userData[0]} user={user}/>
			) : (
				<WelcomePage />
			)}
		</div>
	);
}
