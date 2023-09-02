'use client';
import {User} from "@supabase/gotrue-js";
import {Navbar} from "@/app/modules/components/Navbar";
import {ProfileNavigation} from "@/app/modules/profile/ProfileNavigation";
import {ActivitiesList} from "@/app/modules/history/ActivitiesList";
import {IDoneActivity} from "@/app/types";
import {Nullable} from "fputils";
import useBoolean from "@/app/utils/hooks/useBoolean";

interface IProps {
	user: Nullable<User>;
    done: Nullable<IDoneActivity[]>;
}
export const Client = ( {user, done}: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Navbar user={user} onProfileClick={profileNavIsDisplayed.toggle} />
			{profileNavIsDisplayed.value && <ProfileNavigation user={user} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>}
			<div className="w-full h-full animate-in text-foreground">
				<div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
					<div className="bg-gray-700 flex justify-center items-center row-span-3">to-do</div>
					<div className="bg-gray-700 flex justify-center items-center col-span-2">health-bars</div>
					<div className="bg-gray-700 row-span-3">
						<h1 className="py-3 text-center">History</h1>
						<p></p>
						<ActivitiesList activities={done ?? []}/>
					</div>
					<div className="bg-gray-700 flex justify-center items-center col-span-2 row-span-2">activities-menu</div>
				</div>
			</div>
		</div>
	);
};