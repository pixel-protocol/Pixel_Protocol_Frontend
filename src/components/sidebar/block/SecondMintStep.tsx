import React from "react"


import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, Box, ModalFooter, Button, Grid, GridItem, Spacer, Image, Flex, Link, Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber, VStack, Badge, SimpleGrid, Spinner
} from '@chakra-ui/react'
import { Coordinates, Tier } from "@/constant/types"
import BlockCanvas from "@/components/sidebar/block/BlockCanvas"
import { getColorForTier } from "@/helper/misc"
import MaticIcon from "@/components/icons/MaticIcon"
const SecondMintStep = ({ id, coordinates, tier, fairValuePerPixel, colors }: { id: number, coordinates: Coordinates, tier: Tier, fairValuePerPixel: number, colors: `#${string}`[] }) => {
  return (
    <SimpleGrid p={5} columns={2} spacing={8}>
      <GridItem>
        <BlockCanvas colors={colors} />
      </GridItem>
      <GridItem>
        <VStack spacing="2" align="stretch">
          <Text fontSize="xl" fontWeight="bold" color="purple">Block #{id} <Badge ml={2} variant='solid' bg={getColorForTier(tier)}>
            {tier}
          </Badge></Text>
          <Grid
            templateColumns='1fr 5fr 1fr 5fr'
            gap={3}
            maxW={["100%", "100%", "50%"]}
          >
            <GridItem><Text>X:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>{coordinates.x}</Box></GridItem>
            <GridItem><Text>Y:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>{coordinates.y}</Box></GridItem>
          </Grid>
          <Card border="1px solid" borderColor="purple">
            <CardBody p="3">
              <Stat>
                <StatLabel color="purple">You will receive:</StatLabel>
                <StatNumber my="1">1 <span style={{ fontSize: "18px" }}>$BLOCK</span> + 100 <span style={{ fontSize: "18px" }}>$PIXEL</span></StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card border="1px solid" borderColor="purple">
            <CardBody p="3">
              <Stat>
                <StatLabel color="purple">Fair Value / Mint Price</StatLabel>
                <StatNumber my="1"><MaticIcon boxSize={12} mr="2" />{fairValuePerPixel * 100} MATIC</StatNumber>
                <StatHelpText mb="0">≈$1.02 ({fairValuePerPixel} MATIC per Pixel)</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </VStack>
      </GridItem>
    </SimpleGrid>
  )
}

export default SecondMintStep