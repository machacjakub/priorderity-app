import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export const getDatabase = () => {
	const supabase = createServerComponentClient( { cookies } );

	return {
		getUser: async () => {
			const { data: { user }} = await supabase.auth.getUser();
			return user;
		},
		getDoneActivities: async () => {
			const { data: done } = await supabase.from( 'done-activities' ).select();
			return done;
		},
		addDoneActivity: async ( activity: string ) => {
			const { data: { user }} = await supabase.auth.getUser();
			const { data, error } = await supabase.from( 'done-activities' )
				.insert( {type: activity, user_id: user?.id } );
			if ( error ){
				return error;
			}
			return data;
		}
	};

};
