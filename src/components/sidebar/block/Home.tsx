import React, { useEffect, useState } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import Mint from "@/components/sidebar/block/Mint";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead } from "wagmi";

import chainData from "@/constant/chain.json"
import blockABI from "@/constant/abis/Block";
import { zeroAddress } from "@/constant/constants";
import { testnetChain } from "@/constant/constants";

const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const blockAddress = cData[testnetChain]["contractAddresses"][1]
  const [blockOwner, setBlockOwner] = useState<`0x${string}`>(zeroAddress)
  const [pixelColors, setPixelColors] = useState<`#${string}`[]>([...Array(100)].map(_ => "#ffffff"))

  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }

  /* Get owner of block */
  const { data: blockOwnerData, isError: blockOwnerIsError, isLoading: blockOWnerIsLoading, refetch: blockOwnerRefetch } = useContractRead({

    ...blockContract,
    functionName: 'ownerOf',
    args: [BigInt(id)],
    ...readConfig,
    onSuccess(data) {
      setBlockOwner(data as `0x${string}`)
    },
    onError(err) {
      setBlockOwner(zeroAddress)
      console.log(err)
    },

  })

  /* get colors of pixels */
  const { data: pixelColorsData, isError: pixelColorsIsError, isLoading: pixelColorsIsLoading, refetch: pixelColorsRefetch } = useContractRead({

    ...blockContract,
    functionName: 'getPixelColors',
    args: [BigInt(id)],
    ...readConfig,
    onSuccess(data) {
      const hexCodes = (data as number[]).map(x => "#" + x.toString(16).padStart(6, '0') as `#${string}`)
      setPixelColors(hexCodes)
      console.log(data)

    },
    onError(err) {
      setPixelColors([...Array(100)].map(_ => "#ffffff"))
      console.log(err)
    },

  })

  useEffect(() => {
    blockOwnerRefetch()
    pixelColorsRefetch()
    console.log("ID Changed!")
  }, [id])

  useEffect(() => {
    blockOwnerRefetch()
    pixelColorsRefetch()
    console.log("initialized Home!")
  }, [])
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


