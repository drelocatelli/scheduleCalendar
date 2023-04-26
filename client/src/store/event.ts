import { signal } from "@preact/signals-react";

export interface Event {
    id: string,
    title: string;
    description?: string;
    status: string;
    time: Time;
    color: string;
}

export interface Time {
    initTime: string;
    endTime: string;
    week: string;
}

// const eventStore = atom<Event[]>({
//     key: 'eventStore',
//     default: []
// });

// export {eventStore};

export const event = signal<Event[]>([]);