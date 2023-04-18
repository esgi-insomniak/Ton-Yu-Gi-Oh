const getScreenSize = (window: Window): string => {
    if (window.innerWidth < 768) {
        return 'sm';
    } else if (window.innerWidth < 992) {
        return 'md';
    } else if (window.innerWidth < 1200) {
        return 'lg';
    } else {
        return 'xl';
    }
}

const generateId = (type: 'clientId' | 'appId'): string => {
    if (type === 'clientId') {
        return 'client-' + crypto.getRandomValues(new Uint32Array(1))[0];
    } else {
        return 'app-' + crypto.getRandomValues(new Uint32Array(1))[0];
    }
}

export { getScreenSize, generateId }