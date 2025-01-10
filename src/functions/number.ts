const numberRegex = /^-?\d*\.?\d*$/

export function isNumber(s: string): boolean {
    return numberRegex.test(s);
}

export function roundUp(num: number): number {
    if (isNaN(num)) {
        return 0;
    }
    if (num >= 0) {
        return Math.ceil(num * 100) / 100;
    }
    return Math.floor(num * 100) / 100;
}

export function roundDown(num: number): number {
    if (isNaN(num)) {
        return 0;
    }
    if (num >= 0) {
        return Math.floor(num * 100) / 100;
    }
    return Math.ceil(num * 100) / 100;
}