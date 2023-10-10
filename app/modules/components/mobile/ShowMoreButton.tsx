export const ShowMoreButton = ( {
	isPreview,
}: {
	isPreview: { value: boolean; toggle: () => void };
} ) => (
	<button
		className="rounded-full bg-foreground/10 px-4 py-1 text-sm text-foreground"
		onClick={isPreview.toggle}
	>
		{isPreview.value ? "Show more" : "Show less"}
	</button>
);
