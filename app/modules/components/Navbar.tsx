'use client';

import Link from "next/link";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";
import { UserOutlined} from "@ant-design/icons";
import {SignUpButton} from "@/app/modules/components/SignUpButton";
import {LogInButton} from "@/app/modules/components/LoginButton";

interface IProps {
    user?: Nullable<User>;
	onProfileClick?: () => void;
}

export const Navbar = ( {user, onProfileClick}: IProps ) => {
	return (
		<div className="w-full h-16 text-foreground grid grid-cols-3 items-center border-b border-b-foreground/10 fixed z-20 bg-background/60 backdrop-blur-md">
			<div className="text-3xl lg:text-4xl w !leading-tight mx-3 max-w-xl tracking-wide">
				Priorderity
			</div>
			<div></div>
			<div className="text-right px-8 fs">
				{user ? (
					<div className="text-foreground w-min float-right hover:text-cyan-200/75">
						{/*<SettingOutlined style={{fontSize: '25px'}} className="mx-8"/>*/}
						<UserOutlined style={{fontSize: '25px'}} onClick={onProfileClick}/>
					</div>
				) : ( <div>
					<Link
						href="/signup"
					>
						<SignUpButton small>Sign up</SignUpButton>
					</Link>
					<Link
						href="/login"
					>
						<LogInButton small tailwind="text-white ml-4">Log in</LogInButton>
					</Link>
				</div>
				)}
			</div>
		</div>
	);
};