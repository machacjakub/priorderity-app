'use client';

import Link from "next/link";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";
import { UserOutlined} from "@ant-design/icons";
import {SignUpButton} from "@/app/modules/components/SignUpButton";

interface IProps {
    user?: Nullable<User>;
	onProfileClick?: () => void;
}

export const Navbar = ( {user, onProfileClick}: IProps ) => {
	return (
		<div className="w-full h-16 text-foreground grid grid-cols-3 items-center border-b border-b-foreground/10 fixed z-20 backdrop-blur-lg">
			<div className="text-3xl lg:text-4xl w !leading-tight mx-3 max-w-xl tracking-wide">
				Priorderity
			</div>
			<div></div>
			<div className="text-right px-8 fs">
				{user ? (
					<div className="">
						<UserOutlined style={{fontSize: '25px'}} onClick={onProfileClick}/>
					</div>
				) : ( <div>
					<SignUpButton text="Sign Up" small={true}/>
					<Link
						href="/login"
						className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
					>
						Login
					</Link>
				</div>
				)}
			</div>
		</div>
	);
};