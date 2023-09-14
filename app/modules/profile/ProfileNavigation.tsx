import LogoutButton from "@/app/modules/components/LogoutButton";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";
import {ModalWindow} from "@/app/modules/components/ModalWindow";

interface IProps {
	onClose: () => void;
	isOpen: boolean
	user: Nullable<User>;
}

export const ProfileNavigation = ( {onClose, isOpen, user}:IProps ) => {
	return (
		<div className="w-full h-full z-20">
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<div className="fixed right-0 bg-background border-2 p-6 animate-fade-down animate-duration-500" onClick={( e ) => e.stopPropagation()}>
					<div className="text-foreground pb-3">{user?.email}</div>
					<LogoutButton/>
				</div>
			</ModalWindow>
		</div>
	);
};
