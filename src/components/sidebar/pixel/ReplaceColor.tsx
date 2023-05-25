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

import { useContractWrite, useAccount, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { zeroAddress } from 'viem';
import { testnetChain } from '@/constant/constants';


const cData: ChainData = chainData;

const ReplaceColor = ({ id, coordinates, tier, color, setColor }: { id: number, coordinates: Coordinates, tier: Tier, color: `#${string}`, setColor: React.Dispatch<React.SetStateAction<`#${string}`>> }) => {
  const { address, connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const [pixelAddress, setPixelAddress] = cData[testnetChain]["contractAddresses"][0]
  const [newColor, setNewColor] = useState<`#${string}`>('#ffffff')

  const pixelContract = {
    address: pixelAddress,
    abi: pixelABI,
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    ...pixelContract,
    functionName: 'transform',
    args: [hexToDec("0x" + newColor.slice(1)), BigInt(id)],

  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      setColor(newColor)
    }
  })

  const handleChangeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    write?.()
  }

  return (
    <Card variant="filled">
      <CardBody>
        <PixelPalette write={write} isLoading={isLoading} orgColor={color} color={newColor} handleChangeComplete={(c: ColorResult) => { setNewColor(c.hex as `#${string}`) }}
          onButtonClick={handleChangeColor} />
      </CardBody>
    </Card>


  )
}

export default ReplaceColor;