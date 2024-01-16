'use client';


import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function Error ( { error, reset }: {
	error: Error & { digest?: string }
	reset: () => void
} ) {
	useEffect( () => {
		console.error( error );
	}, [ error ] );
	return (
		<div className='w-screen text-foreground my-auto text-center py-12 bg-gradient-to-r from-transparent via-red-600/20 to-transparent'>
			<h1 className='text-4xl tracking-wide pb-3'>Sorry &#128542;</h1>
			<p>It seems like you have encountered an error</p>
			<p>Please report it on <a className='text-blue-500' href='mailto:priorderity@email.cz'>priorderity@email.cz</a></p>
			<button className='bg-background hover:bg-background/50 py-1 px-3 mt-8 rounded-full hover:outline outline-2 outline-offset-2 outline-foreground/20' onClick={reset}>
				Try again
			</button>
		</div>
	);
}
