"use client";

import { User } from "@supabase/gotrue-js";
import { Navbar } from "@/app/modules/navigation/Navbar";
import { Nullable } from "fputils";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { Responsive } from "@/app/modules/components/Responsive";
import { FadingLine } from "@/app/modules/components/FadingLine";



interface IProps {
    user: Nullable<User>;
}
export const ProfilePage = ( { user }: IProps ) => {
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
					<div className="mt-16 h-full w-screen overflow-auto flex flex-col justify-center animate-pulse">
						<FadingLine/>
						    <p className='text-foreground text-center p-3'>to be introduced</p>
						<FadingLine/>
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
						<FadingLine/>
						<p className='text-foreground text-center p-8 animate-pulse text-xl'>to be introduced</p>
						<FadingLine/>
					</div>
				</div>
			</Responsive.Desktop>
		</div>
	);
};
