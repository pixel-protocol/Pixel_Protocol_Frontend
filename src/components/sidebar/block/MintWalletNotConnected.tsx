import React, { useState, useEffect } from 'react'
import {
  Icon,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, Button, Image, useDisclosure, Alert, AlertIcon
} from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import MaticIcon from '@/components/icons/MaticIcon';
import PixelIcon from '@/components/icons/PixelIcon';
import BlockIcon from '@/components/icons/BlockIcon';
import { useNetwork } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import chainData from "@/constant/chain.json"

import { Tier, Coordinates, ChainData } from '@/constant/types'
import MintModal from '@/components/sidebar/block/MintModal';
import { testnetChain } from '@/constant/constants';

const cData: ChainData = chainData;


const MintWalletNotConnected = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const fairValuePerPixel = cData[testnetChain]["fairValueEther"][tier]

  return (<>
    <Card variant="filled">
      <CardBody>
        <VStack spacing="3" align="stretch">
          <Image h="120px" src="/images/chest.svg" alt="buy me!" />

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

          <Alert status="error">
            <AlertIcon />
            <Text>Please Connect Wallet to Mint!</Text>
          </Alert>

          <ConnectButton />

        </VStack>

      </CardBody>
    </Card >
  </>
  )
}

export default MintWalletNotConnected;