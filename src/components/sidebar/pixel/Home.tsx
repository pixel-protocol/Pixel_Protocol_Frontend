import React, { useEffect, useState } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import Mint from "@/components/sidebar/block/Mint";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead } from "wagmi";


import chainData from "@/constant/chain.json"
import blockABI from "@/constant/abis/Block";
import pixelABI from "@/constant/abis/Pixel";

import PixelData from "@/components/sidebar/pixel/PixelData";
import ReplaceColor from "@/components/sidebar/pixel/ReplaceColor";

const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress]: [`0x${string}`, `0x${string}`] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]
  const pixelContract = {
    address: pixelAddress,
    abi: pixelABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }

  /* Check if Pixel exists (is minted) */
  const { data: pixelExistsData, isError: pixelExistsIsError, isLoading: pixelExistsIsLoading, refetch: pixelExistsRefetch } = useContractRead({

    ...pixelContract,
    functionName: 'exists',
    args: [id],
    ...readConfig

  })

  useEffect(() => {
    pixelExistsRefetch()
  }, [id])

  useEffect(() => {
    console.log("initialized Home!")
  }, [])
  return (
    <VStack spacing={2} align="stretch">
      <PixelData id={id} coordinates={coordinates} tier={tier} exists={pixelExistsData as boolean} />
      {(pixelExistsData) ? <Mint id={id} coordinates={coordinates} tier={tier} /> : null}
      {(!pixelExistsData) ? <ReplaceColor id={id} coordinates={coordinates} tier={tier} /> : null}

    </VStack>
  )
}

export default Home;


