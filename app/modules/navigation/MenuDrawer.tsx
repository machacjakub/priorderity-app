import LogoutButton from "@/app/modules/components/LogoutButton";
import { Nullable } from "fputils";
import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { MenuLink } from "@/app/modules/navigation/MenuLink";
import { usePathname } from "next/navigation";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { ProfileThumbnail } from "@/app/modules/navigation/ProfileThumbnail";
import { User } from "@supabase/auth-js";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	user: Nullable<User>;
	firstname: Nullable<string>;
}

export const MenuDrawer = ( { onClose, isOpen, user, firstname }: IProps ) => {
	const pathname = usePathname();
	return (
		<div>
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<div
					className="fixed right-0 h-screen animate-fade-left border-2 bg-background p-1 animate-duration-500 flex flex-col justify-between"
					style={{ minWidth: '220px' }}
				>
					<div>
						<ProfileThumbnail user={user} firstname={firstname}/>
						<FadingLine/>
						<div className='pt-3 ml-4'>
							{pathname !== '/' && <MenuLink label='Home' route='/' icon='home'/>}
							{/*<MenuLink label='Profile' route='/profile'/>*/}
							<MenuLink label='History' route='/history'/>
							<MenuLink label='Settings' route='/settings'/>
							<MenuLink label='Guide' route='/guide'/>
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
