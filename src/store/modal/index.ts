import { atom, selector, useRecoilState } from "recoil";

interface ModalProps {
    isShowing: boolean;
    title?: string;
    content?: React.ReactNode
}

const modalStore = atom<ModalProps>({
    key: "modalStore",
    default: {
        isShowing: false,
        title: undefined,
        content: undefined
    }
});

export {modalStore};