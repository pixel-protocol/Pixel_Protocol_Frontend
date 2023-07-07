import { CSSProperties, useState, useEffect } from "react";

import {
  Card, CardBody, Box, Grid, GridItem,
  VStack, Image, Badge, Stat, StatLabel,
  StatNumber, Text, Alert, AlertIcon, Link, HStack
} from '@chakra-ui/react'

import { Coordinates, Tier, ChainData } from "@/constant/types";
import { idToCoordBlock, pixelIdToBlockId } from "@/helper/conversion";
import { getColorForTier } from "@/helper/misc";
import chainData from "@/constant/chain.json"
import { useAccount, useNetwork } from "wagmi";

import MaticIcon from "@/components/icons/MaticIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import CopyButton from "@/components/sidebar/CopyButton";
import OwnerIcon from "@/components/sidebar/OwnerIcon";

import { testnetChain } from "@/constant/constants";

const cData: ChainData = chainData;

const PixelData = ({ id, coordinates, tier, exists, owner, color }: { id: number, coordinates: Coordinates, tier: Tier, exists: boolean, owner: `0x${string}`, color: `#${string}` }) => {
  const { chain, chains } = useNetwork()

  const fairValuePerPixel = cData[testnetChain]["fairValueEther"][tier]
  const blockExplorerAcc = cData[testnetChain]["blockExplorerAcc"]
  const { address, connector, isConnected } = useAccount()

  const [blockId, setBlockId] = useState(0)

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  }, [])

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  }, [id])

  const truncateAddress = (address: `0x${string}`) => {
    return address.slice(0, 5) + '...' + address.slice(-4)
  }

  return (<Card variant="filled">
    <CardBody>
      <VStack spacing={3} align="stretch">
        <Grid templateColumns="1fr 3fr" gap={6} alignItems="center">
          <GridItem h="100%">{(exists) ? <Box
            w="80px"
            h="80px"
            borderRadius="lg"
            border="1px solid"
            borderColor="purple.500"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={color}
          /> : <Box
            w="80px"
            h="80px"
            borderRadius="md"
            border="1px solid"
            borderColor="purple.500"
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
              <Text fontSize="lg" fontWeight="bold" color="purple.500">Pixel #{id}<Badge ml={2} variant='solid' bg={getColorForTier(tier)}>

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
        {
          //<Info ownerAddress={ownerAddress} blockId={blockId} price={price} />
        }
        {(exists) ?
          <HStack spacing="3"><HStack spacing="1"><Text>Owner: </Text><Link href={blockExplorerAcc + owner} isExternal>{truncateAddress(owner)}</Link><CopyButton target={owner} /></HStack>
            {(chain?.name === testnetChain && address === owner) && <Badge ml={2} variant='solid' bg='purple.500'><HStack><OwnerIcon /><Text marginInlineStart={"0.2rem"}>You</Text></HStack></Badge>}
          </HStack> : null}
        <Card border="1px solid" borderColor="purple.500">
          <CardBody p="3">
            <Stat>
              <StatLabel color="purple.500">Fair Value</StatLabel>
              <StatNumber my="1" fontSize={"lg"}><MaticIcon boxSize={8} mr="2" />{fairValuePerPixel} MATIC</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Alert status='info'>
          <AlertIcon />
          <Text>This Pixel belongs to <Link color="purple.500" href={`/?x=${idToCoordBlock(blockId)[0]}&y=${idToCoordBlock(blockId)[1]}&mode=Block`}>Block #{blockId}<ExternalLinkIcon /></Link></Text>
        </Alert>


      </VStack>
    </CardBody>
  </Card>)
}

export default PixelData;