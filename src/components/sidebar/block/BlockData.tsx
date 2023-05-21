import React, { useState, useEffect } from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, VStack, Image
} from '@chakra-ui/react'

import chainData from "@/constant/chain.json"

import MaticIcon from '@/components/icons/MaticIcon'
import { Tier, Coordinates, ChainData } from '@/constant/types'
import { getColorForTier } from '@/helper/misc'
import { coordToTierBlock } from '@/helper/conversion'

import { useNetwork, useContractRead } from 'wagmi'

import blockABI from '@/constant/abis/Block'
import BlockArt from '@/components/sidebar/block/BlockArt'

const BlockData = ({ id, coordinates, tier, exists }: { id: number, coordinates: Coordinates, tier: Tier, exists: boolean }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress]: [`0x${string}`, `0x${string}`] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]
  const fairValuePerPixel = (chain && chain.name in cData) ? cData[chain.name]["fairValueEther"] : cData["polygonMumbai"]["fairValueEther"]


  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }
  if (exists) {
    const { data: blockOwnerData, isError: blockOwnerIsError, isLoading: blockOwnerIsLoading, refetch: blockOwnerRefetch } = useContractRead({

      ...blockContract,
      functionName: 'ownerOf',
      args: [id],
      ...readConfig

    })

    const { data: blockPixelColorsData, isError: blockPixelColorsIsError, isLoading: blockPixelColorsIsLoading, refetch: blockPixelColorsRefetch } = useContractRead({

      ...blockContract,
      functionName: 'getPixelColors',
      args: [id],
      ...readConfig

    })

    const { data: blockPixelOwnerssData, isError: blockPixelOwnersIsError, isLoading: blockPixelOwnersIsLoading, refetch: blockPixelOwnersRefetch } = useContractRead({

      ...blockContract,
      functionName: 'getPixelOwners',
      args: [id],
      ...readConfig

    })
  }



  return (
    <Card variant="filled">

      <CardBody>
        <VStack spacing={2} align="stretch">

          <Grid templateColumns="1fr 3fr" gap={6} alignItems="center" mb={5}>
            <GridItem h="100%">
              {
                // If Block is minted, show underlying pixels. Else, show 'for sale' placefolder
                (!exists) ? <Box
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
                ><BlockArt colors={["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#000000", "#FFFFFF", "#FFA500", "#800080", "#008000", "#800000", "#000080", "#808000", "#800080", "#008080", "#808080", "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#DC143C", "#FF4500", "#FF8C00", "#FF7F50", "#FF6347", "#FFD700", "#FFFF00", "#FFD700", "#FFFF00", "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#90EE90", "#00FA9A", "#00FF7F", "#3CB371", "#2E8B57", "#008000", "#006400", "#9ACD32", "#6B8E23", "#808000", "#556B2F", "#66CDAA", "#8FBC8B", "#20B2AA", "#008B8B", "#008080", "#00FFFF", "#00FFFF", "#00BFFF", "#1E90FF", "#0000FF", "#0000CD", "#00008B", "#000080", "#8A2BE2", "#9370DB", "#7B68EE", "#6A5ACD", "#483D8B", "#4B0082", "#8B008B", "#800080", "#663399", "#9400D3", "#9932CC", "#8A2BE2", "#9370DB", "#BA55D3", "#8B008B", "#FF00FF", "#FF69B4", "#FF1493", "#C71585", "#DB7093", "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#DC143C", "#FF4500", "#FF8C00", "#FF7F50", "#FF6347", "#FFD700", "#FFFF00", "#FFD700", "#FFFF00", "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#90EE90"]
                } /></Box> : <Box
                  w="80px"
                  h="80px"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="purple"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bg="white"
                ><Image
                    objectFit='cover'
                    src='/images/pixelorblockforsale.png'
                    alt='for sale'
                  /></Box>}
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
          {(exists) ?
            <Text>Owner: { }</Text> : null}
          <Card border="1px solid" borderColor="purple">
            <CardBody p="3">
              <Stat>
                <StatLabel color="purple">Fair Value / Mint Price</StatLabel>
                <StatNumber my="1"><MaticIcon boxSize={12} mr="2" />{fairValuePerPixel[tier] * 100} MATIC</StatNumber>
                <StatHelpText mb="0">≈$1.02 ({fairValuePerPixel[tier]} MATIC per Pixel)</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </VStack>


      </CardBody>
    </Card>
  )
}

export default BlockData