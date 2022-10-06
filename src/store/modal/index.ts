import { atom, selector } from "recoil";

interface ModalProps {
    isShowing: boolean;
    content?: React.ReactNode
}

const modalStore = atom({
    key: "modalStore",
    default: {
        isShowing: false,
        content: null
    } as ModalProps,
});

const toggleModal = selector({
    key: 'toggleModal',
    get: ({get}) => get(modalStore),
});

export {modalStore, toggleModal};