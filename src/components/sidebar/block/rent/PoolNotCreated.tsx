import React, { useState, useContext } from 'react'
import { Card, CardBody, VStack, Image, Alert, AlertIcon, Text, Button } from '@chakra-ui/react'
import { Coordinates, Tier, ChainData } from '@/constant/types'
import { testnetChain, zeroAddress } from '@/constant/constants'
import chainData from '@/constant/chain.json'
import { useNetwork, useAccount } from 'wagmi'

import { BlockContext } from '@/components/sidebar/block/Sections'
import CreatePool from '@/components/sidebar/block/rent/CreatePool'


const PoolNotCreated = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const { blockOwner } = useContext(BlockContext)
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  return (
    <Card variant="filled">
      <CardBody>
        <VStack spacing="3" align="stretch">
          <Image h="120px" src="/images/rent.svg" alt="rent me!" />
          <Alert status='warning'>
            <AlertIcon />
            <Text>
              Rent Pool not created
            </Text>
          </Alert>
          {(blockOwner === address) && <CreatePool id={id} />}
        </VStack>

      </CardBody></Card>
  )
}

export default PoolNotCreated