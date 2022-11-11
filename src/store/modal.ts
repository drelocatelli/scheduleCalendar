import { signal } from "@preact/signals-react";

interface ModalProps {
    isShowing: boolean;
    title?: string;
    content?: React.ReactNode
}

export const signalModal = signal<ModalProps>(
    {
        isShowing: false,
        content: undefined,
        title: undefined
    }
);