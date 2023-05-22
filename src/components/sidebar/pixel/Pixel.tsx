import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { ethers, BigNumber } from "ethers"
import { Mode, Coordinates, ChainData, Tier } from "@/constant/types";


import { useStateCallback } from "../../../helper/hooks"

import LoadingSpinner from "@/components/LoadingSpinner"
import styled from 'styled-components'
import chainData from "@/constant/chain.json"
import { coordToIdPixel, coordToTierPixel } from "@/helper/conversion";



import {
    useAccount,
    useNetwork,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'

import Sections from '@/components/sidebar/pixel/Sections'

import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


const Pixel = ({ coordinates }: { coordinates: Coordinates }) => {
    const [id, setId] = useState<number>(0)
    const [tier, setTier] = useState<Tier>("Bronze")
    useEffect(() => {
        setId(coordToIdPixel(coordinates.x, coordinates.y))
        setTier(coordToTierPixel(coordinates.x, coordinates.y))
    }, [])

    useEffect(() => {
        setId(coordToIdPixel(coordinates.x, coordinates.y))
        setTier(coordToTierPixel(coordinates.x, coordinates.y))
    }, [coordinates])
    const cData: ChainData = chainData;
    const { address, connector, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const [pixelAddress, blockAddress] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]
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





    return (
        <Box p="2">
            <Sections id={id} coordinates={coordinates} tier={tier} />
        </Box>
    )
}

export default Pixel