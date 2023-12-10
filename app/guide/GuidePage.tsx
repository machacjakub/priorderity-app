"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import { Nullable } from "fputils";
import { User } from "@supabase/gotrue-js";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";

type ISection = 'todo' | 'settings' | 'predefined';
interface IProps {
	user: Nullable<User>;
}
export const GuidePage = ( { user }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const [ displayedSection, setDisplayedSection ] = useState<ISection>( 'todo' );
	return (
		<div className='w-screen'>
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
			<Navbar user={user} onProfileClick={
				profileNavIsDisplayed.setTrue
			}/>
			<div className='h-16 w-screen bg-background fixed top-0'/>
			<div className='flex'>
				<div className='text-foreground mt-16 min-w-fit p-4 pr-10'>
					<ul>
						<li className='py-1'><button>Todo list</button></li>
						<li className='py-1'><button>Predefined activities</button></li>
						<li className='py-1'><button>Settings</button></li>
					</ul>
				</div>
				<div className='-mt-3 h-screen w-full'>
					{displayedSection === 'todo' && <iframe
						src="https://scribehow.com/embed/How_to_Add_and_Edit_Items_in_a_To-Do_List__MOrmLt2_Q3Ww0HXKDKlQuA?as=scrollable"
						width="100%" height="102%" allowFullScreen></iframe>}
					{displayedSection === 'settings' && ''}
					{displayedSection === 'predefined' && ''}
				</div>
			</div>
		</div>
	);
};
