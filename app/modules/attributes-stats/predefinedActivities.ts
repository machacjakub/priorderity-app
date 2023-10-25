import { IPredefinedActivity } from "@/app/modules/profile/types";

export const predefinedActivities: IPredefinedActivity[] = [
	{
		type: "30-ex",
		label: '30min exercise',
		metrics: {
			physical: { points: 30, duration: 100 },
			mental: { points: 20, duration: 36 },
			social: null,
			career: null,
			realization: { points: 5, duration: 48 },
		}
	},
	{
		type: "10-ex",
		label: '10min exercise',
		metrics: {
			physical: { points: 20, duration: 30 },
			mental: { points: 10, duration: 24 },
			social: null,
			career: null,
			realization: null,
		}
	},
	{
		type: "1-ex",
		label: '1min exercise',
		metrics: {
			physical: { points: 5, duration: 20 },
			mental: { points: 4, duration: 10 },
			social: null,
			career: null,
			realization: null,
		}
	},
	{
		type: "sauna",
		label: 'Sauna',
		metrics: {
			physical: { points: 35, duration: 60 },
			mental: { points: 8, duration: 36 },
			social: null,
			career: null,
			realization: { points: 5, duration: 60 },
		}
	},
	{
		type: "otuzovani",
		label: 'Cold shower',
		metrics: {
			physical: { points: 8, duration: 38 },
			mental: { points: 4, duration: 24 },
			social: null,
			career: null,
			realization: { points: 4, duration: 22 },
		}
	},
	{
		type: "vzdelavani",
		label: '40min educating',
		metrics: {
			physical: null,
			mental: { points: 4, duration: 48 },
			social: null,
			career: { points: 15, duration: 240 },
			realization: { points: 10, duration: 120 },
		}
	},
	{
		type: "friends",
		label: 'Friends',
		metrics: {
			physical: null,
			mental: { points: 5, duration: 45 },
			social: { points: 12, duration: 160 },
			career: null,
			realization: null,
		}
	},
	{
		type: "15-meditation",
		label: '15min meditation',
		metrics: {
			physical: null,
			mental: { points: 16, duration: 96 },
			social: null,
			career: null,
			realization: { points: 5, duration: 50 },
		}
	},
	{
		type: "15-reading",
		label: '15min reading',
		metrics: {
			physical: null,
			mental: { points: 3, duration: 12 },
			social: null,
			career: null,
			realization: { points: 6, duration: 24 },
		}
	},
	{
		type: "40-reading",
		label: '40min reading',
		metrics: {
			physical: null,
			mental: { points: 5, duration: 20 },
			social: null,
			career: null,
			realization: { points: 14, duration: 48 },
		}
	},
	{
		type: "prochazka",
		label: 'Go walk',
		metrics: {
			physical: { points: 6, duration: 50 },
			mental: { points: 8, duration: 50 },
			social: null,
			career: null,
			realization: { points: 6, duration: 48 },
		}
	},
];

export const getPredefinedActivitiesAttributes = () => predefinedActivities;
