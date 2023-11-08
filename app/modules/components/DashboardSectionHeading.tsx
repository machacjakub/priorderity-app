import { FadingLine } from "@/app/modules/components/FadingLine";

export const DashboardSectionHeading = ( { children }: { children: string } ) => {
	return (
		<div className="sticky top-0 bg-background/70 py-1 text-foreground backdrop-blur-sm">
			<h1 className="my-3 text-center text-xl">
				{children}
			</h1>
			<FadingLine />
		</div>
	);
};
