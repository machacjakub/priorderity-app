"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { IDoneActivity } from "@/app/types";
import { Nullable } from "fputils";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import { NavigationDrawer } from "@/app/modules/navigation/NavigationDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import useDoneActivities from "@/app/utils/hooks/useDoneActivities";
import { Responsive } from "@/app/modules/components/Responsive";
import { BottomBarButton } from "@/app/modules/components/mobile/BottomBarButton";
import {
	MoreOutlined,
	PlusOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface IProps {
	user: Nullable<User>;
	done: Nullable<IDoneActivity[]>;
}
export const HistoryPage = ({ user, done }: IProps) => {
	const profileNavIsDisplayed = useBoolean(false);
	const { doneActivities, deleteDoneActivity } = useDoneActivities(
		done ?? [],
	);
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
				<div className="flex h-screen w-full flex-col items-center">
					<Navbar
						user={user}
						onProfileClick={
							profileNavIsDisplayed.setTrue
						}
					/>
					{/*<HealthBarsMobile healthStats={getHealthStats( done ?? [] )}/>*/}
					<div className="mt-16 h-full w-screen overflow-auto">
						<DoneActivitiesHistory
							doneActivities={
								doneActivities
							}
							handleDelete={
								deleteDoneActivity
							}
						/>
						<div className="h-20" />
						<div className="fixed bottom-0 flex w-screen justify-between px-6">
							<BottomBarButton
								icon={
									<MoreOutlined />
								}
							/>
							<BottomBarButton
								icon={
									<PlusOutlined />
								}
							/>
							<Link href="/">
								<BottomBarButton
									icon={
										<UnorderedListOutlined />
									}
								/>
							</Link>
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
					<div className="animate-in mt-16 h-full w-screen overflow-auto text-foreground">
						<DoneActivitiesHistory
							doneActivities={
								doneActivities
							}
							handleDelete={
								deleteDoneActivity
							}
						/>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
