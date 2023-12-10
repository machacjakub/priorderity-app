import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { GuidePage } from "@/app/guide/GuidePage";

export const dynamic = "force-dynamic";

export default async function Index () {
	"use server";
	const database = getDatabase();
	const user = await database.getUser();

	return (
		<div className="flex w-full flex-col items-center bg-background">
			{user ? (
				<GuidePage user={user} />
			) : (
				<WelcomePage />
			)}
		</div>
	);
}
