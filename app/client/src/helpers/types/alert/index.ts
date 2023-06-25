export type AlertContextType = {
    success: (text: string) => void;
    error: (text: string) => void;
    custom: (text: string, getDismiss?: boolean) => void;
};

export type TextOptionsToastsCustom = {
    loading: string;
    success: string;
    fail: string;
};