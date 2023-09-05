interface IProps {
    activity:{
        id: number; 
        type: string;
    }
}

export const ActivityInHistory = ( {activity}: IProps ) => {
	return <div key={activity.id} className="bg-blue-400 text-center rounded-lg p-3 m-3">{activity.type}</div>;
};