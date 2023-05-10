export type YesNoAction = { title: string, action: () => void };

export interface ModalContextProps {
    content: React.ReactNode;
    title: string;
    yesNo?: boolean;
    yesNoAction?: {
        yes: YesNoAction,
        no: YesNoAction
    };
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isOpen: boolean;
    openModal: (content: React.ReactNode, title: string, yesNo?: boolean, yesNoAction?: { yes: YesNoAction, no: YesNoAction }, size?: 'sm' | 'md' | 'lg' | 'xl') => void;
    closeModal: () => void;
}
