import LogoutButton from "@/app/modules/components/LogoutButton";
import { User } from "@supabase/gotrue-js";
import { Nullable } from "fputils";
import { ModalWindow } from "@/app/modules/components/ModalWindow";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	user: Nullable<User>;
}

export const NavigationDrawer = ( { onClose, isOpen, user }: IProps ) => {
	return (
		<div className="z-20 h-full w-full">
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<div
					className="fixed right-0 h-screen animate-fade-left border-2 bg-background p-6 animate-duration-500"
					onClick={( e ) =>
						e.stopPropagation()
					}
				>
					<div className="pb-3 text-foreground">
						{user?.email}
					</div>
					<div className="flex justify-between">
						<button
							className="px-4 py-2 text-foreground "
							onClick={
								onClose
							}
						>
							Close
						</button>
						<LogoutButton />
					</div>
				</div>
			</ModalWindow>
		</div>
	);
};
