type TypeofSizes = 'sm' | 'md' | 'lg' | 'xl';

const getScreenSize = (window: Window): TypeofSizes => {
    const { innerWidth } = window;
    if (innerWidth < 576) return 'sm'
    if (innerWidth < 768) return 'md'
    if (innerWidth < 992) return 'lg'
    return 'xl'
}

const generateId = (type: 'clientId' | 'appId'): string => {
    if (type === 'clientId') {
        return 'client-' + crypto.getRandomValues(new Uint32Array(1))[0];
    } else {
        return 'app-' + crypto.getRandomValues(new Uint32Array(1))[0];
    }
}

export { getScreenSize, generateId }