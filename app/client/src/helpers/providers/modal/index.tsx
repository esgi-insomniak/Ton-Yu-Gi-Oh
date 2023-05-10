import React from "react";
import { ModalContextProps } from "@/helpers/types/modal";
import Modal from "@/components/Modal";

export const ModalContext = React.createContext<ModalContextProps>({
    content: null,
    title: "",
    yesNo: false,
    yesNoAction: {
        yes: { action: () => { }, title: "" },
        no: { action: () => { }, title: "" },
    },
    isOpen: false,
    openModal: () => { },
    closeModal: () => { },
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = React.useState<ModalContextProps>({
        content: null,
        title: "",
        yesNo: false,
        yesNoAction: {
            yes: { action: () => { }, title: "" },
            no: { action: () => { }, title: "" },
        },
        isOpen: false,
        size: "md",
        openModal: () => { },
        closeModal: () => { },
    });

    const openModal = React.useCallback(
        (
            content: React.ReactNode,
            title: ModalContextProps["title"] = "",
            yesNo = false,
            yesNoAction: ModalContextProps["yesNoAction"] = {
                yes: { action: () => { }, title: "" },
                no: { action: () => { }, title: "" },
            },
            size: ModalContextProps["size"] = "md"
        ) => setModalState({
            content,
            title,
            yesNo,
            yesNoAction,
            isOpen: true,
            size,
            openModal,
            closeModal,
        }), []);

    const closeModal = React.useCallback(() => {
        setModalState((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    }, []);

    const contextValue = React.useMemo(
        () => ({ ...modalState, openModal, closeModal }),
        [modalState, openModal, closeModal]
    );

    return (
        <ModalContext.Provider value={contextValue}>
            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                yesNo={modalState.yesNo}
                yesNoAction={modalState.yesNoAction}
                content={modalState.content}
                size={modalState.size}
            />
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => React.useContext(ModalContext);
