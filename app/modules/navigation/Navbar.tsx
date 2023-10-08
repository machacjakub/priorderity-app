"use client";

import Link from "next/link";
import { User } from "@supabase/gotrue-js";
import { Nullable } from "fputils";
import { MenuOutlined } from "@ant-design/icons";
import { SignUpButton } from "@/app/modules/components/SignUpButton";
import { LogInButton } from "@/app/modules/components/LoginButton";

interface IProps {
	user?: Nullable<User>;
	onProfileClick?: () => void;
}

export const Navbar = ({ user, onProfileClick }: IProps) => {
	return (
		<div className="fixed z-20 grid h-16 w-full grid-cols-3 items-center border-b border-b-foreground/10 bg-background/60 text-foreground backdrop-blur-md">
			<div className="w mx-3 max-w-xl text-3xl !leading-tight tracking-wide lg:text-4xl">
				Priorderity
			</div>
			<div></div>
			<div className="fs px-8 text-right">
				{user ? (
					<div className="float-right w-min text-foreground hover:text-cyan-200/75">
						{/*<SettingOutlined style={{fontSize: '25px'}} className="mx-8"/>*/}
						<MenuOutlined
							style={{
								fontSize: "25px",
							}}
							onClick={
								onProfileClick
							}
						/>
					</div>
				) : (
					<div>
						<Link href="/signup">
							<SignUpButton
								small
							>
								Sign
								up
							</SignUpButton>
						</Link>
						<Link href="/login">
							<LogInButton
								small
								tailwind="text-white ml-4"
							>
								Log
								in
							</LogInButton>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
