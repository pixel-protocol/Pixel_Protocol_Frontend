import React, { useState, useContext, createContext, useEffect, useMemo } from 'react'
import { Card, CardBody, VStack, Image, Alert, AlertIcon, Text, Button, Box, HStack, Select, Stat, StatLabel, StatNumber, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, StatHelpText, Spacer, Link } from '@chakra-ui/react'
import { Coordinates, Tier, ChainData } from '@/constant/types'
import { testnetChain, zeroAddress } from '@/constant/constants'
import chainData from '@/constant/chain.json'
import { useNetwork, useAccount, useContractReads } from 'wagmi'
import { writeContract, prepareWriteContract, readContract } from 'wagmi/actions'

import { BlockContext } from '@/components/sidebar/block/Sections'
import CreatePool from '@/components/sidebar/block/rent/CreatePool'
import rentPoolABI from '@/constant/abis/RentPool'
import { formatEther, parseEther } from 'viem'
import { poolStateString } from '@/helper/conversion'
import PoolInfo from '@/components/sidebar/block/rent/PoolInfo'
import MaticIcon from '@/components/icons/MaticIcon'
import { truncateAddress } from '@/helper/misc'

import EditPool from '@/components/sidebar/block/rent/EditPool'
import PoolDormant from '@/components/sidebar/block/rent/PoolDormant'
import PoolActive from '@/components/sidebar/block/rent/PoolActive'
import PoolPending from '@/components/sidebar/block/rent/PoolPending'
import PoolOngoing from '@/components/sidebar/block/rent/PoolOngoing'


type RentPoolContextType = {
  poolAddress: `0x${string}`,
  poolState: number,
  baseFloorPrice: number,
  bidIncrement: number,
  bidDuration: number,
  epoch: number,
  refetch: (...args: any[]) => any,
}

type EpochMetadata = {
  epoch: number;
  startDate: number;
  endDate: number;
  costPerPixel: number;
  tenant: string;
  duration: number;
}

export const RentPoolContext = createContext<RentPoolContextType>({
  poolAddress: zeroAddress,
  poolState: 0,
  baseFloorPrice: 0,
  bidIncrement: 0,
  bidDuration: 0,
  epoch: 0,
  refetch: () => { },
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
  const [epochData, setEpochData] = useState<EpochMetadata | null>(null)
  const [bidPrice, setBidPrice] = useState<number | null>(null)

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
        functionName: '_baseFloorBidPerPixel',
      },
      {
        ...rentPoolContract,
        functionName: '_bidDuration',
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
    const fetchEpochData = async () => {
      if (epoch !== 0) {
        try {
          const epochData = await readContract({
            ...rentPoolContract,
            functionName: '_epochs',
            args: [BigInt(epoch)]
          })
          setEpochData(epochData as any)
        } catch (err) {
          console.error(err)
        }
      }
    }
    fetchEpochData()
  }, [epoch])


  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])

  const onPlaceBid = async () => {
    if (bidPrice === null) return

    const parsedBidPrice = parseEther((bidPrice * 100).toString() as `${number}`);
    const { request } = await prepareWriteContract({
      ...rentPoolContract,
      functionName: 'makeBid',
      args: [parsedBidPrice, []]
    })

    await writeContract(request)
  }

  return (
    <RentPoolContext.Provider value={{ poolAddress: poolAddress, poolState: poolState, baseFloorPrice: baseFloorPrice, bidDuration: bidDuration, bidIncrement: bidIncrement, epoch: epoch, refetch: refetch }}>
      <PoolInfo poolAddress={poolAddress} poolState={poolState}
        baseFloorPrice={baseFloorPrice} bidDuration={bidDuration} bidIncrement={bidIncrement} epoch={epoch} />

      {(poolState === 0) && <PoolDormant id={id} poolAddress={poolAddress} baseFloorPrice={baseFloorPrice} /> /*Dormant*/}
      {(poolState === 1) && <PoolActive id={id} poolAddress={poolAddress} /> /*Active*/}
      {(poolState === 2) && <PoolPending id={id} poolAddress={poolAddress} /> /*Pending*/}
      {(poolState === 3) && <PoolOngoing poolAddress={poolAddress} /> /*Ongoing*/}
    </RentPoolContext.Provider>

  )
}

export default PoolCreated
