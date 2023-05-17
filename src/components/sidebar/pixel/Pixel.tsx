import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useNotification } from "web3uikit"
import { ethers, BigNumber } from "ethers"
import { Mode, Coordinates, ContractAddresses } from "@/constant/types";

import { CryptoLogos, Information, BannerStrip } from "web3uikit";

import { useStateCallback } from "../../../helper/hooks"

import LoadingSpinner from "@/components/LoadingSpinner"
import styled from 'styled-components'
import contractAddresses from "@/constant/contractAddresses.json"


import {
    useAccount,
    useNetwork,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'




const Pixel = ({ coordinates }: { coordinates: Coordinates }) => {
    const caddresses: ContractAddresses = contractAddresses;
    const { address, connector, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const [pixelAddress, blockAddress] = (chain && chain.name in caddresses) ? caddresses[chain.name] : [null, null]

    //get contract states
    const [mintingFee, setMintingFee] = useStateCallback("0")
    const [owner, setOwner] = useStateCallback("0")
    const [isMinted, setIsMinted] = useStateCallback(false)
    const [color, setColor] = useStateCallback(0)
    const [tokenId, setTokenId] = useStateCallback("0")

    const [isMinting, setIsMinting] = useStateCallback(false)

    //for minting
    const [selectedColorMint, setSelectedColorMint] = useState(0)


    //for transition when updating
    const [loading, setLoading] = useStateCallback(true)

    const [test, setTest] = useStateCallback(0)


    const dispatch = useNotification()






    return (
        <>
        </>
    )
}

export default Pixel