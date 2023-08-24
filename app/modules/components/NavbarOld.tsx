import LogoutButton from "@/app/modules/components/LogoutButton";
import Link from "next/link";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";

interface IProps {
    user?: Nullable<User>;
}

export const NavbarOld = ( {user}: IProps ) => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full flex justify-between items-center p-3 text-sm text-foreground">
				<div>Menu</div>
				<p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
                Priorderity
				</p> 
				<div>
					{user ? (
						<div className="flex items-center gap-4">
                        Hey, {user.email}!
							<LogoutButton />
						</div>
					) : (
						<Link
							href="/login"
							className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
						>
                        Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};