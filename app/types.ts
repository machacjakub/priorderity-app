export interface IDoneActivity {
    id: number;
    type: string;
}

export type CategoryAttributes = null | { points: number, duration: number };

export interface IActivityAttributes {
    type: string;
    physical: CategoryAttributes;
    mental: CategoryAttributes;
    social: CategoryAttributes;
    career: CategoryAttributes;
    realization: CategoryAttributes;
}