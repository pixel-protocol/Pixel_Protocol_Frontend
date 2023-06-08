import React, { useState, useContext, createContext, useEffect } from 'react'
import { Card, CardBody, VStack, Image, Alert, AlertIcon, Text, Button, Box, HStack, Select, Stat, StatLabel, StatNumber, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, StatHelpText, Spacer, Link } from '@chakra-ui/react'
import { Coordinates, Tier, ChainData } from '@/constant/types'
import { testnetChain, zeroAddress } from '@/constant/constants'
import chainData from '@/constant/chain.json'
import { useNetwork, useAccount, useContractReads } from 'wagmi'

import { BlockContext } from '@/components/sidebar/block/Sections'
import CreatePool from '@/components/sidebar/block/rent/CreatePool'
import rentPoolABI from '@/constant/abis/RentPool'
import { formatEther } from 'viem'
import { poolStateString } from '@/helper/conversion'
import PoolInfo from '@/components/sidebar/block/rent/PoolInfo'
import MaticIcon from '@/components/icons/MaticIcon'
import { truncateAddress } from '@/helper/misc'

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
  // label: "Base Floor Price per Pixel (MATIC)",
  //   value: baseFloorPriceInput,
  //   precision: 4,
  //   min: fairValuePerPixel,
  //   max: fairValuePerPixel * 1e4,
  //   step: Number((fairValuePerPixel / 10).toPrecision(1)),

  let content = <></>;
  if (poolState === 0) {
    (content = <><Box>
      <Text color='gray.600' fontWeight='bold'>Select Pool Duration</Text>
      <Select variant='filled' colorScheme='purple' bg='white' focusBorderColor={"purple.500"}
      >{/* value = {} onChange={}*/}
        <option value={30}>30 Days</option>
        <option value={90}>90 Days</option>
        <option value={180}>180 Days</option>
      </Select>
    </Box>
      <HStack align="stretch">
        <Button colorScheme='purple' width='100%' onClick={() => { }}>Activate</Button>
        <Button colorScheme='purple' width='100%' onClick={() => { }}>Edit Pool</Button>
      </HStack></>)
  } else if (poolState === 1) {
    content = <>
      <Box>
        <Text color='gray.600' fontWeight='bold'>Set Bid Price Per Pixel</Text>
        <Card border="1px solid" borderColor="purple">
          <CardBody px="3" py="2">
            <Stat>
              <StatLabel color="purple">Bid Price Per Pixel</StatLabel>
              <HStack><MaticIcon boxSize={8} mr="2" />
                <NumberInput focusBorderColor={"purple.500"} defaultValue={baseFloorPrice} precision={4} step={Number((baseFloorPrice / 10).toPrecision(1))}
                  max={baseFloorPrice * 1e4} min={baseFloorPrice} onChange={() => { }}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput><StatNumber my="1" fontSize={"lg"}>
                  MATIC / Pixel</StatNumber></HStack>
              <StatHelpText mb="0">*Min bid {baseFloorPrice} MATIC per Pixel</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

      </Box>
      <Button colorScheme='purple' width='100%'>Activate</Button>
    </>
  } else if (poolState === 2/* && within bid duration */) {
    content = <>
      <HStack spacing={2}>
        <Text color='gray.600' fontWeight='bold'>Days left to bid:</Text>
        <Text >5 days left</Text>
      </HStack>
      <HStack spacing={0}>
        <Text color='gray.600' fontWeight='bold' mr={2}>Current Bid:</Text>
        <MaticIcon boxSize={5} /><Text pl={1}>{baseFloorPrice} MATIC per Pixel</Text>
      </HStack>
      <Box>
        <Text color='gray.600' fontWeight='bold'>Set Bid Price Per Pixel</Text>
        <Card border="1px solid" borderColor="purple">
          <CardBody px="3" py="2">
            <Stat>
              <StatLabel color="purple">Bid Price Per Pixel</StatLabel>
              <HStack><MaticIcon boxSize={8} mr="2" />
                <NumberInput focusBorderColor={"purple.500"} defaultValue={baseFloorPrice} precision={4} step={Number((baseFloorPrice / 10).toPrecision(1))}
                  max={baseFloorPrice * 1e4} min={baseFloorPrice} onChange={() => { }}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput><StatNumber my="1" fontSize={"lg"}>
                  MATIC / Pixel</StatNumber></HStack>
              <StatHelpText mb="0">*Min bid {baseFloorPrice} MATIC per Pixel</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Box>
      <Button colorScheme='purple' width='100%' onClick={() => { }}>Place Bid</Button>
    </>
  } else if (poolState === 2 /* && no time left to bid */) {
    content = <>
      <HStack spacing={2}>
        <Text color='gray.600' fontWeight='bold'>Days left to bid:</Text>
        <Text color='red'>Bidding Period Over</Text>
      </HStack>
      <Card border="1px solid" borderColor="purple">
        <CardBody px="3" py="2">
          <Stat>
            <StatLabel color="purple">Last Bid Price Per Pixel</StatLabel>
            <StatNumber my="1" fontSize={"lg"}>
              <MaticIcon boxSize={8} mr="2" /> {baseFloorPrice} MATIC / Pixel</StatNumber>
          </Stat>
        </CardBody>
      </Card>
      <Text>You will receive 0.5% of all bids as reward</Text>
      <Button colorScheme='purple' width='100%'>Initiate</Button>
    </>
  } else if (poolState === 3) {
    content = <>
      <Card border="1px solid" borderColor="purple">
        <CardBody px="3" py="2">
          <Stat>
            <StatLabel color="purple">Last Bid Price Per Pixel</StatLabel>
            <StatNumber my="1" fontSize={"lg"}>
              <MaticIcon boxSize={8} mr="2" /> {baseFloorPrice} MATIC / Pixel</StatNumber>
          </Stat>
        </CardBody>
      </Card>
      <HStack>
        <Text color='gray.600' fontWeight='bold'>Bidder: </Text>
        <Link title={poolAddress}>{truncateAddress(poolAddress)}</Link>
      </HStack>
    </>
  }


  return (
    <RentPoolContext.Provider value={{ poolState: poolState, baseFloorPrice: baseFloorPrice, bidDuration: bidDuration, bidIncrement: bidIncrement, epoch: epoch }}>
      {
        //To become a separate component: PoolInfo.tsx or sth
      }
      <PoolInfo poolAddress={poolAddress} poolState={poolState}
        baseFloorPrice={baseFloorPrice} bidDuration={bidDuration} bidIncrement={bidIncrement} epoch={epoch} />

      <Card variant="filled" my={4}>
        <CardBody>
          <VStack spacing="3" align="left" width='100%'>
            {content}
          </VStack>
        </CardBody>
      </Card>
    </RentPoolContext.Provider>

  )
}

export default PoolCreated
