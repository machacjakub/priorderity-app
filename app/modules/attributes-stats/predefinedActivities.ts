import { IActivityAttributes } from "@/app/types";


export const predefinedActivities: IActivityAttributes[] = [
	{ 
		type: '30-ex',
		physical: { points: 30, duration: 100 },
		mental: { points: 20, duration: 36 },
		social: null,
		career: null,
		realization: { points: 5, duration: 48 },
	},
	{
		type: '10-ex',
		physical: { points: 20, duration: 30 },
		mental: { points: 10, duration: 24 },
		social: null,
		career: null,
		realization: null
	},
	{
		type: '1-ex',
		physical: { points: 5, duration: 20 },
		mental: { points: 4, duration: 10 },
		social: null,
		career: null,
		realization: null
	},
	{
		type: 'sauna',
		physical: { points: 35, duration: 60 },
		mental: { points: 8, duration: 36 },
		social: null,
		career: null,
		realization: { points: 5, duration: 60 },
	},
	{
		type: 'otuzovani',
		physical: { points: 8, duration: 38 },
		mental: { points: 4, duration: 24 },
		social: null,
		career: null,
		realization: { points: 4, duration: 22 }
	},
	{
		type: 'vzdelavani',
		physical: null,
		mental: { points: 4, duration: 48 },
		social: null,
		career: null,
		realization: { points: 10, duration: 120 }
	},
	{
		type: 'friends',
		physical: null,
		mental: { points: 5, duration: 45 },
		social: { points: 12, duration: 160 },
		career: null,
		realization: null
	},
	{
		type: 'family',
		physical: null,
		mental: { points: 5, duration: 45 },
		social: { points: 12, duration: 160 },
		career: null,
		realization: null
	},
	{
		type: '15-meditation',
		physical: null,
		mental: { points: 16, duration: 96 },
		social: null,
		career: null,
		realization: { points: 5, duration: 50 }
	},
	{
		type: '15-reading',
		physical: null,
		mental: { points: 3, duration: 12 },
		social: null,
		career: null,
		realization: { points: 6, duration: 24 }
	},
	{
		type: '40-reading',
		physical: null,
		mental: { points: 5, duration: 20 },
		social: null,
		career: null,
		realization: { points: 14, duration: 48 }
	},
	{
		type: 'prochazka',
		physical: { points: 6, duration: 50 },
		mental: { points: 8, duration: 50 },
		social: null,
		career: null,
		realization: { points: 6, duration: 48 }
	},
];

export const getPredefinedActivitiesAttributes = () => predefinedActivities;