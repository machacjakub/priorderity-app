import { App } from "@/app/App";
import { getDatabase } from "@/database/operations";
import { IUserData } from "@/app/modules/profile/types";
import { NewUserWelcome } from "@/app/NewUserWelcome";
import { WelcomePage } from "@/app/WelcomePage";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const done = await database.getDoneActivities();
	const planned = await database.getPlannedActivities();
	const user = await database.getUser();
	const userData: IUserData = ( user ? await database.getUserData( user.id ) : [] )[0];
	if ( !user ) {
		return <WelcomePage/>;
	}
	if ( !userData || !userData.firstname ) {
		return <NewUserWelcome/>;
	}
	return <App user={user} done={done} userData={userData} planned={planned}/>;

}
