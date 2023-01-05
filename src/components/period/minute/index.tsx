import MinPosition from "../global/position";

function MinuteEl() {
    const minutePosition = ['start', 'middle-start', 'middle', 'middle-end', 'end'];

    const minute = (pos: string) => {
        //@ts-ignore
        let posMin = MinPosition[pos];
        return posMin;
    }
    
    return (
        <div className="minutes">
            {minutePosition.map((pos, i) => (
                <div className="minute" key={i} data-position={pos} data-minute={minute(pos)}>
                    &nbsp;
                </div>
            ))}
        </div>
    );
}

export default MinuteEl;
