import './index.css';
import { FiClock } from 'react-icons/fi';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import React, { useState } from 'react';
import { signalModal } from '../../../../store/modal';
import { event } from '../../../../store/event';
import pulseSVG from '../../../loading/pulse.svg';
import { EventService } from '../../../../service/event';

interface InputProps {
    title: string;
    fHour: string;
    fMinute: string;
    eHour: string;
    eMinute: string;
    status: string;
}
export const hourWithZero = (num: number) => (num <= 9 ? `0${num}` : num);

export default function ScheduleEvent(props: { week: string; hour: number, id?: string, object?: any }) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { hour, week } = props;

    const initialState: InputProps = props.id ? {
        title: props.object?.description ?? '(No title)',
        fHour: hourWithZero(props.object.hour).toString(),
        fMinute: props.object.minute,
        eHour: props.object.endHour!.split(':')[0],
        eMinute:  props.object.endHour!.split(':')[1],
        status: props.object.status
    } : {
        title: '(No title)',
        fHour: hourWithZero(hour).toString(),
        fMinute: '00',
        eHour: hourWithZero(hour + 1).toString(),
        eMinute: '00',
        status: 'free',
    };

    const [inputs, setInputs] = useState<InputProps>(initialState);

    const handleInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        setInputs((state) => ({ ...state, [name]: value }));
    };

    const selectTarget = (e: React.MouseEvent<HTMLInputElement>) => {
        const element = e.target as HTMLInputElement;
        element.select();
    };

    const deleteEvent = async () => {
        if(props.id) {
            await EventService.delete(props.id);
            await EventService.index();
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const { title, fHour, eHour, eMinute, fMinute, status } = inputs;

        const newEvent = {
            description: title,
            busy: status == 'busy',
            start_time: `${fHour}:${fMinute}`,
            end_time: `${eHour}:${eMinute}`,
            week: week.toLowerCase(),
        };

        if(props.id) {
            await EventService.update(props.id, newEvent as any);
        } else {
            await EventService.save(newEvent as any);
        }


        // close modal
        setTimeout(() => (signalModal.value = { isShowing: false }), 200);

        console.log(event.value);
    };

    return (
        <div className="schedule-event">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    defaultValue={props.id ? inputs.title : ''}
                    onChange={handleInput}
                    className="spacing"
                    style={{ width: '-webkit-fill-available' }}
                    placeholder="Add title"
                    autoFocus
                />
                <div className="time-schedule basic-spacing">
                    <div className="timer icon">
                        <FiClock size={20} />
                    </div>
                    <div>
                        {week}, &nbsp;
                        {hourWithZero(hour)}:
                        <input
                            type="number"
                            name="fMinute"
                            value={inputs.fMinute}
                            onChange={handleInput}
                            onClick={selectTarget}
                            min="0"
                            max="59"
                            style={{ fontSize: 'inherit', width: '25px' }}
                        />
                        {hour >= 12 ? 'PM' : 'AM'}
                        &nbsp;&nbsp; - &nbsp;&nbsp;
                        <input
                            type="number"
                            name="eHour"
                            value={inputs.eHour}
                            onChange={handleInput}
                            onClick={selectTarget}
                            min="0"
                            max="24"
                            style={{ fontSize: 'inherit', width: '25px' }}
                        />
                        :
                        <input
                            type="number"
                            name="eMinute"
                            value={inputs.eMinute}
                            onChange={handleInput}
                            onClick={selectTarget}
                            min="0"
                            max="59"
                            style={{ fontSize: 'inherit', width: '25px' }}
                        />
                    </div>
                </div>
                <div className="busy-schedule basic-spacing">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="icon">
                            <BsFillCalendarDateFill size={20} />
                        </div>
                        <div>
                            <select name="status" onChange={handleInput} style={{ fontSize: 'inherit' }}>
                                <option value="busy">Busy</option>
                                <option value="free" selected>
                                    Free
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="controls">
                        {props.id && (
                            <button type='button' onClick={deleteEvent}>Delete</button>
                        )}
                        &nbsp;
                        <button type="submit" style={{ boxSizing: 'border-box' }}>
                            {isLoading ? <img src={pulseSVG} width={'50px'} /> : props.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
