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



interface IProps {
	user: Nullable<User>;
    userData: Nullable<any>;
}
export const SettingsPage = ( { userData, user }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );

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
						<MetricsForm userMetrics={userData[0].metrics}/>
						<DashboardSectionHeadingMobile>Predefined activities</DashboardSectionHeadingMobile>
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
						<DashboardSectionHeading>Metrics</DashboardSectionHeading>
						<MetricsForm userMetrics={userData[0].metrics}/>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
