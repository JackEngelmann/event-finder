export function requireNumber(value: any) {
    if (typeof value !== 'number') throw new Error('input must be a number');
    return value
}

export function requireString(value: any) {
    if (typeof value !== 'string') throw new Error('input must be a string');
    return value
}