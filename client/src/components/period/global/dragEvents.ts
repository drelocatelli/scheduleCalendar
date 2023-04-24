import { DragEvent } from 'react';
import { week } from '..';
import { hourWithZero } from '../modal/scheduleEvent';

class DragEvents {
    static start(ev: DragEvent) {
        console.log('start', ev);
        const element = ev.target as HTMLElement;
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.dropEffect = 'move';
        ev.dataTransfer.setData('text', element.title);
    }

    static end(ev: DragEvent) {
        ev.preventDefault();
        const card = ev.target as HTMLDivElement;
        const positionDrop = {
            x: ev.clientX,
            y: ev.clientY,
        };
        const element = document.elementFromPoint(positionDrop.x, positionDrop.y) as HTMLElement;
        const elementPos = {
            left: `${element.offsetLeft}px`,
            top: `${element.offsetTop}px`,
        };
        const hourEl = element.parentElement?.parentElement;
        const weekEl = hourEl?.parentElement?.parentElement;

        if (!hourEl && !element && !week) {
            return alert('Ocorreu um erro inesperado!');
        }
        const hourInit = hourWithZero(parseInt(hourEl?.dataset.hour!)).toString();
        const minInit = hourWithZero(parseInt(element.dataset.minute!)).toString();
        const hourEnd = hourWithZero(parseInt(hourEl?.dataset.hour!) - parseInt(card.dataset.hourdiff!)).toString();
        const minEnd = hourWithZero(parseInt(element.dataset.minute!) - parseInt(card.dataset.mindiff!)).toString();

        const newDate = {
            //@ts-ignore
            week: week[weekEl?.dataset.week],
            hour: {
                init: hourInit,
                end: hourEnd,
            },
            minute: {
                init: minInit,
                end: minEnd,
            },
        };
        console.dir(newDate);
        card.title = `${newDate.hour.init}:${newDate.minute.init} - ${newDate.hour.end}:${newDate.minute.end}, ${newDate.week}`;
        card.style.top = elementPos.top;
        card.style.left = elementPos.left;
    }

    static over(ev: DragEvent) {
        ev.preventDefault();
    }
}

export default DragEvents;
