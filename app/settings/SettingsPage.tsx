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
						<DashboardSectionHeading>Settings</DashboardSectionHeading>
						<DashboardSectionHeadingMobile>Metrics</DashboardSectionHeadingMobile>
						<MetricsForm userMetrics={userMetrics}/>
						<DashboardSectionHeadingMobile>Predefined activities</DashboardSectionHeadingMobile>
						<PredefinedActivitiesForm predefinedActivities={predefinedActivities} userMetrics={userMetrics}/>
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
						<MenuDrawer user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
					)}
					<div className="animate-in mt-16 h-full w-screen overflow-auto text-foreground flex flex-col justify-center">
						<DashboardSectionHeading>Settings</DashboardSectionHeading>
						<DashboardSectionHeading>Metrics</DashboardSectionHeading>
						<div className='w-screen flex justify-center'><MetricsForm userMetrics={userMetrics}/></div>
						<PredefinedActivitiesForm predefinedActivities={predefinedActivities} userMetrics={userMetrics}/>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
