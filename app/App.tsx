"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity, IHealthMetric, IPlannedActivity } from "@/app/types";
import { Nullable } from "fputils";
import { ActivitiesToAdd } from "@/app/modules/attributes-stats/ActivitiesToAdd";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { getHealthStats } from "@/app/modules/health-bars/utils";
import { ActivitiesToDo } from "@/app/modules/todo/ActivitiesToDo";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";
import useDoneActivities from "@/app/utils/hooks/useDoneActivities";
import { Responsive } from "@/app/modules/components/Responsive";
import { HealthBarsMobile } from "@/app/modules/health-bars/HealthBarsMobile";
import { ActivitiesToDoMobile } from "@/app/modules/todo/ActivitiesToDoMobile";
import { DoneActivitiesHistoryMobile } from "@/app/modules/history/DoneActivitiesHistoryMobile";
import { ActivitiesToAddMobile } from "@/app/modules/attributes-stats/ActivitiesToAddMobile";
import { BottomBarButton } from "@/app/modules/components/mobile/BottomBarButton";
import { HealthBars } from "@/app/modules/health-bars/HealthBars";
import { useEffect, useRef } from "react";
import { PlusOutlined } from "@/icons";
import { IUserData } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";

interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
	planned: Nullable<IPlannedActivity[]>;
	userData: Nullable<IUserData>;
}

export const defaultMetrics: IHealthMetric[] = [ { name: 'mental', label: 'Mental health', hidden: false }, { name: 'physical', label: 'Physical health', hidden: false }, { name: 'social', label: 'Relationships', hidden: false }, { name: 'realization', label: 'Realization', hidden: false } ];

export const App = ( { user, done, planned, userData }: IProps ) => {
	const pageLengthRef = useRef<HTMLDivElement | null>( null );
	const displaySrollButton = useBoolean( false );
	const profileNavIsDisplayed = useBoolean( false );
	const todoFormDisplayed = useBoolean( false );
	const { doneActivities, addDoneActivity, deleteDoneActivity } =
		useDoneActivities( done ?? [] );

	useEffect( () => {
		const checkVisibility = () => {
			const element = pageLengthRef.current;
			if ( element ) {
				const rect = element.getBoundingClientRect();
				const isVisible = (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
					rect.right <= ( window.innerWidth || document.documentElement.clientWidth )
				);
				displaySrollButton.setValue( !isVisible );
			}
		};
		checkVisibility();
	}, [] );
	// const scrollToTop = () => {
	// 	if ( !isBrowser() ) return;
	// 	window.scrollTo( {
	// 		top: 0,
	// 		behavior: "smooth",
	// 	} );
	// };
	const userMetrics: IHealthMetric[] = userData?.metrics ?? defaultMetrics;
	const predefinedActivities = userData?.activities_stats ?? getPredefinedActivitiesAttributes();
	return (
		<div>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<MenuDrawer user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
				)}
				<div className="flex w-screen flex-col items-center">
					<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
					{todoFormDisplayed.value && (
						<TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value}/>
					)}
					<div className="mt-16 h-full w-screen">
						<HealthBarsMobile healthStats={getHealthStats( done ?? [], userMetrics, predefinedActivities )}/>
						<ActivitiesToDoMobile planned={planned ?? []}/>
						<ActivitiesToAddMobile onAdd={addDoneActivity} predefinedActivities={predefinedActivities}/>
						<DoneActivitiesHistoryMobile doneActivities={doneActivities} handleDelete={deleteDoneActivity}/>
						<div ref={pageLengthRef}/>
						<div className="fixed bottom-0 w-screen px-2 text-right">
							<BottomBarButton onClick={todoFormDisplayed.setTrue} icon={<PlusOutlined />}/>
						</div>
						{/*This button was removed because the dashboard page in not ready yet */}
						{/*<div className="m-6 text-center text-foreground" onClick={scrollToTop}>*/}
						{/*	<UpOutlined className="text-3xl"/>*/}
						{/*	<p>back to the top</p>*/}
						{/*</div>*/}
					</div>
				</div>
			</Responsive.Mobile>
			<Responsive.Desktop>
				<div className="flex h-screen w-full flex-col items-center">
					<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
					{profileNavIsDisplayed.value && ( <MenuDrawer user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/> )}
					{todoFormDisplayed.value && ( <TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value}/> )}
					<div className="animate-in h-full w-full text-foreground">
						<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
							<div className="relative col-span-1 row-span-3 mt-16 overflow-auto bg-background">
								<ActivitiesToDo onFormOpen={todoFormDisplayed.setTrue} planned={planned ?? []}/>
							</div>
							<div className="col-span-2 mt-16 bg-background">
								<HealthBars
									healthStats={getHealthStats(
										done ??
											[], userMetrics, predefinedActivities
									)}
								/>
							</div>
							<div className="top row-span-3 mt-16 overflow-auto bg-background">
								<DoneActivitiesHistory doneActivities={doneActivities} handleDelete={deleteDoneActivity}/>
							</div>
							<div className="col-span-2 row-span-2 mt-16 overflow-auto bg-background">
								<ActivitiesToAdd onAdd={addDoneActivity} predefinedActivities={predefinedActivities}/>
							</div>
						</div>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
