import { createContext } from "react";
import { IUserData } from "@/app/modules/profile/types";
import { Nullable } from "fputils";


const defaultValue: Nullable<IUserData> = {
	id: '',
	updated_at: 0,
	username: '',
	website: '',
	created_at: new Date(),
	firstname: '',
	lastname: '',
	metrics: [],
	activities_stats: [],
	recommendations: [],
	tags: [],
};
const userDataContext = createContext<Nullable<IUserData>>( defaultValue );

export default userDataContext;