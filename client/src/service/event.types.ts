//@ts-nocheck
import { event } from "../store/event";
import { SortColor } from "../utils/sortColor";

function EventsMap(events: any[]) {
    console.log(events)
    if(Array.isArray(events)) {
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
            delete event.start_time;
            delete event.end_time,
            delete event.week;
            return event;
        });
    } else {
        events = {
            status: events.busy ? "busy" : "free",
            title: events.description,
            time: {
              initTime: events["start_time"],
              endTime: events["end_time"],
              week: events["week"].toLowerCase()
            },
            color: SortColor()
          };
        
          delete events.busy;
          delete events.start_time;
          delete events.end_time;
          delete events.week;
    }

    console.log(events)

    return events;
}

export {EventsMap};