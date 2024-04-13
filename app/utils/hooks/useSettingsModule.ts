import { IUserData } from "@/app/modules/profile/types";
import { useOptimistic } from "react";
import { handleUpdateRecommendations } from "@/database/actions";
import { Nullable } from "fputils";

export const useSettingsModule = ( initial: Nullable<IUserData> ) => {
	const [ recommendations, optimisticUpdate ] = useOptimistic<IUserData['recommendations'], IUserData['recommendations']>( initial?.recommendations ?? [], ( _:any, newRecommendations: IUserData['recommendations'] ) => {
		return newRecommendations;
	} );

	const updateRecommendations = async ( newRecommendations: IUserData['recommendations'] ) => {
		optimisticUpdate( newRecommendations );
		await handleUpdateRecommendations( newRecommendations ?? [] );
	};
	return { recommendations, updateRecommendations };
};