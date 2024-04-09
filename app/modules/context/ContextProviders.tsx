import { ReactNode } from "react";
import DoneModuleContext, { IDoneActivitiesModule } from "@/app/modules/context/doneModuleContext";
import UserDataContext from "@/app/modules/context/userDataContext";
import TodoModuleContext, { ITodoModule } from "@/app/modules/context/todoModuleContext";
import { IUserData } from "@/app/modules/profile/types";

interface IProps {
    children: ReactNode;
    doneModuleValues: IDoneActivitiesModule;
    todoModuleValues: ITodoModule;
    userDataValues: IUserData;
}
export const ContextProviders = ( { children, doneModuleValues, todoModuleValues, userDataValues }: IProps ) => {
	return (
		<DoneModuleContext.Provider value={doneModuleValues}>
			<UserDataContext.Provider value={userDataValues}>
				<TodoModuleContext.Provider value={todoModuleValues}>
					{children}
				</TodoModuleContext.Provider>
			</UserDataContext.Provider>
		</DoneModuleContext.Provider>
	);
};