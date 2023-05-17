import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Mode, Coordinates, ContractAddresses } from "@/constant/types";

import contractAddresses from "@/constant/contractAddresses.json"
import Pixel from '@/components/sidebar/pixel/Pixel'
import Block from '@/components/sidebar/block/Block'
import styled from 'styled-components'

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
bottom: 0;
height: 40vh;
width: 100vw;
background-color: white;

@media only screen and (min-width: 992px) {
    #sidebar {
        top: 0;
        height: 100vh;
        width: 40vw;
    }
}`




const Sidebar = ({ mode, pointerPosition, setPointSelected, setPointerPosition }: SidebarProps) => {
    const caddresses: ContractAddresses = contractAddresses;
    const { address, connector, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const [pixelAddress, blockAddress] = (chain && chain.name in caddresses) ? caddresses[chain.name] : [null, null]

    //for transition when updating
    //const [loading, setLoading] = useStateCallback(true)
    const onSidebarCancel = () => {
        setPointSelected(false);
        setPointerPosition(null);
    }

    //react hooks



    useEffect(() => {
        console.log(`${pointerPosition.x}, ${pointerPosition.y}`)
    }, [mode, pointerPosition])

    return (
        <SideBarContainer >

            <div style={{ padding: '1em' }}>
                <button className="block ml-auto text-5xl leading-3" onClick={onSidebarCancel}>&times;</button>
            </div>

            {(mode === 'Block') ? <Block coordinates={pointerPosition} /> : <Pixel coordinates={pointerPosition} />}


        </SideBarContainer>
    )
}

export default Sidebar