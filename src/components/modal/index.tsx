import { useRecoilState } from "recoil";
import { modalStore } from "../../store/modal";
import './index.css';
import {RiCloseFill} from 'react-icons/ri';

export default function Modal() {
    const [modal, setModal] = useRecoilState(modalStore);

    const closeModal = () => {
        setModal({isShowing: false, title: undefined, content: undefined});
    }
    
    return(
        <div className="modal-bg" style={{display: modal.isShowing ? 'block': 'none'}}>
            <div className="modal">
                <div className="closeBtn">
                    <button type="button" onClick={closeModal}>
                        <RiCloseFill size={28} />
                    </button>
                </div>
                <h1 className="title">{modal.title}</h1>
                {modal.content}
            </div>
        </div>
    );
}