export const TodoItem = ( {name}: {name: string} ) => {
	return (
		<div className="bg-blue-400	m-2 py-2 px-4 rounded-xl">
			{name}
		</div> );
};