import './index.css';

export default function ScheduleEvent(props: {week: string, hour: number}) {
    return(
        <div className='schedule-event'>
            <form>
                <input type="text" placeholder="Add title" />
                <button type='button'>Event</button>
                <button type='button'>Task</button>
                <button type='button'>Active</button>
                <button type='button'>Busy</button>
            </form>
        </div>
    );
}