"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import { SignUpButton } from "@/app/modules/components/SignUpButton";
import Link from "next/link";

export const WelcomePage = () => {
	return (
		<div className="flex h-full w-full flex-col items-center">
			<Navbar />
			<div className="h-screen pt-16">
				<div className="flex h-full flex-col justify-evenly">
					<div className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text p-4 text-center text-4xl font-extrabold tracking-wide text-transparent">
						Welcome to
						Priorderity app
					</div>
					<div className="text-center text-7xl font-bold tracking-wide text-foreground">
						<p>
							Get your
							priorities
						</p>
						<p>
							and
							repeating
							activities
						</p>
						<p>in order</p>
					</div>
					{/*<div className="text-foreground text-3xl font-bold text-center">additional text</div>*/}
					<div className="text-center">
						<Link href="/signup">
							<SignUpButton>
								Get
								Started
							</SignUpButton>
						</Link>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};
