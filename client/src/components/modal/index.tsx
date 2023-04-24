import './index.css';
import {RiCloseFill} from 'react-icons/ri';
import { signalModal } from "../../store/modal";

export default function Modal() {

    const closeModal = () => {
        signalModal.value = ({isShowing: false, title: undefined, content: undefined});
    }
    
    return(
        <div className="modal-bg" style={{display: signalModal.value.isShowing ? 'block': 'none'}}>
            <div className="modal">
                <div className="closeBtn">
                    <button type="button" onClick={closeModal}>
                        <RiCloseFill size={28} />
                    </button>
                </div>
                <h1 className="title">{signalModal.value.title}</h1>
                <div className="modal-content">
                    {signalModal.value.content}
                </div>
            </div>
        </div>
    );
}