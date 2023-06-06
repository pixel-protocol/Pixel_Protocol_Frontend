import React, { useEffect, useState } from "react"
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

const Pixels = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

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


  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])


  return (
    <>

      {(blockOwner !== zeroAddress) ?
        <PixelsSummary blockId={id} ids={blockIdToPixelIds(id)} colors={pixelColors} owners={pixelOwners} /> : <Mint id={id} coordinates={coordinates} tier={tier} isConnected={isConnected} isValidChain={chain?.name === testnetChain} />}
    </>
  )

}

export default Pixels;