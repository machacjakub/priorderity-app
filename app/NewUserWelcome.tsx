"use client";


import { Button } from "@/app/modules/components/Button";
import { handleSaveFirstname } from "@/database/actions";
import Link from "next/link";

export const NewUserWelcome = () => {
	const saveFirstname = async ( formData: FormData ) => {
		const firstname = formData.get( 'name' );
		await handleSaveFirstname( String( firstname ) );
	};
	return (
		<div className="flex w-screen h-screen flex-col items-center text-foreground">
			<Link
				href="/login"
				className="group absolute left-8 top-8 flex items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>{" "}
				Log out
			</Link>
			<div className="p-10 animate-in rounded-2xl bg-gray-500/5 p-4 p-6 text-foreground backdrop-blur-lg my-auto" onClick={( e ) => e.stopPropagation()}>
				<h1 className="mx-8 mb-10 text-center text-2xl">
					Welcome to<span className='font-semibold text-4xl'> Priorderity</span>
				</h1>
				<form className='text-center' action={saveFirstname}>
					<p className='text-lg'>{`What's`} your <span className='font-bold'>name</span>?</p>
					<div className="mt-3 text-center">
						<input
							name={"name"}
							placeholder="John"
							className="col-span-2 mx-auto px-2 text-black/80 rounded-md"
							autoFocus
						/>
					</div>
					<div className="text-center mt-10">
						<Button buttonType="submit">
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
