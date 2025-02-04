"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import { Nullable } from "fputils";
import { MenuDrawer } from "@/app/modules/navigation/MenuDrawer";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { FadingLine } from "@/app/modules/components/FadingLine";
import Link from "next/link";
import { User } from "@supabase/auth-js";

const Card = ( { label, link }: {label: string, link: string} ) => <Link href={link} target='_blank'><button className='p-6 m-4 sm:m-0 sm:w-52 lg:w-60 bg-blue-500/20 hover:outline outline-4 outline-offset-2 outline-blue-500/40 border border-blue-400 rounded-xl'>{label}</button></Link>;
interface IProps {
	user: Nullable<User>;
	firstname: Nullable<string>;
}
export const GuidePage = ( { user, firstname }: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	return (
		<div className='w-screen'>
			{profileNavIsDisplayed.value && (
				<MenuDrawer firstname={firstname} user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>
			)}
			<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue}/>
			<div className='text-foreground mt-24'>
				<h1 className='text-center text-4xl tracking-wide mb-6'>User guide</h1>
				<FadingLine/>
				<div className='border-l-8 border-l-blue-300 dark:border-l-blue-500 my-8 py-2 px-10 max-w-screen-lg mx-auto text-lg text-foreground/80 tracking-wide'>
					<p>Hey there, welcome to <span className='font-bold'>Priorderity App</span> – your go-to priority and task manager!</p>
					<p>{`This user guide is designed to assist you in navigating and maximizing the potential of our app. Whether you're a new user or looking to explore advanced features, we've got you covered.`}</p>
				</div>
				<div className='text-center px-8 my-10 mx-auto sm:w-[500px] md:w-[720px] lg:w-[848px] sm:flex flex-wrap gap-4 lg:gap-8'>
					<Card label='First steps' link='https://scribehow.com/shared/First_steps_in_the_app__-Kuqo26NRXG3Ys9zpZiagA' />
					<Card label='Todo list' link='https://scribehow.com/shared/How_to_use_the_To-Do_list__D7I00tXaTAO3Aa6hdWlb_g' />
					<Card label='Stats' link='https://scribehow.com/shared/Guide_to_Stats__Hi-XumUNRBm-TdjWMdO2CQ' />
					<Card label='Predefined activities' link='https://scribehow.com/shared/How_to_set_up_your_custom_predefined_activities__tqQFa9LeTpi5HjkqrGpcfA' />
					<Card label='Recommendations' link='https://scribehow.com/shared/How_to_customize_activities_recommendation_rules__ZeCcvnAaQOuwnnBGFH8zbQ?editmode=true' />
				</div>
				<div className='w-screen fixed bottom-0 bg-blue-500/30 py-6 px-10 lg:px-32 mx-auto text-sm sm:text-base text-foreground/80 tracking-wide'>
					<p>If you are unclear about something, have an idea for improvement or have come across a bug or an error, we would be very happy if you let us know <span className='whitespace-nowrap'>at our email <a href='mailto:priorderity@email.cz' className='text-blue-500 dark:text-blue-400'>priorderity@email.cz</a></span> </p>
				</div>
			</div>
		</div>
	);
};
