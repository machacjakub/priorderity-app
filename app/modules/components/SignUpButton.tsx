export const SignUpButton = ({
	children,
	small,
	tailwind,
	formAction,
}: {
	children: string;
	small?: boolean;
	tailwind?: string;
	formAction?: string;
}) => {
	return (
		<button
			formAction={formAction}
			className={`text-black ${
				small ? "text-md" : "text-xl"
			} bg-gradient-to-r from-violet-300 to-cyan-300 font-semibold ${
				small ? "px-4" : "px-6"
			} ${
				small ? "py-1" : "py-3"
			} rounded-md hover:from-violet-200 hover:to-cyan-200 ${tailwind}`}
		>
			{children}
		</button>
	);
};
