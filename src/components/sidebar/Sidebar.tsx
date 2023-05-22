import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Mode, Coordinates, ChainData } from "@/constant/types";

import chainData from "@/constant/chain.json"
import Pixel from '@/components/sidebar/pixel/Pixel'
import Block from '@/components/sidebar/block/Block'
import styled from 'styled-components'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'

import {
    useAccount,
    useNetwork,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'


interface SidebarProps {
    mode: Mode,
    pointerPosition: Coordinates,
    setPointSelected: Dispatch<SetStateAction<boolean>>,
    setPointerPosition: Dispatch<SetStateAction<Coordinates | null>>
}

const SideBarContainer = styled.div`position: absolute;
left: 0;
top: 0;
height: 100vh;
width: 400px;
background-color: white;

@media (max-width: 992px) {
    top:auto;
    bottom: 0;
    height: 60vh;
    width: 100vw;
}`




const Sidebar = ({ mode, pointerPosition, setPointSelected, setPointerPosition }: SidebarProps) => {
    const cData: ChainData = chainData;
    const { address, connector, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const [pixelAddress, blockAddress] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]

    //for transition when updating
    //const [loading, setLoading] = useStateCallback(true)
    const onSidebarCancel = () => {
        setPointSelected(false);
        setPointerPosition(null);
        console.log('cancel sidebar triggered!')
    }

    //react hooks



    useEffect(() => {
        console.log(`${mode}`)
    }, [mode, pointerPosition])

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                onSidebarCancel()
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    return (
        <SideBarContainer >

            <Box p="2">
                <HamburgerIcon onClick={onSidebarCancel} boxSize={8} />
            </Box>

            {
                //Coordinates={pointerPosition}
                (mode === 'Block') ? <Block coordinates={{ "x": 1, "y": 1 }} /> : <Pixel coordinates={{ "x": 1, "y": 1 }} />}


        </SideBarContainer>
    )
}

export default Sidebar