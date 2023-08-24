import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {ActivitiesList} from "@/app/modules/history/ActivitiesList";
import {Navbar} from "@/app/modules/components/Navbar";

export const dynamic = 'force-dynamic'; 

export default async function Index() {
	const supabase = createServerComponentClient( { cookies } );
	// const done = await getData()

	const { data: done } = await supabase.from( 'done-activities' ).select();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="w-full flex flex-col items-center">
			<Navbar user={user}/>

			<div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
				<div className="flex flex-col items-center mb-4 lg:mb-12">

					<div className="py-3"/>
				</div>
				{/*<div className="grid grid-cols-3 grid-rows-3 gap-4">*/}
				{/*  <div className="bg-gray-700 px-3 py-3 col-span-3">1</div>*/}
				{/*  <div className="bg-blue-400 px-3 py-3 row-span-2">2</div>*/}
				{/*  <div className="bg-blue-400 px-3 py-3 col-span-2 row-span-2">3</div>*/}
				{/*</div>*/}

				<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
				<ActivitiesList activities={done ?? []}/>
			</div>
		</div>
	);
}
