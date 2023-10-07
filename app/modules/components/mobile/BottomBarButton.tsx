
export const BottomBarButton = ( { icon, onClick }: {icon: any, onClick?: () => void} ) => { 
	return <button className="text-foreground bg-background dark:bg-gray-900 text-2xl px-3 py-2 mb-2 shadow-lg rounded-full" onClick={onClick}>{icon}</button>;
};