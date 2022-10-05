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
    return (
        <div className="data-week" data-week={id}>
            <div className="week">{value}</div>
            <HourEl week={value} />
        </div>
    );
}

function HourEl({week}: {week: string}) {
    return (
        <div className="hours">
            {[...Array(24)].map((e, i) =>
                i >= 5 ? (
                    <div className="hour">
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
            {minutePosition.map((e, i) => ( <div className="minute" title={e}>&nbsp;</div> ))}
        </div>
    );
}
