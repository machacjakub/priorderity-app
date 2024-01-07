"use client";

import { Navbar } from "@/app/modules/navigation/Navbar";
import Link from "next/link";
import Image from "next/legacy/image";
import appDashboardScreenshotDark from './images/appDashboardScreenshotDark.png';
import appDashboardScreenshotLight from './images/appDashboardScreenshotLight.png';
import appDashboardScreenshotDarkMobile from './images/appDashboardScreenshotDarkMobile.png';
import appDashboardScreenshotLightMobile from './images/appDashboardScreenshotLightMobile.png';
import { Responsive } from "@/app/modules/components/Responsive";
import { Button } from "@/app/modules/components/Button";
import { WelcomeBg } from "@/app/modules/components/WelcomeBg";

export const WelcomePage = () => {
	return (
		<div className="flex w-screen flex-col items-center backdrop-blur-lg z-10">
			<WelcomeBg/>
			<Navbar />
			<div className="w-screen mt-44 z-10">
				<div className="flex flex-col">
					<div className="text-center">
						<h1 className='max-w-6xl mx-auto text-4xl sm:text-7xl font-semibold tracking-wider text-foreground py-4 sm:py-8 px-8 sm:px-20'>
							Get your
							priorities
							in order
						</h1>
						{/*<div className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text p-4 text-center text-3xl font-extrabold tracking-wide text-transparent">*/}
						{/*	Welcome to*/}
						{/*	Priorderity app*/}
						{/*</div>*/}
					</div>
					<div className="text-center text-md sm:text-xl tracking-wide text-gray-600 sm:py-8 px-10 sm:px-28">
						<p className='max-w-3xl mx-auto' >
							Organize tasks efficiently with a customizable to-do list. Enhance well-being through gamification for a more rewarding daily routine.
						</p>
					</div>
					{/*<div className="text-foreground text-3xl font-bold text-center">additional text</div>*/}
					<div className="text-center my-14">
						<Link href="/signup">
							<Button size={"xl"}>
								Get
								Started
							</Button>
						</Link>
					</div>
					<Responsive.Desktop>
						<div className='m-10 mb-32 md:mx-14 lg:mx-20 xl:mx-32 2xl:mx-50 rounded-xl shadow-2xl dark:border shadow-indigo-950/70 dark:shadow-indigo-500/70'>
							<Responsive.Light><Image src={appDashboardScreenshotLight} alt={'App dashboard'} className='rounded-xl' /></Responsive.Light>
							<Responsive.Dark><Image src={appDashboardScreenshotDark} alt={'App dashboard'} className='rounded-xl' /></Responsive.Dark>
						</div>
					</Responsive.Desktop>
					<Responsive.Mobile>
						<div className='px-8'>
							<div className='max-w-xs my-10 mx-auto mb-32 md:mx-14 lg:mx-20 xl:mx-32 2xl:mx-50 rounded-xl shadow-2xl dark:border shadow-indigo-950/70 dark:shadow-indigo-500/70'>
								<Responsive.Light><Image src={appDashboardScreenshotLightMobile} alt={'App dashboard'} className='rounded-xl' /></Responsive.Light>
								<Responsive.Dark><Image src={appDashboardScreenshotDarkMobile} alt={'App dashboard'} className='rounded-xl' /></Responsive.Dark>
							</div>
						</div>
					</Responsive.Mobile>
					<div className='w-screen text-foreground md:grid grid-cols-2 px-5 sm:px-10 lg:px-20 my-10'>
						<div className='p-4 md:p-6 lg:p-14'>
							<h3 className='text-cyan-500'>Embrace positive feedback.</h3>
							<h1 className='text-2xl sm:text-3xl tracking-wide font-semibold py-2'>Track your productivity journey with History section</h1>
							<p>{`By visualizing your completed tasks and achievements, it serves as a source of positive feedback, reinforcing your productive behaviors and keeping you motivated. Witness your progress in real-time and celebrate each milestone; it's more than a record, it's your success story unfolding.`}</p>
						</div>
						<div className='p-4 md:p-6 lg:p-14'>
							<h3 className='text-cyan-500'>Break through decision paralysis</h3>
							<h1 className='text-2xl sm:text-3xl tracking-wide font-semibold py-2'>Cut through the noise with our ToDo list</h1>
							<p>{`It helps you overcome decision paralysis by prioritizing tasks based on deadlines and personal settings. With a clear view of what needs to be done, you can focus on taking action. This feature helps you break the cycle of procrastination and boosts your productivity.`}</p>
						</div>
						<div className='p-4 md:p-6 lg:p-14'>
							<h3 className='text-cyan-500'>Aim for 100%</h3>
							<h1 className='text-2xl sm:text-3xl tracking-wide font-semibold py-2'>Transform your path to well-being</h1>
							<p>{`Health stats feature gamifies your health, providing a score for activities like exercise, reading, and meditation. This not only motivates you to maintain a 100% score but also enables setting and tracking personal health goals. Turn your well-being journey into an engaging game and strive for your personal best.`}</p>
						</div>
						<div className='p-4 md:p-6 lg:p-14'>
							<h3 className='text-cyan-500'>Cultivate Habits</h3>
							<h1 className='text-2xl sm:text-3xl tracking-wide font-semibold py-2'>Cultivate positive habits with our Repeating Activities feature</h1>
							<p>{`By scheduling and tracking recurrent tasks, this feature assists in habit formation. Whether it's daily meditation or weekly exercise, our app helps you build and maintain these habits. Make the most of your time by transforming beneficial activities into second nature.`}</p>
						</div>
					</div>
				</div>
				{/*<footer className='w-screen bg-background/40 text-foreground z-40'>*/}
				{/*	<FadingLine/>*/}
				{/*	<div className='p-20'>*/}
				{/*	</div>*/}
				{/*</footer>*/}
			</div>
		</div>
	);
};
