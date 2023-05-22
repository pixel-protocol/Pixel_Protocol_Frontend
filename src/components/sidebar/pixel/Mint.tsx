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

import chainData from "@/constant/chain.json"

import { Tier, Coordinates, ChainData } from '@/constant/types'
import { pixelIdToBlockId } from '@/helper/conversion';

const cData: ChainData = chainData;

const getFairValuePerPixel = (tier: Tier | null) => {
  if (tier) {
    return cData["fairValueEther"][tier]
  }
  return 0
}

const Mint = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const [blockId, setBlockId] = useState(0)

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  })

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  }, [id])

  return (
    <Card variant="filled">
      <CardBody>
        <VStack spacing="2" align="stretch">
          <Image h="120px" src="/images/chest.svg" alt="buy me!" />
          <Text color="gray.600" fontSize="sm" fontStyle="italic">
            This Pixel belongs to Block #{blockId}, which is available for mint for 1 MATIC
          </Text>

          <Button colorScheme='purple'>
            Go to Block
          </Button>
        </VStack>

      </CardBody>
    </Card >

  )
}

export default Mint;