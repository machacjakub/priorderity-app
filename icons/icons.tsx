import { Bars3Icon } from "@heroicons/react/24/outline";

interface IconProps {
	className?: string;
	strokeWidth?: number;
}

export const DeleteOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>;

export const EditOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>;

export const UserOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>;
export const PlusOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>;
	
export const MinusOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
</svg>;

export const XOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>;

// eslint-disable-next-line react/jsx-no-undef
export const MenuOutlined = ( { className, strokeWidth }: IconProps ) => <Bars3Icon className={className} strokeWidth={strokeWidth ?? 1.5}/>;

export const HomeOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>;

export const ArrowLeftOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>;

export const CheckOutlined = ( { className, strokeWidth }: IconProps ) => <svg fill="none" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>;

export const EyeOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
	<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>;

export const EyeSlashOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>;
export const PlusCircleOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>;
export const ArrowSmallUpOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
</svg>;


export const ClocksOutlined = ( { className, strokeWidth }: IconProps ) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth ?? 1.5} stroke="currentColor" className={className ?? 'w-6 h-6'}>
	<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>;




