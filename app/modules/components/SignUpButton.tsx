export const SignUpButton = ( {
	children,
	small,
	tailwind,
	formAction,
}: {
	children: string;
	small?: boolean;
	tailwind?: string;
	formAction?: string;
} ) => {
	return (
		<button formAction={formAction} className={`text-foreground font-semibold bg-blue-300 dark:bg-blue-500 ${small ? "sm:text-md" : "sm:text-xl"} ${small ? "px-4" : "px-6"} ${small ? "py-1" : "py-3"} rounded-xl hover:bg-blue-400 ${tailwind}`}>
			{children}
		</button>
	);
};
