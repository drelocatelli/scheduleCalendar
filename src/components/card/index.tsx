import { Event } from "../../store/event";
import { clockSvg } from "../../utils/svgIcons";

export default function Card(event : Event) {
    return `
        <div class="card">
            ${event.title}
            ${event.status == 'busy' ? (`
                <div class="icon" title="busy">
                    ${clockSvg({size: 14, color: '#fff'})}
                </div>
            `): ``}
        </div>
`;
}