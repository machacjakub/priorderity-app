"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity } from "@/app/types";
import { Nullable } from "fputils";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import useDoneModule from "@/app/utils/hooks/useDoneModule";
import { Responsive } from "@/app/modules/components/Responsive";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { PageHeadingMobile } from "@/app/modules/components/mobile/PageHeadingMobile";
import { IUserData } from "@/app/modules/profile/types";
import DoneModuleContext from "@/app/modules/context/doneModuleContext";
import { User } from "@supabase/auth-js";



interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
	userData: IUserData;
}
export const HistoryPage = ( { user, done, userData }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	return (
		<DoneModuleContext.Provider value={useDoneModule( done ?? [], userData )}>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<MenuDrawer
						firstname={userData?.firstname ?? null}
						user={user ?? null}
						onClose={profileNavIsDisplayed.setFalse}
						isOpen={profileNavIsDisplayed.value}
					/>
				)}
				<div className="flex h-screen w-full flex-col items-center">
					<Navbar
						user={user}
						onProfileClick={
							profileNavIsDisplayed.setTrue
						}
					/>
					<div className="mt-16 h-full w-screen overflow-auto">
						<PageHeadingMobile>History</PageHeadingMobile>
						<div className='mt-10'>
							<DoneActivitiesHistory daysVisible={20}/>
						</div>
						<div className="h-20" />
					</div>
				</div>
			</Responsive.Mobile>
			<Responsive.Desktop>
				<div className="flex h-screen w-full flex-col items-center">
					<Navbar
						user={user}
						onProfileClick={
							profileNavIsDisplayed.setTrue
						}
					/>
					{profileNavIsDisplayed.value && (
						<MenuDrawer
							firstname={userData?.firstname ?? null}
							user={user ?? null}
							onClose={profileNavIsDisplayed.setFalse}
							isOpen={profileNavIsDisplayed.value}
						/>
					)}
					<div className="animate-in mt-16 h-full w-screen overflow-auto text-foreground">
						<DashboardSectionHeading>
							History
						</DashboardSectionHeading>
						<DoneActivitiesHistory daysVisible={20}/>
					</div>
				</div>
			</Responsive.Desktop>
		</DoneModuleContext.Provider>
	);
};
