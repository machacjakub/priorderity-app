import { UserOutlined } from "@/icons";
import { Nullable } from "fputils";
import { User } from "@supabase/gotrue-js";

interface IProps {
    user: Nullable<User>;
    firstname: Nullable<string>;
}
export const ProfileThumbnail = ( { firstname, user }: IProps ) => {
	if ( firstname === null ) {
		return (
			<div className="my-6 mt-8 mx-7 text-violet-800 dark:text-violet-300 flex">
				<UserOutlined className='text-xl bg-violet-400/30 rounded-full p-1 mr-2 relative bottom-2 w-10' /> {user?.email}
			</div>
		);
	}
	return (
		<div className='my-6 mt-8 mx-7 text-violet-800 dark:text-violet-300'>
			<div className=" flex">
				<UserOutlined className='text-xl bg-violet-400/30 rounded-full p-1 mr-2 relative w-10' />
				<div>
					<div>{firstname}</div>
					<div className='text-xs text-violet-600/70 dark:text-violet-300/50 relative bottom-0.5'>{user?.email}</div>
				</div>
			</div>
		</div>
	);
};