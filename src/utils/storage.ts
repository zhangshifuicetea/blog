/**
 * 读取本地存储
 */
export const getStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
};

/**
 * 本地存储
 */
export const saveStorage = (key: string, value: any) => {
    const data = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, data)
};

/**
 * 删除本地存储
 */
export const removeStorage = (key: string) => {
    localStorage.removeItem(key);
};

export const clearStorage = () => {
    localStorage.clear();
};
