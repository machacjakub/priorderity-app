'use client';
import {User} from "@supabase/gotrue-js";
import {Navbar} from "@/app/modules/components/Navbar";
import {ProfileNavigation} from "@/app/modules/profile/ProfileNavigation";
import {IDoneActivity} from "@/app/types";
import {Nullable} from "fputils";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {ActivitiesToAdd} from "@/app/modules/attributes-stats/ActivitiesToAdd";
import {DasboardSectionHeading} from "@/app/modules/components/DasboardSectionHeading";
import {DoneActivitiesHistory} from "@/app/modules/history/DoneActivitiesHistory";
import {HealthBars} from "@/app/modules/health-bars/HealthBars";
import {getHealthStats} from "@/app/modules/health-bars/utils";
import {useEffect, useState} from "react";
import {getDoneActivities} from "@/app/modules/done/doneModule";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

interface IProps {
	user: Nullable<User>;
    done: Nullable<IDoneActivity[]>;
}
export const App = ( {user, done}: IProps ) => {
	const [doneActivities, setDoneActivities] = useState<IDoneActivity[]>( done ?? [] );
	const supabase = createClientComponentClient();
	const profileNavIsDisplayed = useBoolean( false );
	useEffect( () => {
		const channel = supabase
			.channel( 'schema-db-changes' )
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'done-activities'
				},
				async( ) => {
					const newDone = await getDoneActivities();
					if ( newDone ){
						setDoneActivities( newDone );
					}
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel( channel );
		};
	}, [] );
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Navbar user={user} onProfileClick={profileNavIsDisplayed.toggle} />
			{profileNavIsDisplayed.value && <ProfileNavigation user={user} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>}
			<div className="w-full h-full animate-in text-foreground">
				<div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
					<div className="bg-blue-100 dark:bg-gray-900 flex justify-center items-center row-span-3 mt-16">to-do</div>
					<div className="bg-background col-span-2 mt-16">
						<DasboardSectionHeading>Stats</DasboardSectionHeading>
						<HealthBars healthStats={getHealthStats( doneActivities ?? [] )}/>
					</div>
					<div className="bg-background row-span-3 overflow-scroll mt-16 top">
						<DasboardSectionHeading>History</DasboardSectionHeading>
						<DoneActivitiesHistory doneActivities={doneActivities ?? []}/>
					</div>
					<div className="bg-background col-span-2 row-span-2 overflow-auto mt-16">
						<DasboardSectionHeading>Activities</DasboardSectionHeading>
						<ActivitiesToAdd/>
					</div>
				</div>
			</div>
		</div>
	);
};