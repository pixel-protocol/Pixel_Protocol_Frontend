import React, { useState, useEffect } from 'react'
import {
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, Button, Image, useDisclosure
} from '@chakra-ui/react'

import chainData from "@/constant/chain.json"

import { Tier, Coordinates, ChainData } from '@/constant/types'
import MintModal from '@/components/sidebar/block/MintModal';

const cData: ChainData = chainData;

const getFairValuePerPixel = (tier: Tier | null) => {
  if (tier) {
    return cData["fairValueEther"][tier]
  }
  return 0
}

const Mint = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  return (<>
    <Card variant="filled">
      <CardBody>
        <VStack spacing="2" align="stretch">
          <Image h="120px" src="/images/chest.svg" alt="buy me!" />
          <Text color="gray.600" fontSize="sm" fontStyle="italic">
            This Block is available for mint for 1 MATIC
          </Text>
          <Card border="1px solid" borderColor="purple">
            <CardBody p="3">
              <Stat>
                <StatLabel color="purple">You will receive:</StatLabel>
                <StatNumber my="1">1 <span style={{ fontSize: "18px" }}>$BLOCK</span> + 100 <span style={{ fontSize: "18px" }}>$PIXEL</span></StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Button loadingText="Minting" colorScheme='purple' onClick={onModalOpen}>
            Mint
          </Button>
        </VStack>

      </CardBody>
    </Card >
    {isModalOpen && (<MintModal isModalOpen={isModalOpen} onModalClose={onModalClose} />)}
  </>
  )
}

export default Mint;