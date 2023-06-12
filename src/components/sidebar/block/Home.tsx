import React, { useEffect, useState, useContext } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import Mint from "@/components/sidebar/block/Mint";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead, useContractReads } from "wagmi";

import chainData from "@/constant/chain.json"
import blockABI from "@/constant/abis/Block";
import { zeroAddress } from "@/constant/constants";
import { testnetChain } from "@/constant/constants";

import { BlockContext } from '@/components/sidebar/block/Sections'

const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const blockAddress = cData[testnetChain]["contractAddresses"][1]

  const { blockOwner, pixelColors } = useContext(BlockContext)

  return (
    <VStack spacing={2} align="stretch">
      <BlockData id={id} coordinates={coordinates} tier={tier} exists={blockOwner !== zeroAddress} owner={blockOwner} colors={pixelColors} />
      {(blockOwner === zeroAddress) ?
        <Mint id={id} coordinates={coordinates} tier={tier} isConnected={isConnected} isValidChain={chain?.name === testnetChain} /> :
        null}

    </VStack>
  )
}

export default Home;


