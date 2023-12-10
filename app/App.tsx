"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity, IHealthMetric, IPlannedActivity } from "@/app/types";
import { Nullable } from "fputils";
import { ActivitiesToAdd } from "@/app/modules/attributes-stats/ActivitiesToAdd";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { getHealthStats, isNotHidden } from "@/app/modules/health-bars/utils";
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
import { useRef } from "react";
import { PlusOutlined } from "@/icons";
import { IUserData } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import usePlannedActivities from "@/app/utils/hooks/usePlannedActivities";
import { labelToName } from "@/app/modules/utils";
import { getTodoActivities } from "@/app/modules/todo/todoModule";
import { mockRules } from "@/database/mockData";

interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
	planned: Nullable<IPlannedActivity[]>;
	userData: Nullable<IUserData>;
}

export const defaultMetrics: IHealthMetric[] = [ { name: 'mental_health', label: 'Mental health', hidden: false }, { name: 'physical_health', label: 'Physical health', hidden: false }, { name: 'relationships', label: 'Relationships', hidden: false }, { name: 'realization', label: 'Realization', hidden: false } ];

export const App = ( { user, done, planned, userData }: IProps ) => {
	const pageLengthRef = useRef<HTMLDivElement | null>( null );
	const profileNavIsDisplayed = useBoolean( false );
	const todoFormDisplayed = useBoolean( false );
	const { doneActivities, addDoneActivity, deleteDoneActivity } =
		useDoneActivities( done ?? [] );
	const { plannedActivities, addPlannedActivity, markPlannedActivityAsDone, deletePlannedActivity } = usePlannedActivities( planned ?? [] );

	const userMetrics: IHealthMetric[] = userData?.metrics ?? defaultMetrics;
	const predefinedActivities = userData?.activities_stats ?? getPredefinedActivitiesAttributes();
	const healthStats = getHealthStats( doneActivities, userMetrics.filter( isNotHidden ), predefinedActivities );
	const todoActivities = getTodoActivities( { plannedActivities, healthStats, doneActivities, recommendations: userData?.recommendations ?? mockRules } );

	const handleMarkPlannedActivityAsDone = async ( id: number, label:string ) => {
		addDoneActivity( { label, type: labelToName( label ) } );
		await markPlannedActivityAsDone( id, label );
	};
	return (
		<div>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<MenuDrawer user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
				)}
				<div className="flex w-screen flex-col items-center">
					<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
					{todoFormDisplayed.value && (
						<TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value} onAdd={addPlannedActivity}/>
					)}
					<div className="mt-16 h-full w-screen">
						<HealthBarsMobile healthStats={healthStats}/>
						<ActivitiesToDoMobile activities={todoActivities} onDelete={deletePlannedActivity} onMarkAsDone={handleMarkPlannedActivityAsDone}/>
						<ActivitiesToAddMobile onAdd={addDoneActivity} predefinedActivities={predefinedActivities}/>
						<DoneActivitiesHistoryMobile doneActivities={doneActivities} handleDelete={deleteDoneActivity}/>
						<div ref={pageLengthRef}/>
						<div className="fixed bottom-0 w-screen px-2 text-right">
							<BottomBarButton onClick={todoFormDisplayed.setTrue} icon={<PlusOutlined />}/>
						</div>
						<div className='mb-20'/>
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
					{todoFormDisplayed.value && ( <TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value} onAdd={addPlannedActivity}/> )}
					<div className="animate-in h-full w-full text-foreground">
						<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
							<div className="relative col-span-1 row-span-3 mt-16 overflow-auto bg-background">
								<ActivitiesToDo onFormOpen={todoFormDisplayed.setTrue} activities={todoActivities} optimisticDelete={deletePlannedActivity} onMarkAsDone={handleMarkPlannedActivityAsDone}/>
							</div>
							<div className="col-span-2 mt-16 bg-background">
								<HealthBars healthStats={healthStats}/>
							</div>
							<div className="top row-span-3 mt-16 overflow-auto bg-background">
								<DashboardSectionHeading>
									History
								</DashboardSectionHeading>
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
