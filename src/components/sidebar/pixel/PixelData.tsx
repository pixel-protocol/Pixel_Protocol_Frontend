import { CSSProperties, useState, useEffect } from "react";

import {
  Card, CardBody, Box, Grid, GridItem, VStack, Image, Badge, Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text, Alert, AlertIcon, Button, Link
} from '@chakra-ui/react'
import PixelPalette from "@/components/sidebar/pixel/PixelPalette";
import { ColorResult } from "@hello-pangea/color-picker";
import Info from "@/components/sidebar/pixel/Info";
import { Coordinates, Tier, ChainData } from "@/constant/types";
import { coordToIdPixel } from "@/helper/conversion";
import { getColorForTier } from "@/helper/misc";
import chainData from "@/constant/chain.json"
import { useNetwork } from "wagmi";
import MaticIcon from "@/components/icons/MaticIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { pixelIdToBlockId } from "@/helper/conversion";
const PixelData = ({ id, coordinates, tier, exists, owner, color }: { id: number, coordinates: Coordinates, tier: Tier, exists: boolean, owner: `0x${string}`, color: `#${string}` }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress]: [`0x${string}`, `0x${string}`] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]
  const fairValuePerPixel = (chain && chain.name in cData) ? cData[chain.name]["fairValueEther"] : cData["polygonMumbai"]["fairValueEther"]


  const [blockId, setBlockId] = useState(0)

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  })

  useEffect(() => {
    setBlockId(pixelIdToBlockId(id))
  }, [id])

  return (<Card variant="filled">
    <CardBody>
      <VStack spacing={3} align="stretch">
        <Grid templateColumns="1fr 3fr" gap={6} alignItems="center">
          <GridItem h="100%">{(exists) ? <Box
            w="80px"
            h="80px"
            borderRadius="lg"
            border="1px solid"
            borderColor="purple"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={color}
          /> : <Box
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
              <Text fontSize="xl" fontWeight="bold" color="purple">Pixel #{id}<Badge ml={2} variant='solid' bg={getColorForTier(tier)}>

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
          <Text>Owner: {owner}</Text> : null}
        <Card border="1px solid" borderColor="purple">
          <CardBody p="3">
            <Stat>
              <StatLabel color="purple">Fair Value</StatLabel>
              <StatNumber my="1" fontSize={"lg"}><MaticIcon boxSize={8} mr="2" />{fairValuePerPixel[tier]} MATIC</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Alert status='info'>
          <AlertIcon />
          <Text>This Pixel belongs to <Link color="purple">Block #{blockId}<ExternalLinkIcon ml={1} /></Link></Text>
        </Alert>


      </VStack>
    </CardBody>
  </Card>)
}

export default PixelData;