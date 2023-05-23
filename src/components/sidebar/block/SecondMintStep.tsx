import React from "react"


import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, Box, ModalFooter, Button, Grid, GridItem, Spacer, Image, Flex, Link, Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber, VStack, Badge, SimpleGrid, Spinner, Icon
} from '@chakra-ui/react'
import { Coordinates, Tier } from "@/constant/types"
import BlockCanvas from "@/components/sidebar/block/BlockCanvas"
import { getColorForTier } from "@/helper/misc"
import MaticIcon from "@/components/icons/MaticIcon"
import BlockIcon from "@/components/icons/BlockIcon"
import PixelIcon from "@/components/icons/PixelIcon"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
const SecondMintStep = ({ id, coordinates, tier, fairValuePerPixel, colors }: { id: number, coordinates: Coordinates, tier: Tier, fairValuePerPixel: number, colors: `#${string}`[] }) => {
  return (
    <SimpleGrid p={5} columns={2} spacing={8}>
      <GridItem>
        <BlockCanvas colors={colors} />
      </GridItem>
      <GridItem>
        <VStack spacing="3" align="stretch">
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
          <Grid templateColumns="repeat(9, 1fr)"
            alignItems="center" w="100%">
            <GridItem justifySelf="right" colSpan={4} w="100%">
              <Card border="1px solid" borderColor="purple">
                <CardBody p="3">
                  <Stat>
                    <StatLabel color="purple">You pay</StatLabel>
                    <StatNumber my="1" fontSize={"sm"}><MaticIcon boxSize={8} mr="2" />{fairValuePerPixel * 100} MATIC</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem justifySelf="center" >
              <Icon as={MdOutlineKeyboardDoubleArrowRight} boxSize={30} />
            </GridItem>
            <GridItem justifySelf="left" colSpan={4} w="100%">
              <Card border="1px solid" borderColor="purple">
                <CardBody p="3">
                  <Stat>
                    <StatLabel color="purple">You receive</StatLabel>
                    <StatNumber my="1" fontSize={"sm"}><VStack spacing={1} align="stretch">
                      <Box><BlockIcon borderRadius={"md"} boxSize={8} mr="2" />1 BLOCK</Box><Box><PixelIcon borderRadius={"md"} boxSize={8} mr="2" />100 PIXEL</Box></VStack></StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

        </VStack>
      </GridItem>
    </SimpleGrid>
  )
}

export default SecondMintStep