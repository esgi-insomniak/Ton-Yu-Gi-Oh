import React from 'react';

import { AlertContextType, TextOptionsToastsCustom } from '@/helpers/types/alert';

import toast, { ToastOptions, Toaster } from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';

const toastConfig: ToastOptions = {
    duration: 4000,
    position: 'top-center'
};

const AlertContext = React.createContext<AlertContextType | null>(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }: { children: React.ReactElement }) => {
    const contextValue = React.useMemo(
        () => ({
            success: (text: string) => toast.success(text, toastConfig),
            error: (text: string) => toast.error(text, toastConfig),
            custom: (text: TextOptionsToastsCustom, promise: Promise<any>) => toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex justify-start items-center space-x-3">
                            <VscLoading className='animate-spin' />
                            <b>{text.loading}</b>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            ), {
                duration: Infinity,
                position: 'top-center',
            })

        }),
        []
    );

    return <AlertContext.Provider value={contextValue}>{children}</AlertContext.Provider>;
};

const AlertInso = () => {
    return <Toaster />;
};

const useAlert = () => React.useContext(AlertContext);

export { AlertProvider, AlertContext, AlertInso, useAlert };
