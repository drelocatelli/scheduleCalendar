import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Period from "../components/period";
import Platform from "../components/platform";

function Home() {

    const [mounted, setMounted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setMounted(true);
    })

    useEffect(() => {
        if(mounted) {
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