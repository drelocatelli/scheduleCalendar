import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { eventStore } from '../../store/event';
import { modalStore } from '../../store/modal';
import '../period/index.css';
import ScheduleEvent from './modal/scheduleEvent';

export default function Period() {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [events, setEvents] = useRecoilState(eventStore);
    
    const allHourElement = Array.from(document.querySelectorAll('.hours .hour')) as HTMLElement[];

    useEffect(() => {
        defineEvent();
    }, [events])

    function defineEvent() {
        events.forEach(event => {
            // find the event widget element
            const eventTime = parseInt(event.time.initTime).toString();
            const hourElement = allHourElement.find(el => (el.dataset.week == event.time.week && el.dataset.hour == eventTime));

            console.log(hourElement)
        });
    }

    return (
        <div className="period">
            {week.map((dayofWeek, i) => (
                <WeekEl key={i} id={i} value={dayofWeek} />
            ))}
        </div>
    );
}

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

function HourEl({week}: {week: string}) {
    
    const [modal, setModal] = useRecoilState(modalStore);

    const toggleModal = (props: {week: string, hour: number}) => {
        const {hour, week} = props;

        setModal({isShowing: true, title: 'Schedule event', content: <ScheduleEvent hour={hour} week={week} />});

    }
    
    return (
        <div className="hours" >
            {[...Array(24)].map((_, i) =>
                i >= 5 ? (
                    <div className="hour" data-week={week.toLowerCase()} data-hour={i+1} key={i} onClick={() => toggleModal({hour: i+1, week})}>
                        <div title={`${i+1} ${i + 1 >= 12 ? 'PM' : 'AM'}, ${week}`}>
                            {i + 1}
                            <span className="hour-period">{i + 1 >= 12 ? 'PM' : 'AM'}</span>
                        </div>
                        <MinuteEl />
                    </div>
                ) : null,
            )}
        </div>
    );
}

function MinuteEl() {
    const minutePosition = ['start', 'middle-start', 'middle', 'middle-end', 'end'];

    return (
        <div className="minutes">
            {minutePosition.map((e, i) => ( <div className="minute" key={i} title={e}>&nbsp;</div> ))}
        </div>
    );
}