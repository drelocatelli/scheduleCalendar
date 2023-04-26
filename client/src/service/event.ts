import { Event } from "../store/event";
import { EventsMap } from "./event.types";
import service from "./instance";

class EventService {

    static save(event: Event[]) {
        
    }

    static async index() : Promise<any[] | undefined> {
       try {
            const response = await service.get('/schedule');

            return EventsMap(response.data.response);

       } catch(err: any) {
            console.log(err);
            return undefined;
       }
    }

}

export {EventService};