"use client";

import Link from "next/link";
import { Nullable } from "fputils";
import { MenuOutlined } from "@/icons";
import { Responsive } from "@/app/modules/components/Responsive";
import { Button } from "@/app/modules/components/Button";
import { LogInButton } from "@/app/modules/components/LoginButton";

interface IProps {
	user?: Nullable<{id: string}>;
	onProfileClick?: () => void;
}

export const Navbar = ( { user, onProfileClick }: IProps ) => {
	return (
		<div className="fixed z-20 flex justify-between h-16 w-screen border-b border-b-foreground/10 bg-background/60 text-foreground backdrop-blur-md drop-shadow-lg">
			<Link className="my-auto mx-3 text-3xl tracking-wide lg:text-4xl" href='/'>
				Priorderity
			</Link>
			<div className='my-auto mx-5 flex'>
				{user ? (
					<div className="float-right w-min text-foreground hover:text-cyan-200/75">
						{/*<SettingOutlined style={{fontSize: '25px'}} className="mx-8"/>*/}
						<button onClick={onProfileClick} className='align-middle'><MenuOutlined className='h-8'/></button>
					</div>
				) : (
					<div className='flex my-auto'>
						<Responsive.Desktop>
							<Link href="/signup">
								<Button size='sm' tailwind='font-semibold'>Sign up</Button>
							</Link>
						</Responsive.Desktop>
						<Link href="/login">
							<LogInButton small tailwind="text-foreground ml-4">Log in</LogInButton>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
