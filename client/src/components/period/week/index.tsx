import { useRef } from "react";
import HourEl from "../hour";

function WeekEl({ id, value }: { id: number; value: string }) {

    const dataWeekRef = useRef(null);

    const hoverEffect = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        const backgroundProperty = (element: HTMLElement) => element.style.setProperty('background','#E1F3FC');

        if(target.parentElement && target.nextElementSibling) {
            const nextElement = target.nextElementSibling as HTMLElement;

            backgroundProperty(target.parentElement);
            backgroundProperty(nextElement);
        }
    }

    const disableHoverEffect = () => {
        if(dataWeekRef.current) {
            const element = dataWeekRef.current as HTMLElement;
            const childElement = element.querySelector('.hours') as HTMLElement;

            const resetBackgroundProperty = (element: HTMLElement) => element.style.setProperty('background','#fff');

            resetBackgroundProperty(element);
            resetBackgroundProperty(childElement);
        }
    }

    return (
        <div className="data-week" ref={dataWeekRef} data-week={id} onMouseLeave={disableHoverEffect}>
            <div className="week" onMouseMove={hoverEffect}>{value}</div>
            <HourEl week={value} />
        </div>
    );
}

export default WeekEl;