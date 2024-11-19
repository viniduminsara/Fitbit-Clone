interface IMetrics{
    uid: string;
    date: Date;
    steps: number;
    distance: number;
    caloriesBurned: number;
    activities: IActivity[];
}
