import React from 'react';

import { AlertContextType } from '@/helpers/types/alert';

import toast, { ToastOptions, Toaster } from 'react-hot-toast';

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
            info: (text: { loading: string, success: string, fail: string }, promise: Promise<any>) => toast.promise(promise, {
                loading: text.loading,
                success: <b>{text.success}</b>,
                error: <b>{text.fail}</b>
            }),
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
