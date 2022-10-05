import { useEffect } from "react";
import Period from "../components/period";
import Platform from "../components/platform";

function Home() {
    
    useEffect(() => {
        const weekPeriod = document.querySelectorAll('div[data-week]');
        console.log(weekPeriod)
    }, [])

    return(
        <Platform>
            <Period />
        </Platform>
    );
}

export {Home};