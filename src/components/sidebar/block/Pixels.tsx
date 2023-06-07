import React, { useEffect, useState, useContext } from "react"
import PixelsGrid from "@/components/sidebar/block/PixelsGrid"
import { ChainData, Coordinates, Tier } from "@/constant/types";
import chainData from "@/constant/chain.json"
import { useNetwork, useAccount } from "wagmi";
import { testnetChain } from "@/constant/constants";
import { zeroAddress } from "viem";
import blockABI from "@/constant/abis/Block";
import { useContractReads } from "wagmi";
import Mint from "@/components/sidebar/block/Mint";
import { Card, CardBody } from "@chakra-ui/react";
import { blockIdToPixelIds } from "@/helper/conversion";
import PixelsSummary from "@/components/sidebar/block/PixelsSummary";

import { BlockContext } from '@/components/sidebar/block/Sections'

const Pixels = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()


  const blockAddress = cData[testnetChain]["contractAddresses"][1]

  const { blockOwner, pixelColors, pixelOwners } = useContext(BlockContext)

  return (
    <>

      {(blockOwner !== zeroAddress) ?
        <PixelsSummary blockId={id} ids={blockIdToPixelIds(id)} colors={pixelColors} owners={pixelOwners} /> : <Mint id={id} coordinates={coordinates} tier={tier} isConnected={isConnected} isValidChain={chain?.name === testnetChain} />}
    </>
  )

}

export default Pixels;