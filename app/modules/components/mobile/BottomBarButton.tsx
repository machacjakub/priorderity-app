import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { useContext } from "react";

export const BottomBarButton = ( { icon, onClick, }: { icon: any; onClick?: () => void } ) => {
	const { doneActivities } = useContext( doneModuleContext );
	const isHighlighted = doneActivities.length < 2;
	return (
		<button className={`fixed bottom-3 right-3 rounded-full bg-background p-3 text-2xl text-foreground shadow-lg dark:bg-gray-900 ${isHighlighted && 'animate-pulse'}`} onClick={onClick}>
			{icon}
		</button>
	);
};
