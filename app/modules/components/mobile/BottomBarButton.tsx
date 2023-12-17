export const BottomBarButton = ( { icon, onClick, }: { icon: any; onClick?: () => void } ) => {
	return (
		<button className="fixed bottom-3 right-3 rounded-full bg-background p-3 text-2xl text-foreground shadow-lg dark:bg-gray-900" onClick={onClick}>
			{icon}
		</button>
	);
};
