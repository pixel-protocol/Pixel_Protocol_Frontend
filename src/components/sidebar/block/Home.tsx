import React, { useEffect } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import Mint from "@/components/sidebar/block/Mint";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead } from "wagmi";

import chainData from "@/constant/chain.json"
import blockABI from "@/constant/abis/Block";
import pixelABI from "@/constant/abis/Pixel";


const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress]: [`0x${string}`, `0x${string}`] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]

  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }

  /* Check if Block exists (is minted) */
  const { data: blockExistsData, isError: blockExistsIsError, isLoading: blockExistsIsLoading, refetch: blockExistsRefetch } = useContractRead({

    ...blockContract,
    functionName: 'exists',
    args: [id],
    ...readConfig

  })

  useEffect(() => {
    blockExistsRefetch()
  }, [id])

  useEffect(() => {
    console.log("initialized Home!")
  }, [])
  return (
    <VStack spacing={2} align="stretch">
      <BlockData id={id} coordinates={coordinates} tier={tier} exists={blockExistsData as boolean} />
      {(!blockExistsData) ? <Mint id={id} coordinates={coordinates} tier={tier} /> : null}

    </VStack>
  )
}

export default Home;


