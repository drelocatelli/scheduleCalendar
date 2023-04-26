import { Event } from "../store/event";
import { EventsMap } from "./event.types";
import service from "./instance";
import { event } from "../store/event";

class EventService {

    static async index() : Promise<Event[] | undefined> {
       try {
            const response = await service.get('/schedule');

            let data = EventsMap(response.data.response);

            event.value = data;

       } catch(err: any) {
            console.log(err);
            return undefined;
       }
    }

    static async save(payload: Event) : Promise<Event[] | undefined> {
        try {
          const response = await service.post('/schedule/create', payload);
          let data = EventsMap(response.data.response);

          event.value = [
               ...event.value,
               data
          ] as any;
          
        } catch(err: any) {
          console.log(err);
          return undefined;
        }
    }

}

export {EventService};