import './index.css';
import {FiClock} from 'react-icons/fi';
import {BsFillCalendarDateFill} from 'react-icons/bs';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalStore } from '../../../../store/modal';
import { eventStore } from '../../../../store/event';
import { EventService } from '../../../../service/event';

interface InputProps {
    title: string;
    fHour: string;
    fMinute: string;
    eHour: string;
    eMinute: string;
    status: string;
}

export default function ScheduleEvent(props: {week: string, hour: number}) {
    const {hour, week} = props;

    const hourWithZero = (num: number) => (num <= 9) ? `0${num}` : num;

    const initialState : InputProps = {
        title: '(No title)',
        fHour: hourWithZero(hour).toString(), 
        fMinute: '00',
        eHour: hourWithZero(hour+1).toString(),
        eMinute: '00',
        status: 'free'
    };

    const [inputs, setInputs] = useState<InputProps>(initialState);
    const [modal, setModal] = useRecoilState(modalStore);
    const [event, setEvent] = useRecoilState(eventStore);

    const handleInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        setInputs(state => ({...state, [name]: value}) );
    }

    const selectTarget = (e: React.MouseEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        element.select();
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const colors = ['#009688', '#8BC34A', '#00BCD4', '#E91E63', '#FF5722', '#673AB7'];
        const chooseColor = Math.floor(Math.random() * ((colors.length - 1) - 0) + 0);
        
        const {title, fHour, eHour, eMinute, fMinute, status} = inputs;

        const newEvent = [
            ...event, 
            {
                title, 
                status,
                color: colors[chooseColor],
                time: {
                    initTime: `${fHour}:${fMinute}`,
                    endTime: `${eHour}:${eMinute}`,
                    week: week.toLowerCase(),
                },
            }
        ];

        setEvent(newEvent);
        // todo save
        // EventService.save(newEvent);

        // close modal
        setTimeout(() => setModal({isShowing: false}), 200);

    }
    
    return(
        <div className='schedule-event'>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" onChange={handleInput} className='spacing' style={{width: '-webkit-fill-available'}} placeholder="Add title" autoFocus />
                <div className="time-schedule basic-spacing">
                    <div className="timer icon">
                        <FiClock size={20} />
                    </div>
                    <div>
                        {week}, &nbsp;
                        {hourWithZero(hour)}:
                        <input type="number" name="fMinute" value={inputs.fMinute} onChange={handleInput} onClick={selectTarget} min="0" max="59" style={{fontSize: 'inherit', width: '25px'}} /> 
                        {hour >= 12 ? 'PM' : 'AM'}
                        &nbsp;&nbsp; - &nbsp;&nbsp; 
                        <input type="number" name="eHour" value={inputs.eHour} onChange={handleInput} onClick={selectTarget} min="0" max="24" style={{fontSize: 'inherit', width: '25px'}} />
                        :
                        <input type="number" name="eMinute" value={inputs.eMinute} onChange={handleInput} onClick={selectTarget} min="0" max="59" style={{fontSize: 'inherit', width: '25px'}} />
                    </div>
                </div>
                <div className="busy-schedule basic-spacing">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className='icon'>
                            <BsFillCalendarDateFill size={20} />
                        </div>
                        <div>
                            <select name="status" onChange={handleInput} style={{fontSize: 'inherit'}}>
                                <option value="busy">Busy</option>
                                <option value="free" selected>Free</option>
                            </select>
                        </div>
                    </div>
                    <div className='controls'>
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}