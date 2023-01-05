import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Period from "../components/period";
import Platform from "../components/platform";
import { EventService } from "../service/event";
import {event} from '../store/event';

function Home() {

    const [mounted, setMounted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setMounted(true);
    })

    useEffect(() => {
        if(mounted) {
            const savedEvents = JSON.parse(EventService.get() ?? "\[\]");
    
            console.log(savedEvents)
            event.value = (savedEvents);
    
            setLoaded(true);

        }
        
    }, [mounted]);
    
    return loaded ? (
        <Platform>
            <Modal />
            <Period />
        </Platform>
    ) : (
        <>Loading...</>
    );
}

export {Home};