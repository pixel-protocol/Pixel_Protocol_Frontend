import React, { useEffect, useState, createContext } from "react"
import BlockData from "@/components/sidebar/block/BlockData";
import Mint from "@/components/sidebar/block/Mint";
import { VStack } from "@chakra-ui/react";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { useAccount, useNetwork, useContractRead, useContractReads } from "wagmi";

import chainData from "@/constant/chain.json"
import blockABI from "@/constant/abis/Block";
import { zeroAddress } from "@/constant/constants";
import { testnetChain } from "@/constant/constants";

export const BlockHomeContext = createContext({})

const Home = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const blockAddress = cData[testnetChain]["contractAddresses"][1]
  const [blockOwner, setBlockOwner] = useState<`0x${string}`>(zeroAddress)
  const [pixelColors, setPixelColors] = useState<`#${string}`[]>([...Array(100)].map(_ => "#ffffff"))
  const [pixelOwners, setPixelOwners] = useState<`0x${string}`[]>([...Array(100)].map(_ => zeroAddress))


  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }


  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...blockContract,
        functionName: 'ownerOf',
        args: [BigInt(id)],
      },
      {
        ...blockContract,
        functionName: 'getPixelColors',
        args: [BigInt(id)],
      },
      {
        ...blockContract,
        functionName: 'getPixelOwners',
        args: [BigInt(id)],
      }
    ],
    onSuccess(data) {
      const [blockOwner, pixelColors, pixelOwners] = data
      setBlockOwner(blockOwner.result ? blockOwner.result as `0x${string}` : zeroAddress)
      setPixelColors(pixelColors.result ? (pixelColors.result as number[]).map(x => "#" + x.toString(16).padStart(6, '0') as `#${string}`) : [...Array(100)].map(_ => "#ffffff"))
      setPixelOwners(pixelOwners.result ? pixelOwners.result as `0x${string}`[] : [...Array(100)].map(_ => zeroAddress))
    },
    onError(err) {
      setBlockOwner(zeroAddress)
      setPixelColors([...Array(100)].map(_ => "#ffffff"))
      setPixelOwners([...Array(100)].map(_ => zeroAddress))
      console.log(err)
    },

  })

  /* get owners of blocks */

  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])
  return (
    <BlockHomeContext.Provider value={{ blockOwner, setBlockOwner, pixelColors, setPixelColors }}>
      <VStack spacing={2} align="stretch">
        <BlockData id={id} coordinates={coordinates} tier={tier} exists={blockOwner !== zeroAddress} owner={blockOwner} colors={pixelColors} />
        {(blockOwner === zeroAddress) ?
          <Mint id={id} coordinates={coordinates} tier={tier} isConnected={isConnected} isValidChain={chain?.name === testnetChain} /> :
          null}

      </VStack>
    </BlockHomeContext.Provider>
  )
}

export default Home;


