import './index.css';
import {FiClock} from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

interface InputProps {
    fHour: string;
    fMinute?: string;
    eHour?: string;
    eMinute?: string;
}

export default function ScheduleEvent(props: {week: string, hour: number}) {
    const {hour, week} = props;

    const date = new Date();
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];
    const currentMonth = months[date.getMonth()];
    const hourWithZero = (num: number) => (num <= 9) ? `0${num}` : num;

    const [inputs, setInputs] = useState<InputProps>({fHour: hourWithZero(hour).toString()});

    const handleInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = (parseInt(target.value) <= 9) ? `0${target.value}`: target.value;
        const name = target.name;
        setInputs(state => ({...state, [name]: value}) );
    }

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    
    return(
        <div className='schedule-event'>
            <form>
                <input type="text" className='spacing' style={{width: '-webkit-fill-available'}} placeholder="Add title" autoFocus />
                <div className="time-schedule basic-spacing">
                    <div className="timer icon">
                        <FiClock />
                    </div>
                    <div>
                        {week}, {currentMonth} &nbsp;&nbsp; 
                        {hourWithZero(hour)}:
                        <input type="number" name="fMinute" value={inputs.fMinute ?? '00'} onChange={handleInput} min="0" max="59" style={{fontSize: 'inherit'}} /> 
                        {hour >= 12 ? 'PM' : 'AM'}
                        &nbsp;&nbsp; - &nbsp;&nbsp; 
                        <input type="number" name="eHour" value={inputs.eHour ?? hourWithZero(hour+1)} onChange={handleInput} min="0" max="24" style={{fontSize: 'inherit'}} />
                        :
                        <input type="number" name="eMinute" value={inputs.eMinute ?? '00'} onChange={handleInput} min="0" max="59" style={{fontSize: 'inherit'}} />
                    </div>
                </div>
                <div className="basic-spacing">
                    to do busy function
                </div>
            </form>
        </div>
    );
}