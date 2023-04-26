import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Period from "../components/period";
import Platform from "../components/platform";


function Home() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);
    
    return loaded ? (
        <Platform>
            <Modal />
            <Period />
        </Platform>
    ) : (
        <div style={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", fontSize: "30px"}}>
            Loading, please wait...
        </div>
    );
}

export {Home};