import React, { useState } from "react"
import PixelsGrid from "@/components/sidebar/block/PixelsGrid"
import PixelStat from "@/components/sidebar/block/PixelStat"
import { Card, CardBody, VStack, Box, Text, Switch, Alert, AlertIcon, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useAccount } from "wagmi"
import { idToCoordPixel, idToCoordBlock } from "@/helper/conversion"

const PixelsSummary = ({ blockId, ids, owners, colors }: { blockId: number, ids: number[], owners: `0x${string}`[], colors: `#${string}`[] }) => {
  const { address, connector, isConnected } = useAccount()

  const [selectedCellPos, setSelectedCellPos] = useState<number>()
  const [showAll, setShowAll] = useState<boolean>(false)

  const handleCellClick = (index: number) => {
    setSelectedCellPos(index)
  }

  const getNumPixelsOwned = () => {
    return owners.filter((owner) => { return owner === address }).length
  }

  return (<Card variant="filled">

    <CardBody>
      <VStack spacing={3} align="stretch">
        <Alert status="info">
          <AlertIcon />
          <Text fontSize={"sm"}>By default, only your pixels are shown</Text>

        </Alert>
        <Box>
          <Box display='flex' alignItems='center'>
            <Text mb='0'>
              Show all pixels?
            </Text>
            <Switch colorScheme="purple" ml={1} onChange={() => { setShowAll(!showAll) }} />
          </Box>

          <PixelsGrid selectedCell={selectedCellPos} showAll={showAll} colors={colors} owners={owners} onCellClick={handleCellClick} />
        </Box>
        <Box>
          <Card border="1px solid" borderColor="purple">
            <CardBody px="3" py="2">
              {(selectedCellPos !== undefined) ?
                <PixelStat id={ids[selectedCellPos]} coordinates={{ x: idToCoordPixel(ids[selectedCellPos])[0], y: idToCoordPixel(ids[selectedCellPos])[1] }} owner={owners[selectedCellPos]} color={colors[selectedCellPos]} /> : <Text>No pixels selected.</Text>}
            </CardBody></Card>
        </Box>
        <Box>
          <Card border="1px solid" borderColor="purple">
            <CardBody px="3" py="2">
              <Text>You have <Text as="span" color="purple" fontWeight={"bold"}>{getNumPixelsOwned()}</Text> Pixel(s) in <Link color="purple" fontWeight={"bold"} href={`/app?x=${idToCoordBlock(blockId)[0]}&y=${idToCoordBlock(blockId)[1]}&mode=Block`}>Block #{blockId}<ExternalLinkIcon /></Link></Text>
            </CardBody></Card>
        </Box>
      </VStack>

    </CardBody></Card>)
}

export default PixelsSummary

