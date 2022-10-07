import { atom } from "recoil";

export interface Event {
    title: string;
    description?: string;
    status: string;
    time: Time;
}

interface Time {
    initTime: string;
    endTime: string;
    week: string;
}

const eventStore = atom<Event[]>({
    key: 'eventStore',
    default: []
});

export {eventStore};