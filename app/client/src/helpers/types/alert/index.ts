export type AlertContextType = {
    success: (text: string) => void;
    error: (text: string) => void;
    info: (text: { loading: string, success: string, fail: string }, promise: Promise<any>) => Promise<any>;
};
