import { Event } from "../../store/event";
import { clockSvg, flagSvg } from "../../utils/svgIcons";

function Card(id: number, event : Event, isEnd: boolean = false) {
    return `
        <div class="card ${isEnd ? 'isEnd' : ''}" title="${event.time.initTime} - ${event.time.endTime}">
            <span class="event_id">
                ${id} - 
            </span>
            ${event.title}
            ${isEnd ? (`
                <div class="icon" title="end of event">
                    ${flagSvg({size: 14, color: '#FF5722'})}
                </div>
            `): ''}
            ${!isEnd && event.status == 'busy' ? (`
                <div class="icon" title="busy">
                    ${clockSvg({size: 14, color: '#fff'})}
                </div>
            `): ''}
        </div>
`;
}

export {Card}; 