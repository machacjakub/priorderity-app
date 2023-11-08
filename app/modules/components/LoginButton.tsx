export const LogInButton = ( {
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
		<button
			formAction={formAction}
			className={`px-4 font-semibold text-foreground ${
				small ? "py-1" : "py-3"
			} rounded-xl hover:from-violet-200 hover:to-cyan-200 ${tailwind}`}
		>
			{children}
		</button>
	);
};
