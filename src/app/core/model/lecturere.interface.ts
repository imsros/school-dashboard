export interface Lecturer {
    id: string;
    username: string;
    email: string;
    phone: number;
    profession: string[];
    available_hour: Available_Hour[];
    image: string;
}

export interface DaysOption {
    day: string;
    value: string;
}

export interface Available_Hour {
    day: string;
    hours: string[]
}

