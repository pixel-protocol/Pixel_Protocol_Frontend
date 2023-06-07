import React, { useState, useContext, createContext, useEffect } from 'react'
import { Card, CardBody, VStack, Image, Alert, AlertIcon, Text, Button } from '@chakra-ui/react'
import { Coordinates, Tier, ChainData } from '@/constant/types'
import { testnetChain, zeroAddress } from '@/constant/constants'
import chainData from '@/constant/chain.json'
import { useNetwork, useAccount, useContractReads } from 'wagmi'

import { BlockContext } from '@/components/sidebar/block/Sections'
import CreatePool from '@/components/sidebar/block/rent/CreatePool'
import rentPoolABI from '@/constant/abis/RentPool'
import { formatEther } from 'viem'

type RentPoolContextType = {
  poolState: number,
  baseFloorPrice: number,
  bidIncrement: number,
  bidDuration: number,
  epoch: number
}

export const RentPoolContext = createContext<RentPoolContextType>({
  poolState: 0,
  baseFloorPrice: 0,
  bidIncrement: 0,
  bidDuration: 0,
  epoch: 0
})

const PoolCreated = ({ id, poolAddress, coordinates, tier }: { id: number, poolAddress: `0x${string}`, coordinates: Coordinates, tier: Tier }) => {

  const { blockOwner } = useContext(BlockContext)
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const [poolState, setPoolState] = useState<number>(0)
  const [baseFloorPrice, setBaseFloorPrice] = useState<number>(0)
  const [bidIncrement, setBidIncrement] = useState<number>(0)
  const [bidDuration, setBidDuration] = useState<number>(0)
  const [epoch, setEpoch] = useState<number>(0)

  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...rentPoolContract,
        functionName: '_poolState',
      },
      {
        ...rentPoolContract,
        functionName: '_initialBaseCostPerPixel',
      },
      {
        ...rentPoolContract,
        functionName: '_cooldownDuration',
      },
      {
        ...rentPoolContract,
        functionName: '_bidIncrement',
      },
      {
        ...rentPoolContract,
        functionName: '_epoch',
      },
    ],
    onSuccess(data) {
      const [poolState, baseFloorPrice, bidDuration, bidIncrement, epoch] = data
      setPoolState(poolState.result ? poolState.result as number : 0)
      setBaseFloorPrice(baseFloorPrice.result ? Number(formatEther(baseFloorPrice.result)) : 0)
      setBidDuration(bidDuration.result ? Number(bidDuration.result) : 0)
      setBidIncrement(bidIncrement.result ? Number(bidIncrement.result) : 0)
      setEpoch(epoch.result ? Number(epoch.result) : 0)

    },
    onError(err) {
      setPoolState(0)
      setBaseFloorPrice(0)
      setBidDuration(0)
      setBidIncrement(0)
      setEpoch(0)
      console.log(err)
    },


  })


  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])
  return (
    <RentPoolContext.Provider value={{ poolState: poolState, baseFloorPrice: baseFloorPrice, bidDuration: bidDuration, bidIncrement: bidIncrement, epoch: epoch }}>
      {
        //To become a separate component: PoolInfo.tsx or sth
      }
      <Card variant="filled">
        <CardBody>
          <VStack spacing="3" align="stretch">
            <Image h="120px" src="/images/rent.svg" alt="rent me!" />
            <Text>{poolAddress}</Text>
            <Text>Pool State: {poolState}</Text>
            <Text>{baseFloorPrice} MATIC per Pixel</Text>
            <Text>{bidDuration} days</Text>
            <Text>{bidIncrement}%</Text>
            <Text>Current Epoch: {epoch}</Text>

          </VStack>

        </CardBody></Card>
    </RentPoolContext.Provider>

  )
}

export default PoolCreated
