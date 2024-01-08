'use client';


export const dynamic = "force-dynamic";

export default function Error ( ) {
	return (
		<div className='w-screen text-foreground my-auto text-center py-12 bg-gradient-to-r from-transparent via-red-600/20 to-transparent'>
			<h1 className='text-4xl tracking-wide pb-3'>Sorry &#128542;</h1>
			<p>It seems like you have encountered an error</p>
			<p>Please report it on <a className='text-blue-500' href='mailto:priorderity@email.cz'>priorderity@email.cz</a></p>
		</div>
	);
}
