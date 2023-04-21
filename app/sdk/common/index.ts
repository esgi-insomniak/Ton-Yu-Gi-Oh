
const generateId = (type: 'client' | 'app'): string => {
    return `${type}-${crypto.randomUUID()}`
}

type TypeofSizes = 'sm' | 'md' | 'lg' | 'xl';

const getScreenSize = (window: Window): TypeofSizes => {
    const { innerWidth } = window;
    if (innerWidth < 576) return 'sm'
    if (innerWidth < 768) return 'md'
    if (innerWidth < 992) return 'lg'
    return 'xl'
}
export { getScreenSize, generateId }
export type { TypeofSizes }