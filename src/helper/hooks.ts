import React, { useEffect, useRef, useState } from "react";
import chainData from "@/constant/chain.json"
import { ChainData } from "@/constant/types";
import { testnetChain } from "@/constant/constants";

import { Network, Alchemy } from "alchemy-sdk";



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

    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
        apiKey: process.env.POLYGON_MUMBAI_ALCHEMY_API_KEY_NFT, // Replace with your Alchemy API Key.
        network: Network.MATIC_MUMBAI, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    const refetch = async () => {

        const req = await alchemy.nft.getNftsForOwner(account, {
            contractAddresses: [pixelAddress, blockAddress, stakedPixelAddress, stakedBlockAddress],
            omitMetadata: true,
        })

        let { ownedNfts: rawNftsData } = req

        let pageKey = req.pageKey

        while (pageKey) {
            const req = await alchemy.nft.getNftsForOwner(account, {
                contractAddresses: [pixelAddress, blockAddress, stakedPixelAddress, stakedBlockAddress],
                omitMetadata: true,
                pageKey: pageKey
            })
            const { ownedNfts } = req
            rawNftsData = [...rawNftsData, ...ownedNfts]
            pageKey = req.pageKey
        }

        const ownedNfts = rawNftsData.map((nft) => { return { contract: nft.contract.address, id: Number(nft.tokenId) } })

        const ownedBlocks = ownedNfts.filter((nft) => { return nft.contract === (blockAddress as string).toLowerCase() }).map((nft) => nft.id)

        const ownedPixels = ownedNfts.filter((nft) => { return nft.contract === (pixelAddress as string).toLowerCase() }).map((nft) => nft.id)
        const ownedStakedBlocks = ownedNfts.filter((nft) => { return nft.contract === (stakedBlockAddress as string).toLowerCase() }).map((nft) => nft.id)
        const ownedStakedPixels = ownedNfts.filter((nft) => { return nft.contract === (stakedPixelAddress as string).toLowerCase() }).map((nft) => nft.id)

        setBlocks(ownedBlocks)
        setPixels(ownedPixels)
        setStakedBlocks(ownedStakedBlocks)
        setStakedPixels(ownedStakedPixels)

    }

    useEffect(() => {
        refetch()
        return () => { }
    }, [])
    useEffect(() => {
        refetch()
        return () => { }
    }, [account])

    return { blocks: blocks, pixels: pixels, stakedBlocks: stakedBlocks, stakedPixels: stakedPixels, refetch: refetch }
}