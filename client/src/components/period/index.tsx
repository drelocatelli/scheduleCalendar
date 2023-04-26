import { useEffect } from 'react';
import '../period/index.css';
import { Global } from './global';
import { signal } from '@preact/signals-react';
import WeekEl from './week';
import { EventService } from "../../service/event";
import { event } from "../../store/event";

const mount = signal(false);
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Period() {
    
    useEffect(() => {
        load();
    }, []);

    const load = async() => {
        let events = await EventService.index();
        event.value = events as any;
        console.log(event.value)
        setTimeout(() => {
            mount.value = true;
        }, 1000);
    };

    if(!mount) {
        return(
            <>Loading...</>
        );
    }
    
    return (
        <div className="period">
            <Global />
            {week.map((dayofWeek, i) => (
                <WeekEl key={i} id={i} value={dayofWeek} />
            ))}
        </div>
    );
}


export {week};


