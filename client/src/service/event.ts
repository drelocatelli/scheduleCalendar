import { Event } from "../store/event";
import service from "./instance";

class EventService {

    static save(event: Event[]) {
        
    }

    static async index() {
       try {
            const response = await service.get('/schedule');

            console.log(response);

       } catch(err: any) {
            console.log(err);
       }
    }

}

export {EventService};