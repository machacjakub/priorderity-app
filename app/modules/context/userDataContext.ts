import { createContext } from "react";
import { IUserData } from "@/app/modules/profile/types";


const defaultValue: IUserData = {
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
	habits: []
};
const userDataContext = createContext<IUserData>( defaultValue );

export default userDataContext;