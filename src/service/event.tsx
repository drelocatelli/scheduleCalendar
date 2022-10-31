import { Event } from "../store/event";

class EventService {

    public static save(event: Event[]) {
        const storedEvents = JSON.parse(window.localStorage.getItem('scheduleEvents') ?? "\[\]") as Event[];
        
        storedEvents.push(event[0]);

        window.localStorage.setItem('scheduleEvents', JSON.stringify(storedEvents));
        
    }

    public static get() {
        const storedEvents = window.localStorage.getItem('scheduleEvents');

        return storedEvents;
    }

}

export {EventService};