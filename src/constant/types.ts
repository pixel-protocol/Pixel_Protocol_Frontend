export type Coordinates = {
    x: number,
    y: number
}

export type NestedChainData = {
    contractAddresses: string[],
    fairValueEther: {
        [key in Tier]: number
    },
    blockExplorerTx: string,
    blockExplorerAcc: string,
    [key: string]: any
}

export type ChainData = {
    [key: string]: NestedChainData | any
}

export type Mode = 'Pixel' | 'Block'

export type Tier = "Bronze" | "Silver" | "Gold"