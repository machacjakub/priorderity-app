export const BottomBarButton = ( {
	icon,
	onClick,
}: {
	icon: any;
	onClick?: () => void;
} ) => {
	return (
		<button
			className="mb-2 rounded-full bg-background px-3 py-2 text-2xl text-foreground shadow-lg dark:bg-gray-900"
			onClick={onClick}
		>
			{icon}
		</button>
	);
};
