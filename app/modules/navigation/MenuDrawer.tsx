import LogoutButton from "@/app/modules/components/LogoutButton";
import { User } from "@supabase/gotrue-js";
import { Nullable } from "fputils";
import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { MenuLink } from "@/app/modules/navigation/MenuLink";
import { usePathname } from "next/navigation";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { UserOutlined } from "@/icons";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	user: Nullable<User>;
}

export const MenuDrawer = ( { onClose, isOpen, user }: IProps ) => {
	const pathname = usePathname();
	return (
		<div>
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<div
					className="fixed right-0 h-screen animate-fade-left border-2 bg-background p-1 animate-duration-500 flex flex-col justify-between"
					style={{ minWidth: '220px' }}
				>
					<div>
						<div className="my-6 mt-8 mx-7 text-violet-800 dark:text-violet-300 flex">
							<UserOutlined className='text-xl bg-violet-400/30 rounded-full p-1 mr-2 relative bottom-1.5 w-10' /> {user?.email}
						</div>
						<FadingLine/>
						<div className='pt-3 ml-4'>
							{pathname !== '/' && <MenuLink label='Home' route='/' icon='home'/>}
							<MenuLink label='Profile' route='/profile'/>
							<MenuLink label='History' route='/history'/>
							<MenuLink label='Settings' route='/settings'/>
						</div>
					</div>
					<div className='p-6 pl-8'>
						<div className="flex justify-between">
							<button
								className="px-4 py-2 text-foreground hover:text-blue-400"
								onClick={
									onClose
								}
							>
								Close
							</button>
							<LogoutButton />
						</div>
					</div>
				</div>
			</ModalWindow>
		</div>
	);
};
