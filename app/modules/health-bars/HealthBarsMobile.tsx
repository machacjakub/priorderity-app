// import {FlexWrapper} from "../../components/utils_components/wrappers";
// import {IHealthStats} from "@/web/types";
// import {useContext} from "react";
// import {AppContext} from "@/web/AppContext";
//
// const StatsBar = ( {title, stat}: { title: string, stat: number } ) => {
// 	return ( <div style={{backgroundColor: '#DEF', padding: '6px', borderRadius: '10px'}}>
// 		<div>{title}</div>
// 		<div style={{textAlign: "center"}}>{stat}%</div>
// 	</div> );
// };
//
// export const HealthBarsMobile = () => {
// 	const healthStats: IHealthStats = useContext( AppContext ).healthStats;
// 	return (
// 		<div>
// 			<FlexWrapper>
// 				<StatsBar title={'Mental'} stat={healthStats.mental}/>
// 				<StatsBar title={'Physical'} stat={healthStats.physical}/>
// 				<StatsBar title={'Career'} stat={healthStats.career}/>
// 				<StatsBar title={'Social'} stat={healthStats.social}/>
// 				<StatsBar title={'Realization'} stat={healthStats.realization}/>
// 			</FlexWrapper>
// 		</div>
// 	);
// };
//
