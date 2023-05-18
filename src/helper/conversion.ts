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

export const coordToTierPixel = (x: number, y: number) => {
    if ((x >= 400 && x < 600) && (y >= 400 && y < 600)) {
        return 2;
    }
    else if ((x >= 200 && x < 800) && (y >= 200 && y < 800)) {
        return 1;
    }
    else {
        return 0;
    }
}

export const coordToIdBlock = (x: number, y: number) => {
    return y * 100 + x;
}

export const idToCoordBlock = (id: number) => {
    const y = Math.floor(id / 100);
    const x = id % 100;
    return [x, y]
}

export const coordToTierBlock = (x: number, y: number) => {
    if ((x >= 40 && x < 60) && (y >= 40 && y < 60)) {
        return 2;
    }
    else if ((x >= 20 && x < 80) && (y >= 20 && y < 80)) {
        return 1;
    }
    else {
        return 0;
    }
}

export const pixelIdToBlockId = (id: number) => {
    const [xPixel, yPixel] = idToCoordPixel(id);
    const [xBlock, yBlock] = pixelCoordToBlockCoord(xPixel, yPixel);
    return coordToIdBlock(xBlock, yBlock)
}

export const pixelCoordToBlockCoord = (x: number, y: number) => {
    const xBlock = Math.floor(x / 10); const yBlock = Math.floor(y / 10);
    return [xBlock, yBlock]

}


export const invertColor = (dec: number) => {
    return 16777216 - dec;
}