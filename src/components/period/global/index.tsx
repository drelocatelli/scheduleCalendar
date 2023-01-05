import React from 'react';
import { event, Time } from '../../../store/event';
import DragEvents from './dragEvents';
import './index.css';
import MinPosition from './position';

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
        console.log(time);
        let initHour = parseInt(time.initTime.split(':')[0]);
        let endHour = parseInt(time.endTime.split(':')[0]);
        const diff = endHour - initHour;

        return diff;
    };

    const minDiff = (time: Time) => {
        console.log(time);
        let initMin = parseInt(time.initTime.split(':')[1]);
        let endMin = parseInt(time.endTime.split(':')[1]);
        const diff = endMin - initMin;
        
        return diff;
    };

    return (
        <div className="global" onDrop={DragEvents.over} onDragEnd={DragEvents.end} onDragOver={DragEvents.over}>
            <Lines />
            {event.value.map((e, i) => (
                <div
                    key={i}
                    className="card"
                    title={`${e.time.initTime} - ${e.time.endTime}, ${e.time.week}`}
                    data-hourDiff={hourDiff(e.time)}
                    data-minDiff={minDiff(e.time)}
                    draggable={true}
                    onDragStart={DragEvents.start}
                    style={{
                        top: eventProp(i)?.offset,
                        left: eventProp(i)?.minPos.left,
                        background: eventProp(i)?.color,
                        width: `${eventProp(i)?.minPos.width}px`,
                        height: `${eventProp(i)?.maxPos}px`,
                    }}>
                    {e.title}
                </div>
            ))}
        </div>
    );
};

export { Global };
