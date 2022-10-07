import { atom } from "recoil";

interface Event {
    title: string;
    description?: string;
    status: string;
    time: Time;
}

interface Time {
    initTime: string;
    endTime: string;
}

const eventStore = atom<Event[]>({
    key: 'eventStore',
    default: []
});

export {eventStore};