import React, { useEffect, useRef, useState } from "react";
import chainData from "@/constant/chain.json"
import { ChainData } from "@/constant/types";
import { testnetChain } from "@/constant/constants";

export const useStateCallback = <T>(initialState: T): [state: T, setState: (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => void] => {
    const [state, setState] = useState<T>(initialState);
    const callbackRef = useRef<(updated: T) => void>();

    const handleSetState = (updatedState: React.SetStateAction<T>, callback?: (updatedState: T) => void) => {
        callbackRef.current = callback;
        setState(updatedState);
    };

    useEffect(() => {
        if (typeof callbackRef.current === "function") {
            callbackRef.current(state);
            callbackRef.current = undefined;
        }
    }, [state]);

    return [state, handleSetState];
}


export const useNFTOwnership = (account: `0x${string}`) => {
    const cData: ChainData = chainData;
    const pixelAddress = cData[testnetChain]["contractAddresses"][0]
    const blockAddress = cData[testnetChain]["contractAddresses"][1]
    const stakedPixelAddress = cData[testnetChain]["contractAddresses"][2]
    const stakedBlockAddress = cData[testnetChain]["contractAddresses"][3]
    const [blocks, setBlocks] = useState<number[]>([])
    const [pixels, setPixels] = useState<number[]>([])
    const [stakedBlocks, setStakedBlocks] = useState<number[]>([])
    const [stakedPixels, setStakedPixels] = useState<number[]>([])


    const fetchData = () => {
        return 0
    }

    useEffect(() => {

    }, [])
    useEffect(() => {

    }, [account])




    return { blocks: blocks, pixels: pixels, stakedBlocks: stakedBlocks, stakedPixels: stakedPixels, fetchData: fetchData }
}