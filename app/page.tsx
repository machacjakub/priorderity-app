import { Suspense } from 'react';
import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { IUserData } from "@/app/modules/profile/types";
import { NewUserWelcome } from "@/app/NewUserWelcome";
import { App } from "@/app/App";

// Separate data fetching functions
async function getUser () {
	const database = getDatabase();
	return database.getUser();
}

async function getUserData ( userId: string ) {
	const database = getDatabase();
	return ( await database.getUserData( userId ) )[0];
}

async function getDoneActivities () {
	const database = getDatabase();
	return database.getDoneActivities();
}

async function getPlannedActivities () {
	const database = getDatabase();
	return database.getPlannedActivities();
}

// Loading components
function LoadingUser () {
	return <div>Loading user data...</div>;
}

function LoadingActivities () {
	return <div>Loading activities...</div>;
}

// Main component
export default async function Index () {
	const user = await getUser();

	if ( !user ) {
		return <WelcomePage />;
	}

	return (
		<Suspense fallback={<LoadingUser />}>
			<UserContent userId={user.id} />
		</Suspense>
	);
}

// User content component
async function UserContent ( { userId }: { userId: string } ) {
	const userData: IUserData = await getUserData( userId );

	if ( !userData || !userData.firstname ) {
		return <NewUserWelcome />;
	}

	return (
		<Suspense fallback={<LoadingActivities />}>
			<AppWithActivities userId={userId} userData={userData} />
		</Suspense>
	);
}

// App with activities component
async function AppWithActivities ( { userId, userData }: { userId: string, userData: IUserData } ) {
	const [ done, planned ] = await Promise.all( [
		getDoneActivities(),
		getPlannedActivities()
	] );

	return <App user={{ id: userId }} done={done} userData={userData} planned={planned} />;
}