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
import { PredefinedActivitiesForm } from "@/app/settings/predefinedActivities/PredefinedActivitiesForm";
import { IUserData } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { PageHeadingMobile } from "@/app/modules/components/mobile/PageHeadingMobile";
import { RecommendationsForm } from "@/app/settings/recommendation/RecommendationsForm";
import { TagsForm } from "@/app/settings/tags/TagsForm";
import UserDataContext from "@/app/modules/context/userDataContext";
import { IHealthMetric } from "@/app/types";
import { defaultMetrics } from "@/app/App";
import { HabitsForm } from "@/app/settings/habits/HabitsForm";

interface IProps {
	user: Nullable<User>;
    userData: Nullable<IUserData>;
}

export const SettingsPage = ( { userData, user }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const userMetrics: IHealthMetric[] = userData?.metrics ?? defaultMetrics;
	const predefinedActivities = userData?.activities_stats ?? getPredefinedActivitiesAttributes();
	return (
		<UserDataContext.Provider value={userData && { ...userData, activities_stats: predefinedActivities, metrics: userMetrics }}>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<MenuDrawer
						firstname={userData?.firstname ?? null}
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
						<PageHeadingMobile>Settings</PageHeadingMobile>
						<div className='my-12'>
							<DashboardSectionHeadingMobile>Metrics</DashboardSectionHeadingMobile>
							<MetricsForm/>
							<DashboardSectionHeadingMobile>Tags</DashboardSectionHeadingMobile>
							<TagsForm />
							<DashboardSectionHeadingMobile>Predefined activities</DashboardSectionHeadingMobile>
							<PredefinedActivitiesForm />
							<DashboardSectionHeadingMobile>Recommendation</DashboardSectionHeadingMobile>
							<RecommendationsForm />
							<DashboardSectionHeadingMobile>Habits</DashboardSectionHeadingMobile>
							<HabitsForm/>
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
						<MenuDrawer firstname={userData?.firstname ?? null} user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
					)}
					<div className="animate-in mt-20 h-full w-screen overflow-auto text-foreground justify-center max-w-screen-2xl">
						<div className='grid grid-cols-2'>
							<div>
								<DashboardSectionHeading>Metrics</DashboardSectionHeading>
								<MetricsForm />
								<DashboardSectionHeading>Recommendation rules</DashboardSectionHeading>
								<RecommendationsForm/>
								<DashboardSectionHeading>Habits</DashboardSectionHeading>
								<HabitsForm/>
							</div>
							<div>
								<DashboardSectionHeading>Tags</DashboardSectionHeading>
								<TagsForm />
								<DashboardSectionHeading>Predefined activities</DashboardSectionHeading>
								<PredefinedActivitiesForm />
							</div>
						</div>
					</div>
				</div>
			</Responsive.Desktop>
		</UserDataContext.Provider>
	);
};
