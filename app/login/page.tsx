import Link from "next/link";
import Messages from "./messages";
import { LogInButton } from "@/app/modules/components/LoginButton";

export default function Login () {
	return (
		<div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
			<Link
				href="/"
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
				Back
			</Link>

			<form
				className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground mb-20"
				action="/auth/sign-in"
				method="post"
			>
				<h1 className='text-xl text-center mt-10 text-foreground/40'>Log in to</h1>
				<h1 className='text-4xl text-center mb-10'>Priorderity</h1>
				<label
					className="text-md"
					htmlFor="email"
				>
					Email
				</label>
				<input
					className="mb-6 rounded-md border bg-inherit px-4 py-2"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<label
					className="text-md"
					htmlFor="password"
				>
					Password
				</label>
				<input
					className="mb-6 rounded-md border bg-inherit px-4 py-2"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<LogInButton
					tailwind="bg-action-light dark:bg-action-dark hover:bg-action-light/70 dark:hover:hover:bg-action-dark/80"
					small
				>
					Log In
				</LogInButton>
				<Link href='/signup' className='text-center text-foreground/60 mt-4'>{`Don't have an account yet?`} <b className='text-action-dark hover:text-action-light'>Sign up</b></Link>
				<Messages />
			</form>
		</div>
	);
}
