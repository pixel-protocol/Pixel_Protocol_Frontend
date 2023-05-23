import React, { useEffect, useState } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead } from "wagmi";
import { zeroAddress } from "@/constant/constants";

import chainData from "@/constant/chain.json"
import pixelABI from "@/constant/abis/Pixel";

import PixelData from "@/components/sidebar/pixel/PixelData";
import ReplaceColor from "@/components/sidebar/pixel/ReplaceColor";

const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { address, connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const [pixelAddress, setPixelAddress] = useState<`0x${string}`>(zeroAddress)
  const [pixelOwner, setPixelOwner] = useState<`0x${string}`>(zeroAddress)
  const [pixelColor, setPixelColor] = useState<`#${string}`>("#ffffff")

  useEffect(() => {
    if (chain && chain.name in cData) {
      setPixelAddress(cData[chain.name]["contractAddresses"][0])
    }
  }, [])

  useEffect(() => {
    if (chain && chain.name in cData) {
      setPixelAddress(cData[chain.name]["contractAddresses"][0])
    } else {
      setPixelAddress(zeroAddress)
    }
  }, [chain])


  const pixelContract = {
    address: pixelAddress,
    abi: pixelABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }

  /* Get owner of pixel */
  const { data: pixelOwnerData, isError: pixelOwnerIsError, isLoading: pixelOWnerIsLoading, refetch: pixelOwnerRefetch } = useContractRead({

    ...pixelContract,
    functionName: 'pixelOwner',
    args: [BigInt(id)],
    ...readConfig,
    onSuccess(data) {
      setPixelOwner(data as `0x${string}`)
    },
    onError(err) {
      setPixelOwner(zeroAddress)
      console.log(err)
    },

  })

  /* Get color of pixel */
  const { data: pixelColorData, isError: pixelColorIsError, isLoading: pixelColorIsLoading, refetch: pixelColorRefetch } = useContractRead({

    ...pixelContract,
    functionName: 'color',
    args: [BigInt(id)],
    ...readConfig,
    onSuccess(data) {
      const hexCode = "#" + (data as number).toString(16).padStart(6, '0') as `#${string}`
      setPixelColor(hexCode)
    },
    onError(err) {
      setPixelColor("#ffffff")
      console.log(err)
    },

  })

  useEffect(() => {
    pixelOwnerRefetch()
    pixelColorRefetch()
  }, [id])

  useEffect(() => {
    pixelOwnerRefetch()
    pixelColorRefetch()
    console.log("initialized Home!")
  }, [])
  return (
    <VStack spacing={2} align="stretch">
      <PixelData id={id} coordinates={coordinates} tier={tier} exists={pixelOwner !== zeroAddress} owner={pixelOwner} color={pixelColor} />
      {(address && pixelOwner === address) ? <ReplaceColor id={id} coordinates={coordinates} tier={tier} color={pixelColor} setColor={setPixelColor} /> : null}

    </VStack>
  )
}

export default Home;


