export const ShowMoreButton = ( { isPreview }: {isPreview: {value: boolean, toggle: () => void}} ) =>
	<button className='text-foreground bg-foreground/10 py-1 px-4 text-sm rounded-full' onClick={isPreview.toggle}>{isPreview.value ? 'Show more' : 'Show less'}</button>;
 