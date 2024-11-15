interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    gender?: 'Male' | 'Female';
    height: number;
    weight: number;
    createdAt: string;
    goals?: Goal;
}
