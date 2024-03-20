"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity, IHealthMetric, IPlannedActivity, ITodoActivity } from "@/app/types";
import { Nullable } from "fputils";
import { ActivitiesToAdd } from "@/app/modules/attributes-stats/ActivitiesToAdd";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { ActivitiesToDo } from "@/app/modules/todo/ActivitiesToDo";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";
import useDoneModule from "@/app/utils/hooks/useDoneModule";
import { Responsive } from "@/app/modules/components/Responsive";
import { HealthBarsMobile } from "@/app/modules/health-bars/HealthBarsMobile";
import { ActivitiesToDoMobile } from "@/app/modules/todo/ActivitiesToDoMobile";
import { DoneActivitiesHistoryMobile } from "@/app/modules/history/DoneActivitiesHistoryMobile";
import { ActivitiesToAddMobile } from "@/app/modules/attributes-stats/ActivitiesToAddMobile";
import { BottomBarButton } from "@/app/modules/components/mobile/BottomBarButton";
import { HealthBars } from "@/app/modules/health-bars/HealthBars";
import { PlusOutlined } from "@/icons";
import { IUserData } from "@/app/modules/profile/types";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { labelToName } from "@/app/modules/utils";
import DoneModuleContext from "@/app/modules/context/doneModuleContext";
import useTodoActivities from "@/app/utils/hooks/useTodoActivities";
import UserDataContext from "@/app/modules/context/userDataContext";
import { HabitsSection } from "@/app/modules/habits/HabitsSection";
import { HabitsSectionMobile } from "@/app/modules/habits/HabitsSectionMobile";

interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
	planned: Nullable<IPlannedActivity[]>;
	userData: Nullable<IUserData>;
}

export const defaultMetrics: IHealthMetric[] = [ { name: 'mental_health', label: 'Mental health', hidden: false }, { name: 'physical_health', label: 'Physical health', hidden: false }, { name: 'relationships', label: 'Relationships', hidden: false }, { name: 'realization', label: 'Realization', hidden: false } ];

export const App = ( { user, done, planned, userData }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const todoFormDisplayed = useBoolean( false );
	const { doneActivities, addDoneActivity, deleteDoneActivity, predefinedActivities, healthStats } = useDoneModule( done ?? [], userData );
	const { todoActivities, addPlannedActivity, updatePlannedActivity, deletePlannedActivity } = useTodoActivities( { planned: planned ?? [], doneActivities, healthStats, recommendations: userData?.recommendations ?? [] } );
	const userTags = userData?.tags?.filter( t => !t.hidden ) ?? [];

	const handleMarkTodoActivityAsDone = async ( activity: ITodoActivity ) => {
		await addDoneActivity( { label: activity.name, type: labelToName( activity.name ) } );
		if ( !activity.isRecommended ) {
			await deletePlannedActivity( activity.id );
		}
	};
	return (
		<DoneModuleContext.Provider value={{ doneActivities, addDoneActivity, deleteDoneActivity, predefinedActivities, healthStats }}>
			<UserDataContext.Provider value={userData}>
				<Responsive.Mobile>
					{profileNavIsDisplayed.value && <MenuDrawer firstname={userData?.firstname ?? null} user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/> }
					<div className="flex w-screen flex-col items-center">
						<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
						{todoFormDisplayed.value && <TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value} onAdd={addPlannedActivity} userTags={userTags.map( tag => ( { ...tag, selected: false } ) )}/> }
						<div className="mt-16 h-full w-screen">
							<HealthBarsMobile />
							<ActivitiesToDoMobile onUpdate={updatePlannedActivity} activities={todoActivities} onDelete={deletePlannedActivity} onMarkAsDone={handleMarkTodoActivityAsDone} userTags={userTags}/>
							<ActivitiesToAddMobile/>
							<HabitsSectionMobile/>
							<DoneActivitiesHistoryMobile />
							<BottomBarButton onClick={todoFormDisplayed.setTrue} icon={<PlusOutlined />}/>
							<div className='mb-20'/>
						</div>
					</div>
				</Responsive.Mobile>
				<Responsive.Desktop>
					<div className="flex h-screen w-full flex-col items-center max-w-screen-2xl">
						<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
						{profileNavIsDisplayed.value && ( <MenuDrawer firstname={userData?.firstname ?? null} user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/> )}
						{todoFormDisplayed.value && ( <TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value} onAdd={addPlannedActivity} userTags={userTags.map( tag => ( { ...tag, selected: false } ) )}/> )}
						<div className="animate-in h-full w-full text-foreground">
							<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
								<div className="relative col-span-1 row-span-3 mt-16 overflow-auto bg-background">
									<ActivitiesToDo onUpdate={updatePlannedActivity} onFormOpen={todoFormDisplayed.setTrue} activities={todoActivities} onDelete={deletePlannedActivity} onMarkAsDone={handleMarkTodoActivityAsDone} userTags={userTags}/>
								</div>
								<div className="col-span-2 mt-16 bg-background">
									<HealthBars/>
								</div>
								<div className="top row-span-3 mt-16 overflow-auto bg-background">
									<DashboardSectionHeading>
									History
									</DashboardSectionHeading>
									<DoneActivitiesHistory/>
								</div>
								<div className="col-span-2 row-span-2 mt-16 overflow-auto bg-background">
									<ActivitiesToAdd/>
								</div>
							</div>
							<HabitsSection/>
						</div>
					</div>
				</Responsive.Desktop>
			</UserDataContext.Provider>
		</DoneModuleContext.Provider>
	);
};
