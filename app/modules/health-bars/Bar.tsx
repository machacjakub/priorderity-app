import { ConfigProvider, Progress, Typography } from "antd";
import { useEffect, useState } from "react";
import { isBrowser } from "@/app/modules/utils";

interface IProps {
    title: string;
    percentage: number;
}
 
const getColor = ( percentage: number ) => {
	const red = 255 - ( percentage > 60 ? ( percentage - 60 ) * 4 : 0 );
	const green = 50 + ( percentage > 60 ? 170 : percentage * 2.8 );
	const blue = percentage < 60 ? 0 : ( percentage - 60 ) * 2;
	return `rgb(${red},${green},${blue})`;
};

export const Bar = ( { title, percentage }: IProps ) => {
	const [ progressBarSize, setprogressBarSize ] = useState( 20 );
	useEffect( () => {
		if ( isBrowser() ) {
			setprogressBarSize( window.innerHeight /15 );
		};
	} );
	const realPercentage = percentage > 100 ? 100 : percentage;

	return (
		<div className="text-center px-3 m-1 rounded-2xl flex-shrink">
			<ConfigProvider theme={{
				components: {
					Progress: {
						colorText: 'foreground',
					},
				},
			}}>
				<Progress size={progressBarSize} type="circle" percent={percentage} strokeColor={getColor( realPercentage )} trailColor={'rgba(120,120,120,0.5)'}/>
			</ConfigProvider>
			<Typography.Text
				style={{ textAlign: 'center', display: 'block', marginTop: '20px' }} className="text-foreground">{title}</Typography.Text>
		</div>
	);
};