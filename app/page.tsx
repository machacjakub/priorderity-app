
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {Client} from "@/app/Client";

export const dynamic = 'force-dynamic'; 

export default async function Index() {
	const supabase = createServerComponentClient( { cookies } );
	// const done = await getData()

	const { data: done } = await supabase.from( 'done-activities' ).select();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Client user={user} done={done}/>
			{/*<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />*/}
		</div> );
}
