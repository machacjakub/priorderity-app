const Mobile = ( { children }: { children: any } ) => {
	return <div className="sm:hidden">{children}</div>;
};

const Desktop = ( { children }: { children: any } ) => {
	return <div className="hidden sm:block">{children}</div>;
};

export const Responsive = {
	Mobile,
	Desktop,
};
