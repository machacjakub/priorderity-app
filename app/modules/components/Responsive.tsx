const Mobile = ( { children }: { children: any } ) => {
	return <div className="sm:hidden">{children}</div>;
};

const Desktop = ( { children }: { children: any } ) => {
	return <div className="hidden sm:block">{children}</div>;
};
const Light = ( { children }: { children: any } ) => {
	return <div className="dark:hidden">{children}</div>;
};
const Dark = ( { children }: { children: any } ) => {
	return <div className="hidden dark:block">{children}</div>;
};

export const Responsive = {
	Mobile,
	Desktop,
	Light,
	Dark
};