import React from 'react';

import { AlertContextType, TextOptionsToastsCustom } from '@/helpers/types/alert';

import toast, { ToastOptions, Toaster } from 'react-hot-toast';
import { AlertCustom } from '@/components/AlertCustom';

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
            custom: (text: string, getDismiss?: boolean) => toast.custom((t) => (
                <AlertCustom text={text} t={t} getDismiss={getDismiss} />
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
