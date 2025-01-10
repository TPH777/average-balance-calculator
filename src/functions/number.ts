const numberRegex = /^-?\d*\.?\d*$/

export function isNumber(s: string): boolean {
    return numberRegex.test(s);
}

export function roundUp(num: number): number {
    return isNaN(num) ? 0 : Math.ceil(num * 100) / 100;
}

export function roundDown(num: number): number {
    return isNaN(num) ? 0 : Math.floor(num * 100) / 100;
}