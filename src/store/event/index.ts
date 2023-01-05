export interface Event {
    title: string;
    description?: string;
    status: string;
    time: Time;
    color: string;
}

interface Time {
    initTime: string;
    endTime: string;
    week: string;
}
