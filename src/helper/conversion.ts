export const hexToDec = (hex: string) => {
    return Number(hex)
}

export const DecToRGB = (dec: number) => {
    const r = Math.floor(dec / (256 * 256));
    const g = Math.floor(dec / 256) % 256;
    const b = dec % 256;
    return [r, g, b]
}

export const coordToIdPixel = (x: number, y: number) => {
    return y * 1000 + x;
}

export const idToCoordPixel = (id: number) => {
    const y = Math.floor(id / 1000);
    const x = id % 1000;
    return [x, y]
}

export const coordToIdBlock = (x: number, y: number) => {
    return y * 100 + x;
}

export const idToCoordBlock = (id: number) => {
    const y = Math.floor(id / 100);
    const x = id % 100;
    return [x, y]
}

export const invertColor = (dec: number) => {
    return 16777216 - dec;
}