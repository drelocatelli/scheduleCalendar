import { MouseEvent } from 'react';
import { event, Time } from '../../../store/event';
import DragEvents from './dragEvents';
import './index.css';
import MinPosition from './position';
import { signalModal } from '../../../store/modal';
import ScheduleEvent from '../modal/scheduleEvent';

const Global = () => {
    const Lines = () => {
        const allMinutesPos = Array.from(document.querySelectorAll('.minute')) as HTMLElement[];
        let minutesPosOffset = [];

        for (let minutesPos of allMinutesPos) {
            minutesPosOffset.push(minutesPos.offsetTop);
        }

        return (
            <>
                {minutesPosOffset.map((e, i) => (
                    <div className="line" key={i} style={{ top: e }}></div>
                ))}
            </>
        );
    };

    const eventProp = (i: number) => {
        const allHourElement = Array.from(document.querySelectorAll('.hours .hour')) as HTMLElement[];

        // find the event widget element
        const eventTime = parseInt(event.value[i].time.initTime).toString();
        const endEventTime = parseInt(event.value[i].time.endTime).toString();
        const hourElement = allHourElement.find((el) => el.dataset.week == event.value[i].time.week && el.dataset.hour == eventTime);
        const nextHourElement = allHourElement.find((el) => el.dataset.week == event.value[i].time.week && el.dataset.hour == endEventTime);

        const initMinute = parseInt(event.value[i].time.initTime.split(':')[1]);
        const endMinute = parseInt(event.value[i].time.endTime.split(':')[1]);
        const eventMinPosition = calcPos(initMinute);
        const eventMaxPosition = calcPos(endMinute);

        const minutesInitPosElements = Array.from(hourElement?.lastChild?.childNodes ?? []) as HTMLElement[];
        const minutesEndPosElements = Array.from(nextHourElement?.lastChild?.childNodes ?? []) as HTMLElement[];

        const minPosEl = minutesInitPosElements?.find((el) => el.dataset.position == eventMinPosition);
        const maxPosEl = minutesEndPosElements?.find((el) => el.dataset.position == eventMaxPosition);

        function calcPos(min: number) {
            return min <= MinPosition.start ? 'start' : min <= MinPosition['middle-start'] ? 'middle-start' : min <= MinPosition.middle ? 'middle' : min <= MinPosition['middle-end'] ? 'middle-end' : 'end';
        }

        if (minPosEl && maxPosEl) {
            const minPos = minPosEl.getBoundingClientRect();
            const offset = `${minPosEl.offsetTop}px`;
            const maxPos = maxPosEl.getBoundingClientRect().y - minPos.y;

            return {
                time: event.value[i].time,
                offset,
                minPos,
                maxPos,
                color: event.value[i].color,
            };
        }
    };

    const hourDiff = (time: Time) => {
        let initHour = parseInt(time.initTime.split(':')[0]);
        let endHour = parseInt(time.endTime.split(':')[0]);
        const diff = endHour - initHour;

        return diff;
    };

    const minDiff = (time: Time) => {
        let initMin = parseInt(time.initTime.split(':')[1]);
        let endMin = parseInt(time.endTime.split(':')[1]);
        const diff = endMin - initMin;
        
        return diff;
    };

    const updateEvent = (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
        const props = {
            title: target.dataset.description,
            hour: parseInt(target.dataset.hour!.split(':')[0]),
            minute: target.dataset.hour!.split(':')[1],
            endHour: target.dataset['endHour'],
            week: target.dataset!.week,
            status: target.dataset.status,
        }
        signalModal.value = ({isShowing: true, title: 'Schedule event', content: <ScheduleEvent id={target.id} object={props} hour={props.hour} week={props.week!} />});
    };

    return (
        <div className="global" onDrop={DragEvents.over} onDragEnd={DragEvents.end} onDragOver={DragEvents.over}>
            <Lines />
            {event.value.map((e, i) => (
                <div
                    key={i}
                    className="card"
                    id={e?.id}
                    data-description={e.title}
                    data-hour={e.time.initTime}
                    data-status={e.status}
                    data-end-hour={e.time.endTime}
                    data-week={e.time.week}
                    title={`${e.time.initTime} - ${e.time.endTime}, ${e.time.week}`}
                    onClick={updateEvent}
                    data-hourdiff={hourDiff(e.time)}
                    data-mindiff={minDiff(e.time)}
                    draggable={true}
                    onDragStart={DragEvents.start}
                    style={{
                        top: eventProp(i)?.offset,
                        left: eventProp(i)?.minPos.left,
                        background: eventProp(i)?.color,
                        width: `${eventProp(i)?.minPos.width}px`,
                        height: `${eventProp(i)?.maxPos}px`,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <div>
                            {e.title}

                        </div>

                        <div>
                            {e.status == 'busy' && (
                                <>busy</>
                            )}
                        </div>
                    
                </div>
            ))}
        </div>
    );
};

export { Global };
