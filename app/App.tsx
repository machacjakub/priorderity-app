"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity, IPlannedActivity } from "@/app/types";
import { Nullable } from "fputils";
import { ActivitiesToAdd } from "@/app/modules/attributes-stats/ActivitiesToAdd";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { HealthBars } from "@/app/modules/health-bars/HealthBars";
import { getHealthStats } from "@/app/modules/health-bars/utils";
import { ActivitiesToDo } from "@/app/modules/todo/ActivitiesToDo";
import { NavigationDrawer } from "@/app/modules/navigation/NavigationDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";
import useDoneActivities from "@/app/utils/hooks/useDoneActivities";
import { Responsive } from "@/app/modules/components/Responsive";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { HealthBarsMobile } from "@/app/modules/health-bars/HealthBarsMobile";
import { ActivitiesToDoMobile } from "@/app/modules/todo/ActivitiesToDoMobile";
import { DoneActivitiesHistoryMobile } from "@/app/modules/history/DoneActivitiesHistoryMobile";
import { ActivitiesToAddMobile } from "@/app/modules/attributes-stats/ActivitiesToAddMobile";
import { isBrowser } from "@/app/modules/utils";
import { BottomBarButton } from "@/app/modules/components/mobile/BottomBarButton";

interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
	planned: Nullable<IPlannedActivity[]>;
}

export const App = ({ user, done, planned }: IProps) => {
	const profileNavIsDisplayed = useBoolean(false);
	const todoFormDisplayed = useBoolean(false);
	const { doneActivities, addDoneActivity, deleteDoneActivity } =
		useDoneActivities(done ?? []);

	function scrollToTop() {
		if (!isBrowser()) return;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	return (
		<div>
			<Responsive.Mobile>
				{profileNavIsDisplayed.value && (
					<NavigationDrawer
						user={user ?? null}
						onClose={
							profileNavIsDisplayed.setFalse
						}
						isOpen={
							profileNavIsDisplayed.value
						}
					/>
				)}
				<div className="flex w-screen flex-col items-center">
					<Navbar
						user={user}
						onProfileClick={
							profileNavIsDisplayed.setTrue
						}
					/>
					{todoFormDisplayed.value && (
						<TodoForm
							onClose={
								todoFormDisplayed.setFalse
							}
							isOpen={
								todoFormDisplayed.value
							}
						/>
					)}
					<div className="mt-16 h-full w-screen">
						<HealthBarsMobile
							healthStats={getHealthStats(
								done ??
									[],
							)}
						/>
						<ActivitiesToDoMobile
							planned={
								planned ??
								[]
							}
						/>
						<ActivitiesToAddMobile
							onAdd={
								addDoneActivity
							}
						/>
						<DoneActivitiesHistoryMobile
							doneActivities={
								doneActivities
							}
							handleDelete={
								deleteDoneActivity
							}
						/>
						<div className="fixed bottom-0 w-screen px-2 text-right">
							<BottomBarButton
								onClick={
									todoFormDisplayed.setTrue
								}
								icon={
									<PlusOutlined />
								}
							/>
						</div>
						<div
							className="m-6 text-center text-foreground"
							onClick={
								scrollToTop
							}
						>
							<UpOutlined className="text-3xl" />
							<p>
								back
								to
								the
								top
							</p>
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
					{profileNavIsDisplayed.value && (
						<NavigationDrawer
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
					{todoFormDisplayed.value && (
						<TodoForm
							onClose={
								todoFormDisplayed.setFalse
							}
							isOpen={
								todoFormDisplayed.value
							}
						/>
					)}
					<div className="animate-in h-full w-full text-foreground">
						<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
							<div className="relative col-span-1 row-span-3 mt-16 overflow-auto bg-background">
								<ActivitiesToDo
									onFormOpen={
										todoFormDisplayed.setTrue
									}
									planned={
										planned ??
										[]
									}
								/>
							</div>
							<div className="col-span-2 mt-16 bg-background">
								<HealthBars
									healthStats={getHealthStats(
										done ??
											[],
									)}
								/>
							</div>
							<div className="top row-span-3 mt-16 overflow-auto bg-background">
								<DoneActivitiesHistory
									doneActivities={
										doneActivities
									}
									handleDelete={
										deleteDoneActivity
									}
								/>
							</div>
							<div className="col-span-2 row-span-2 mt-16 overflow-auto bg-background">
								<ActivitiesToAdd
									onAdd={
										addDoneActivity
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
