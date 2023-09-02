'use client';

import Link from "next/link";
import {User} from "@supabase/gotrue-js";
import {Nullable} from "fputils";
import {MenuOutlined, UserOutlined} from "@ant-design/icons";

interface IProps {
    user?: Nullable<User>;
	onProfileClick: () => void;
}

export const Navbar = ( {user, onProfileClick}: IProps ) => {
	return (
		<div className="w-full h-16 text-foreground grid grid-cols-3 items-center border-b border-b-foreground/10">
			<div className="max-w-min px-8"><MenuOutlined style={{fontSize: '25px'}}/></div>
			<div className="text-3xl lg:text-4xl w !leading-tight mx-auto max-w-xl text-center">
				Priorderity
			</div>
			<div className="text-right px-8 fs">
				{user ? (
					<div className="">
						<UserOutlined style={{fontSize: '25px'}} onClick={onProfileClick}/>
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
	);
};