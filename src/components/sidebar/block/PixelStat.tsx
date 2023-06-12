import { CSSProperties, useState, useEffect } from "react";

import {
  Card, CardBody, Box, Grid, GridItem,
  VStack, Image, Badge, Stat, StatLabel,
  StatNumber, Text, Alert, AlertIcon, HStack, Link
} from '@chakra-ui/react'

import { Coordinates, Tier, ChainData } from "@/constant/types";
import { idToCoordBlock, idToCoordPixel, pixelIdToBlockId } from "@/helper/conversion";
import { getColorForTier } from "@/helper/misc";
import chainData from "@/constant/chain.json"
import { useAccount, useNetwork } from "wagmi";

import MaticIcon from "@/components/icons/MaticIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import CopyButton from "@/components/sidebar/CopyButton";
import OwnerIcon from "@/components/sidebar/OwnerIcon";

import { testnetChain } from "@/constant/constants";
import { truncateAddress } from "@/helper/misc";

const cData: ChainData = chainData;

const PixelStat = ({ id, coordinates, owner, color }: { id: number, coordinates: Coordinates, owner: `0x${string}`, color: `#${string}` }) => {
  const blockExplorerAcc = cData[testnetChain]["blockExplorerAcc"]


  return (
    <VStack spacing={3} align="stretch">
      <Grid templateColumns="1fr 3fr" gap={6} alignItems="center">
        <GridItem h="100%"><Box
          w="80px"
          h="80px"
          borderRadius="lg"
          border="1px solid"
          borderColor="purple.500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={color}
        >
          <Badge cursor={"pointer"} variant="solid" colorScheme='purple' onClick={() => navigator.clipboard.writeText(color)}>
            {color}
          </Badge>
        </Box>

        </GridItem>
        <GridItem>
          <VStack spacing={2} align="stretch">
            <Link fontWeight="bold" color="purple.500" href={`/app?x=${idToCoordPixel(id)[0]}&y=${idToCoordPixel(id)[1]}&mode=Pixel`}>
              <Text fontSize="xl">Pixel #{id}<ExternalLinkIcon ml={1} /></Text>
            </Link>
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

      <HStack spacing="3"><HStack spacing="1"><Text>Owner: </Text><Link href={blockExplorerAcc + owner} isExternal>{truncateAddress(owner)}</Link><CopyButton target={owner} /></HStack>
        <Badge ml={2} variant='solid' bg='purple.500'><HStack><OwnerIcon /><Text marginInlineStart={"0.2rem"}>You</Text></HStack></Badge>
      </HStack>
    </VStack>
  )
}

export default PixelStat;