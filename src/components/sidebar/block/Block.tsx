import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { ethers, BigNumber } from "ethers"
import { Mode, Coordinates, ChainData } from "@/constant/types";

import blockABI from '@/constant/abis/Block'
import pixelABI from '@/constant/abis/Pixel'
import { useStateCallback } from "../../../helper/hooks"

import LoadingSpinner from "@/components/LoadingSpinner"
import styled from 'styled-components'
import chainData from "@/constant/chain.json"

import Sections from "@/components/sidebar/block/Sections";

import { Box } from '@chakra-ui/react'

import {
  useAccount,
  useNetwork,
  useContractReads,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'




const Block = ({ coordinates }: { coordinates: Coordinates }) => {
  const cData: ChainData = chainData;
  const { address, connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]



  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: blockAddress,
        abi: blockABI,
        functionName: 'exists',
        args: [69],
      },
      {
        address: blockAddress,
        abi: blockABI,
        functionName: 'owner',
        args: [69],
      },
    ],
  })





  return (
    <Box p="2">
      <Sections />
    </Box>
  )
}

export default Block