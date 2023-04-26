import { SortColor } from "../utils/sortColor";

function EventsMap(events: any[]) {
    events = events?.map(event => {
        event["status"] = event.busy ? "busy" : "free";
        event["title"] = event.description;
        event["time"] = {
            initTime: event["start_time"],
            endTime: event["end_time"],
            week: event["week"].toLowerCase()
        }
        event.color = SortColor();
        
        delete event.busy;
        delete event.title; 
        delete event.start_time;
        delete event.end_time,
        delete event.week;
        return event;
    });

    console.log(events)

    return events;
}

export {EventsMap};