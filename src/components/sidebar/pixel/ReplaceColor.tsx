import React, { useState, useEffect } from 'react'
import {
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, Button, Image
} from '@chakra-ui/react'

import { ColorResult } from "@hello-pangea/color-picker";
import { hexToDec, invertColor } from '@/helper/conversion';

import chainData from "@/constant/chain.json"
import pixelABI from "@/constant/abis/Pixel";

import PixelPalette from '@/components/sidebar/pixel/PixelPalette'

import { Tier, Coordinates, ChainData } from '@/constant/types'

import { useContractWrite, useAccount, useNetwork } from 'wagmi'
import { zeroAddress } from 'viem';



const cData: ChainData = chainData;

const ReplaceColor = ({ id, coordinates, tier, color, setColor }: { id: number, coordinates: Coordinates, tier: Tier, color: `#${string}`, setColor: React.Dispatch<React.SetStateAction<`#${string}`>> }) => {
  const cData: ChainData = chainData;
  const { address, connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const [pixelAddress, setPixelAddress] = useState<`0x${string}`>(zeroAddress)
  const [newColor, setNewColor] = useState<`#${string}`>('#ffffff')

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

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...pixelContract,
    functionName: 'transform',
    args: [hexToDec("0x" + newColor.slice(1)), BigInt(id)],
    onSuccess() {
      setColor(newColor)
    },
    onError(e) {
      console.log(e.message)
    }
  })


  const handleChangeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    write()
  }

  return (
    <Card variant="filled">
      <CardBody>
        <PixelPalette isLoading={isLoading} orgColor={color} color={newColor} handleChangeComplete={(c: ColorResult) => { setNewColor(c.hex as `#${string}`) }}
          onButtonClick={handleChangeColor} />
      </CardBody>
    </Card>


  )
}

export default ReplaceColor;