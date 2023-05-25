import React, { useState, useEffect } from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, VStack, Image, Spacer, HStack
} from '@chakra-ui/react'

import chainData from "@/constant/chain.json"

import MaticIcon from '@/components/icons/MaticIcon'
import { Tier, Coordinates, ChainData } from '@/constant/types'
import { getColorForTier } from '@/helper/misc'
import { coordToTierBlock } from '@/helper/conversion'

import { useNetwork, useContractRead, useAccount } from 'wagmi'

import blockABI from '@/constant/abis/Block.json'
import BlockArt from '@/components/sidebar/block/BlockArt'
import CopyButton from '@/components/sidebar/CopyButton'
import OwnerIcon from '@/components/sidebar/OwnerIcon'

const BlockData = ({ id, coordinates, tier, exists, owner, colors }: { id: number, coordinates: Coordinates, tier: Tier, exists: boolean, owner: `0x${string}`, colors: `#${string}`[] }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [fairValuePerPixel, setFairValuePerPixel] = useState<number>(0)
  const { address, connector, isConnected } = useAccount()

  useEffect(() => {
    if (chain && chain.name in cData) {
      setFairValuePerPixel(cData[chain.name]["fairValueEther"][tier])
    }
  }, [])

  useEffect(() => {
    if (chain && chain.name in cData) {
      setFairValuePerPixel(cData[chain.name]["fairValueEther"][tier])
    } else {
      setFairValuePerPixel(0)
    }
  }, [chain, tier])

  const truncateAddress = (address: `0x${string}`) => {
    return address.slice(0, 5) + '...' + address.slice(-4)
  }

  return (
    <Card variant="filled">

      <CardBody>
        <VStack spacing={3} align="stretch">

          <Grid templateColumns="1fr 3fr" gap={6} alignItems="center">
            <GridItem h="100%">

              <Box
                w="80px"
                h="80px"
                borderRadius="md"
                border="1px solid"
                borderColor="purple"
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                bg="white"
              >{
                  // If Block is minted, show underlying pixels. Else, show 'for sale' placefolder

                  (exists) ? <BlockArt colors={colors} /> : <Image
                    objectFit='cover'
                    src='/images/pixelorblockforsale.png'
                    alt='for sale'
                  />}</Box>
            </GridItem>
            <GridItem>
              <VStack spacing={2} align="stretch">
                <Text fontSize="xl" fontWeight="bold" color="purple">Block #{id}<Badge ml={2} variant='solid' bg={getColorForTier(tier)}>

                  {tier}
                </Badge></Text>
                <Grid
                  templateColumns='1fr 5fr 1fr 5fr'
                  gap={3}
                  maxW={["100%", "80%"]}
                >
                  <GridItem><Text>X:</Text></GridItem>
                  <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>{coordinates.x}</Box></GridItem>
                  <GridItem><Text>Y:</Text></GridItem>
                  <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>{coordinates.y}</Box></GridItem>
                </Grid>
              </VStack>
            </GridItem>
          </Grid>
          {exists ?
            <HStack spacing="0.2rem"><Text>Owner: {truncateAddress(owner)}</Text> <CopyButton target={owner} />
              {(address === owner) && <Badge ml={2} variant='solid' bg='purple'><HStack><OwnerIcon /><Text>You</Text></HStack></Badge>}
            </HStack> : null}
          <Card border="1px solid" borderColor="purple">
            <CardBody px="3" py="2">
              <Stat>
                <StatLabel color="purple">Fair Value / Mint Price</StatLabel>
                <StatNumber my="1" fontSize={"lg"}><MaticIcon boxSize={8} mr="2" />{fairValuePerPixel * 100} MATIC</StatNumber>
                <StatHelpText mb="0">{fairValuePerPixel} MATIC per Pixel</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </VStack>


      </CardBody>
    </Card>
  )
}

export default BlockData