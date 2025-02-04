import { Suspense } from 'react';
import { getDatabase } from "@/database/operations";
import { WelcomePage } from "@/app/WelcomePage";
import { IUserData } from "@/app/modules/profile/types";
import { NewUserWelcome } from "@/app/NewUserWelcome";
import { App } from "@/app/App";
import { User } from "@supabase/auth-js";

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
	'use server';
	const user = await getUser();

	if ( !user ) {
		return <WelcomePage />;
	}

	return (
		<Suspense fallback={<LoadingUser />}>
			<UserContent user={user} />
		</Suspense>
	);
}

// User content component
async function UserContent ( { user }: { user: User } ) {
	const userData: IUserData = await getUserData( user.id );

	if ( !userData || !userData.firstname ) {
		return <NewUserWelcome />;
	}

	return (
		<Suspense fallback={<LoadingActivities />}>
			<AppWithActivities user={user} userData={userData} />
		</Suspense>
	);
}

// App with activities component
async function AppWithActivities ( { user, userData }: { user: User, userData: IUserData } ) {
	const [ done, planned ] = await Promise.all( [
		getDoneActivities(),
		getPlannedActivities()
	] );

	return <App user={user} done={done} userData={userData} planned={planned} />;
}