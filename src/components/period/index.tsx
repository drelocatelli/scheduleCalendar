import '../period/index.css';

export default function Period() {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="period">
            {week.map((dayofWeek, i) => (
                <WeekEl key={i} id={i} value={dayofWeek} />
            ))}
        </div>
    );
}

function WeekEl({ id, value }: { id: number; value: string }) {

    const hoverEffect = (e: React.MouseEvent, active: boolean = true) => {
        const target = e.target as HTMLElement;
        
        if(target.parentElement) {
            const computedStyle = window.getComputedStyle(target.parentElement).getPropertyValue('background');
            console.log(computedStyle)
            if(active) return target.parentElement.style.setProperty('background','#f5f5f5');
            target.parentElement.style.setProperty('background', '#fff');
        }
    }

    return (
        <div className="data-week" data-week={id}>
            <div className="week" onMouseMove={hoverEffect} onMouseLeave={(e) => hoverEffect(e, false)}>{value}</div>
            <HourEl week={value} />
        </div>
    );
}

function HourEl({week}: {week: string}) {
    return (
        <div className="hours" >
            {[...Array(24)].map((_, i) =>
                i >= 5 ? (
                    <div className="hour" key={i}>
                        <div title={`${i+1} ${i + 1 >= 12 ? 'PM' : 'AM'}, ${week}`}>
                            {i + 1}
                            <span style={{ fontSize: '12px' }}>{i + 1 >= 12 ? 'PM' : 'AM'}</span>
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
