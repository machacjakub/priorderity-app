import { IPredefinedActivity } from "@/app/modules/profile/types";

export const predefinedActivities: IPredefinedActivity[] = [
	{
		type: "30min_exercise",
		label: '30min exercise',
		metrics: {
			physical_health: { points: 30, duration: 100 },
			mental_health: { points: 20, duration: 36 },
			relationships: null,
			career: null,
			realization: { points: 5, duration: 48 },
		}
	},
	{
		type: "10min_exercise",
		label: '10min exercise',
		metrics: {
			physical_health: { points: 20, duration: 30 },
			mental_health: { points: 10, duration: 24 },
			relationships: null,
			career: null,
			realization: null,
		}
	},
	{
		type: "1min_exercise",
		label: '1min exercise',
		metrics: {
			physical_health: { points: 5, duration: 20 },
			mental_health: { points: 4, duration: 10 },
			relationships: null,
			career: null,
			realization: null,
		}
	},
	{
		type: "sauna",
		label: 'Sauna',
		metrics: {
			physical_health: { points: 35, duration: 60 },
			mental_health: { points: 8, duration: 36 },
			relationships: null,
			career: null,
			realization: { points: 5, duration: 60 },
		}
	},
	{
		type: "cold_shower",
		label: 'Cold shower',
		metrics: {
			physical_health: { points: 8, duration: 38 },
			mental_health: { points: 4, duration: 24 },
			relationships: null,
			career: null,
			realization: { points: 4, duration: 22 },
		}
	},
	{
		type: "40min_educating",
		label: '40min educating',
		metrics: {
			physical_health: null,
			mental_health: { points: 4, duration: 48 },
			relationships: null,
			career: { points: 15, duration: 240 },
			realization: { points: 10, duration: 120 },
		}
	},
	{
		type: "friends",
		label: 'Friends',
		metrics: {
			physical_health: null,
			mental_health: { points: 5, duration: 45 },
			relationships: { points: 12, duration: 160 },
			career: null,
			realization: null,
		}
	},
	{
		type: "15min_meditation",
		label: '15min meditation',
		metrics: {
			physical_health: null,
			mental_health: { points: 16, duration: 96 },
			relationships: null,
			career: null,
			realization: { points: 5, duration: 50 },
		}
	},
	{
		type: "15min_reading",
		label: '15min reading',
		metrics: {
			physical_health: null,
			mental_health: { points: 3, duration: 12 },
			relationships: null,
			career: null,
			realization: { points: 6, duration: 24 },
		}
	},
	{
		type: "40min_reading",
		label: '40min reading',
		metrics: {
			physical_health: null,
			mental_health: { points: 5, duration: 20 },
			relationships: null,
			career: null,
			realization: { points: 14, duration: 48 },
		}
	},
	{
		type: "go_walk",
		label: 'Go walk',
		metrics: {
			physical_health: { points: 6, duration: 50 },
			mental_health: { points: 8, duration: 50 },
			relationships: null,
			career: null,
			realization: { points: 6, duration: 48 },
		}
	},
];

export const getPredefinedActivitiesAttributes = () => predefinedActivities;
