'use client';

import { Navbar } from "@/app/modules/navigation/Navbar";
import { SignUpButton } from "@/app/modules/components/SignUpButton";
import Link from "next/link";
 
export const WelcomePage = ( ) => {
	return (
		<div className="w-full h-full flex flex-col items-center">
			<Navbar />
			<div className="pt-16 h-screen">
				<div className='h-full flex flex-col justify-evenly'>
					<div className="text-4xl font-extrabold tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-500 p-4">
					Welcome to Priorderity app
					</div>
					<div className="text-7xl font-bold tracking-wide text-center text-foreground">
						<p>Get your priorities</p>
						<p>and repeating activities</p>
						<p>in order</p>
					</div>
					{/*<div className="text-foreground text-3xl font-bold text-center">additional text</div>*/}
					<div className="text-center">
						<Link href='/signup'>
							<SignUpButton>Get Started</SignUpButton>
						</Link>
					</div>
					<div></div>
				</div>


			</div>
		</div>
	);
};