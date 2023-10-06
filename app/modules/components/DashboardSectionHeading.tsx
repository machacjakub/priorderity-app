import {FadingLine} from "@/app/modules/components/FadingLine";

export const DashboardSectionHeading = ( {children}: {children: string} ) => {
	return (
		<div className="sticky top-0 py-1 backdrop-blur-sm bg-background/70 text-foreground">
			<h1 className="my-3 text-center text-2xl">{children}</h1>
			<FadingLine/>
		</div> );
};