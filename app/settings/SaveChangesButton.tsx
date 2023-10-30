
export const SaveChangesButton = ( { onClick, active }: {active?: boolean,onClick: () => void} ) => {
	return <button className={`${active ? 'text-foreground' : 'text-foreground/70'} border ${active ? 'border-green-400/90' : 'border-green-700/80'} ${active ? 'dark:border-green-500/80' : 'border-green-800/70'}  bg-green-500/20 py-1 px-4 mt-1 rounded-full`} onClick={onClick} >Save changes</button>;
};