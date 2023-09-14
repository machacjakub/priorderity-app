'use client';

import {Navbar} from "@/app/modules/components/Navbar";
import {SignUpButton} from "@/app/modules/components/SignUpButton";

export const WelcomePage = ( ) => {
	return (
		<div className="w-full h-full flex flex-col items-center">
			<Navbar />
			<div className="mt-16">
				<div className="text-5xl font-extrabold tracking-wide m-10">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-cyan-500">
						Welcome to Priorderity app
					</span>
				</div>
				<div className="text-foreground text-3xl font-bold text-center">additional text</div>
				<div className="text-center">
					<SignUpButton text="Get Started"/>
				</div>
			</div>
		</div>
	);
};