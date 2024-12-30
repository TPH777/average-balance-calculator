const numberRegex = /^-?\d*\.?\d*$/

export function isNumber(s: string): boolean {
    return numberRegex.test(s);
}

export function roundNumber(num: number): number {
    return isNaN(num) ? 0 : Math.round(num * 100) / 100;
}