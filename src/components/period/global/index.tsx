import { useRecoilState } from 'recoil';
import { eventStore } from '../../../store/event';
import './index.css';

const Global = () => {
    const [events, setEvents] = useRecoilState(eventStore);

    const Lines = () => {
        const allMinutesPos = Array.from(document.querySelectorAll('.minute')) as HTMLElement[];
        let minutesPosOffset = [];

        for(let minutesPos of allMinutesPos) {
            minutesPosOffset.push(minutesPos.offsetTop);
        }

        return(
            <>
                {minutesPosOffset.map((e, i) => (
                    <div className="line" key={i} style={{top: e}}></div>
                ))}
            </>
        );
    };

    const eventProp = (i: number) => {
        const allHourElement = Array.from(document.querySelectorAll('.hours .hour')) as HTMLElement[];

        // find the event widget element
        const eventTime = parseInt(events[i].time.initTime).toString();
        const endEventTime = parseInt(events[i].time.endTime).toString();
        const hourElement = allHourElement.find((el) => el.dataset.week == events[i].time.week && el.dataset.hour == eventTime);
        const nextHourElement = allHourElement.find((el) => el.dataset.week == events[i].time.week && el.dataset.hour == endEventTime);

        const initMinute = parseInt(events[i].time.initTime.split(':')[1]);
        const endMinute = parseInt(events[i].time.endTime.split(':')[1]);
        const eventMinPosition = calcPos(initMinute);
        const eventMaxPosition = calcPos(endMinute);

        const minutesInitPosElements = Array.from(hourElement?.lastChild?.childNodes ?? []) as HTMLElement[];
        const minutesEndPosElements = Array.from(nextHourElement?.lastChild?.childNodes ?? []) as HTMLElement[];

        const minPosEl = minutesInitPosElements?.find((el) => el.dataset.position == eventMinPosition);
        const maxPosEl = minutesEndPosElements?.find((el) => el.dataset.position == eventMaxPosition);

        function calcPos(min: number) {
            return min <= 11.8 ? 'start' : min <= 27.6 ? 'middle-start' : min <= 41.4 ? 'middle' : min <= 55.2 ? 'middle-end' : 'end';
        }

        if (minPosEl && maxPosEl) {
            const minPos = minPosEl.getBoundingClientRect();
            const offset = `${minPosEl.offsetTop}px`;
            const maxPos = maxPosEl.getBoundingClientRect().y - minPos.y;

            return {
                time: events[i].time,
                offset,
                minPos,
                maxPos,
                color: events[i].color
            };
        }
    };

    return (
        <div className="global">
            <Lines />
            {events.map((e, i) => (
                <div
                    key={i}
                    className="card"
                    title={`${e.time.initTime} - ${e.time.endTime}`}
                    style={{
                        top: eventProp(i)?.offset,
                        left: eventProp(i)?.minPos.left,
                        background: eventProp(i)?.color,
                        width: `${eventProp(i)?.minPos.width}px`,
                        height: `${eventProp(i)?.maxPos}px`,
                    }}>
                    {e.title}
                </div>
            )) }
        </div>
    );
};

export { Global };
