const API_URL = "http://localhost:3000";

const generateId = (type: "client" | "app"): string => {
  return `${type}-${crypto.randomUUID()}`;
};

type TypeofSizes = "sm" | "md" | "lg" | "xl";

const getScreenSize = (window: Window): TypeofSizes => {
  const { innerWidth } = window;
  if (innerWidth < 576) return "sm";
  if (innerWidth < 768) return "md";
  if (innerWidth < 992) return "lg";
  return "xl";
};

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

interface apiRequestProps {
  beacon?: boolean;
  url: string;
  payload: any;
  headers?: HeadersInit;
  method?: "POST" | "GET" | "PUT" | "DELETE";
}

const apiRequest = ({
  beacon,
  url,
  payload,
  headers,
  method,
}: apiRequestProps) => {
  const apiUrl = `${API_URL}${url}`;

  if (navigator.sendBeacon && beacon) {
    const params = new URLSearchParams();
    params.append('payload', JSON.stringify(payload));
    navigator.sendBeacon(apiUrl, params)
  } else {
    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.log(err)
    });
  }
};

export { getScreenSize, generateId, throttle, apiRequest };
export type { TypeofSizes };
