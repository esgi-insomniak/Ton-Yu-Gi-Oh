import React from "react";
import ReactDOM from "react-dom";
import { ModalContextProps } from "@/helpers/types/modal";

interface ModalProps {
    onClose: () => void;
    title?: ModalContextProps["title"];
    yesNo?: ModalContextProps["yesNo"];
    yesNoAction?: ModalContextProps["yesNoAction"];
    size?: ModalContextProps["size"];
    content: ModalContextProps["content"];
    isOpen: ModalContextProps["isOpen"];
}

const Modal: React.FC<ModalProps> = ({ onClose, title, yesNoAction, yesNo, content, isOpen, size }) => {
    const handleYesClick = () => {
        if (yesNoAction && yesNoAction.yes && yesNoAction.yes.action) {
            yesNoAction.yes.action();
        }
        onClose();
    };

    const handleNoClick = () => {
        if (yesNoAction && yesNoAction.no && yesNoAction.no.action) {
            yesNoAction.no.action();
        }
        onClose();
    };

    const getSizeClassName = (size?: ModalContextProps["size"]) => {
        switch (size) {
            case "sm":
                return "max-w-xl min-h-[20rem] ";
            case "md":
                return "max-w-2xl min-h-[25rem]";
            case "lg":
                return "max-w-4xl min-h-[30rem]";
            case "xl":
                return "max-w-7xl min-h-[45rem]";
            default:
                return "max-w-lg";
        }
    };

    return isOpen
        ? ReactDOM.createPortal(
            <div className="fixed z-10 inset-0 overflow-y-auto text-white">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                    </div>
                    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all w-full h-full ${getSizeClassName(size)} flex justify-between flex-col`}>
                        {title && (
                            <div className=" py-4 px-6 text-lg font-semibold">{title}</div>
                        )}
                        <div className={`px-6 py-4 ${size === 'xl' ? 'max-h-max' : ''}`}>{content}</div>
                        {yesNo && (
                            <div className="px-6 py-4 flex justify-end">
                                <button
                                    className="bg-gray-200 px-4 py-2 mr-2 rounded"
                                    onClick={handleNoClick}
                                >
                                    {yesNoAction?.no?.title || "No"}
                                </button>
                                <button
                                    className="bg-blue-500 px-4 py-2 text-white rounded"
                                    onClick={handleYesClick}
                                >
                                    {yesNoAction?.yes?.title || "Yes"}
                                </button>
                            </div>
                        )}
                        {!yesNo && (
                            <div className="px-6 py-4 flex justify-end">
                                <button
                                    className="t-btn"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;
};

export default Modal;
