export const BASE_URL = import.meta.env.VITE_BASE_API_URL as string
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

export const BOOSTER_CODE = ["LOB", "MRD", "BLAR", "PSV", "LON", "LOD", "PGD", "MFC", "DCR", "IOC"]

export const getScreenSize = (window: Window): string => {
    const { innerWidth } = window;
    if (innerWidth < 576) return "sm";
    if (innerWidth < 768) return "md";
    if (innerWidth < 992) return "lg";
    return "xl";
};