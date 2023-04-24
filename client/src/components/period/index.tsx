import { useEffect } from 'react';
import '../period/index.css';
import { Global } from './global';
import { signal } from '@preact/signals-react';
import WeekEl from './week';

const mount = signal(false);
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Period() {
    
    useEffect(() => {
        mount.value = true;
    }, []);

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


