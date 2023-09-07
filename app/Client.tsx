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

interface IProps {
	user: Nullable<User>;
    done: Nullable<IDoneActivity[]>;
	add: ( activity: string ) => void;
}
export const Client = ( {user, done, add}: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Navbar user={user} onProfileClick={profileNavIsDisplayed.toggle} />
			{profileNavIsDisplayed.value && <ProfileNavigation user={user} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>}
			<div className="w-full h-full animate-in text-foreground">
				<div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
					<div className="bg-blue-100 dark:bg-gray-900 flex justify-center items-center row-span-3">to-do</div>
					<div className="bg-blue-100 dark:bg-gray-900 flex justify-center items-center col-span-2">health-bars</div>
					<div className="bg-background row-span-3">
						<DasboardSectionHeading>History</DasboardSectionHeading>
						<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
						<DoneActivitiesHistory doneActivities={done ?? []}/>
					</div>
					<div className="bg-background col-span-2 row-span-2">
						<DasboardSectionHeading>Activities</DasboardSectionHeading>
						<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
						<ActivitiesToAdd/>
					</div>
				</div>
			</div>
		</div>
	);
};