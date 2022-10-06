import './index.css';
import {FiClock} from 'react-icons/fi';

export default function ScheduleEvent(props: {week: string, hour: number}) {
    const {hour, week} = props;
    
    return(
        <div className='schedule-event'>
            <form>
                <input type="text" className='spacing' placeholder="Add title" />
                <div className="time-schedule basic-spacing">
                    <div className="timer icon">
                        <FiClock />
                    </div>
                    <div className=''>
                        {week}, {hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                    </div>
                </div>
                <div className="basic-spacing">
                    to do busy function
                </div>
            </form>
        </div>
    );
}