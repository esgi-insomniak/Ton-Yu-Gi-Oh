export type AlertContextType = {
    success: (text: string) => void;
    error: (text: string) => void;
    custom: (text: { loading: string, success: string, fail: string }, promise: Promise<any>) => void;
};

export type TextOptionsToastsCustom = {
    loading: string;
    success: string;
    fail: string;
};