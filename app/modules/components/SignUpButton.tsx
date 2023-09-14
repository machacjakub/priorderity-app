export const SignUpButton = ( {text, small, tailwind}: {text: string, small?: boolean, tailwind?: string} ) => {
	return <button className={`text-black font-semibold bg-gradient-to-r from-white to-cyan-200 px-4 ${small ? 'py-1' : 'py-3'} mx-2 rounded-md border border-black hover:from-violet-200 hover:to-cyan-300`} >{text}</button>;
};