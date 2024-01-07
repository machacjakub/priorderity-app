import { getDatabase } from "@/database/operations";
import { GuidePage } from "@/app/guide/GuidePage";
import { IUserData } from "@/app/modules/profile/types";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const user = await database.getUser();
	const userData: IUserData = ( user ? await database.getUserData( user.id ) : [] )[0];
	return (
		<div className="flex w-full flex-col items-center bg-background">
			<GuidePage firstname={userData?.firstname ?? null} user={user} />
		</div>
	);
}
