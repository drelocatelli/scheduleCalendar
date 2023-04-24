import { signalModal } from "../../../store/modal";
import MinuteEl from "../minute";
import ScheduleEvent from "../modal/scheduleEvent";

function HourEl({week}: {week: string}) {
    
    // const [modal, setModal] = useRecoilState(modalStore);

    const toggleModal = (props: {week: string, hour: number}) => {
        const {hour, week} = props;

        signalModal.value = ({isShowing: true, title: 'Schedule event', content: <ScheduleEvent hour={hour} week={week} />});

    }
    
    return (
        <div className="hours" >
            {[...Array(24)].map((_, i) =>
                i >= 5 ? (
                    <div className="hour" data-week={week.toLowerCase()} data-hour={i+1} key={i} onClick={() => toggleModal({hour: i+1, week})}>
                        <div className="hour-title" title={`${i+1} ${i + 1 >= 12 ? 'PM' : 'AM'}, ${week}`}>
                            {i + 1}
                            <span className="hour-period">{i + 1 >= 12 ? 'PM' : 'AM'}</span>
                        </div>
                        <MinuteEl />
                    </div>
                ) : null,
            )}
        </div>
    );
}

export default HourEl;