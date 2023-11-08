"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import { Nullable } from "fputils";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { Responsive } from "@/app/modules/components/Responsive";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import { MetricsForm } from "@/app/settings/MetricsForm";
import { User } from "@supabase/gotrue-js";
import { PredefinedActivitiesForm } from "@/app/settings/PredefinedActivitiesForm";
import { IUserData } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { IHealthMetric } from "@/app/types";
import { defaultMetrics } from "@/app/App";



interface IProps {
	user: Nullable<User>;
    userData: Nullable<IUserData>;
}
export const SettingsPage = ( { userData, user }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const userMetrics: IHealthMetric[] = userData?.metrics ?? defaultMetrics;
	const predefinedActivities = userData?.activities_stats ?? getPredefinedActivitiesAttributes();
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
					<div className="mt-16 h-full w-screen overflow-auto text-foreground">
						<h1 className='font-semibold w-full text-lg px-4 pt-2 pb-4 fixed bg-gradient-to-b from-background via-background/70 to-transparent z-20'>Settings</h1>
						<div className='mt-12'>
							<DashboardSectionHeadingMobile>Metrics</DashboardSectionHeadingMobile>
							<MetricsForm userMetrics={userMetrics}/>
							<DashboardSectionHeadingMobile>Predefined activities</DashboardSectionHeadingMobile>
							<PredefinedActivitiesForm predefinedActivities={predefinedActivities} userMetrics={userMetrics}/>
						</div>
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
					<h1 className='text-foreground font-semibold w-full text-lg px-4 py-2 fixed bg-gradient-to-b from-background via-background/70 to-transparent z-20 mt-16'>Settings</h1>
					{profileNavIsDisplayed.value && (
						<MenuDrawer user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
					)}
					<div className="animate-in mt-20 h-full w-screen overflow-auto text-foreground justify-center">
						<div className='grid grid-cols-2'>
							<DashboardSectionHeading>Metrics</DashboardSectionHeading>
							<DashboardSectionHeading>Predefined activities</DashboardSectionHeading>
							<MetricsForm userMetrics={userMetrics}/>
							<PredefinedActivitiesForm predefinedActivities={predefinedActivities} userMetrics={userMetrics}/>
						</div>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
