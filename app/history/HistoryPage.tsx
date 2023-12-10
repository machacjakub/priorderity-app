"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity } from "@/app/types";
import { Nullable } from "fputils";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import useDoneActivities from "@/app/utils/hooks/useDoneActivities";
import { Responsive } from "@/app/modules/components/Responsive";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { PageHeadingMobile } from "@/app/modules/components/mobile/PageHeadingMobile";



interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
}
export const HistoryPage = ( { user, done }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const { doneActivities, deleteDoneActivity } = useDoneActivities(
		done ?? [],
	);
	return (
		<div>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<MenuDrawer
						user={user ?? null}
						onClose={
							profileNavIsDisplayed.setFalse
						}
						isOpen={
							profileNavIsDisplayed.value
						}
					/>
				)}
				<div className="flex h-screen w-full flex-col items-center">
					<Navbar
						user={user}
						onProfileClick={
							profileNavIsDisplayed.setTrue
						}
					/>
					{/*<HealthBarsMobile healthStats={getHealthStats( done ?? [] )}/>*/}

					<div className="mt-16 h-full w-screen overflow-auto">
						<PageHeadingMobile>History</PageHeadingMobile>
						<div className='mt-10'>
							<DoneActivitiesHistory
								doneActivities={
									doneActivities
								}
								handleDelete={
									deleteDoneActivity
								}
								daysVisible={20}
							/>
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
							user={
								user ??
								null
							}
							onClose={
								profileNavIsDisplayed.setFalse
							}
							isOpen={
								profileNavIsDisplayed.value
							}
						/>
					)}
					<div className="animate-in mt-16 h-full w-screen overflow-auto text-foreground">
						<DashboardSectionHeading>
							History
						</DashboardSectionHeading>
						<DoneActivitiesHistory
							doneActivities={
								doneActivities
							}
							handleDelete={
								deleteDoneActivity
							}
							daysVisible={20}
						/>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
