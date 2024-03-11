import { toReadableDate } from "@/app/utils/date";


export const getLogger = ( module: string ) => {
	const messageComposer = ( status: string, level: 'debug' | 'info' | 'warn' | 'error', message: string, detail?: string ) => `${toReadableDate( new Date )} | ${level} | ${module} | ${status} | ${message} ${detail && `| ${detail}`}`;
	return {
		debug: ( status: string, message: string, detail?: string ) => console.debug( messageComposer( status, 'debug', message, detail ) ),
		info: ( status: string, message: string, detail?: string ) => console.info( messageComposer( status, 'info', message, detail ) ),
		warn: ( status: string, message: string, detail?: string ) => console.warn( messageComposer( status, 'warn', message, detail ) ),
		error: ( status: string, message: string, error: string, detail?: string ) => console.error( messageComposer( status,'error', message, `${error} ${detail && `| ${detail}`}` ) ),
	};
};