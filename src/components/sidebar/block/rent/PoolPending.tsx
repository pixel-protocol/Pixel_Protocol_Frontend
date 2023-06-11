import { useContext, useEffect, useState, useRef } from 'react'

import { prepareWriteContract, writeContract, waitForTransaction } from 'wagmi/actions'
import { useToast, Center, Grid, GridItem, Card, CardBody, VStack, Box, Text, Select, HStack, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stat, StatHelpText, StatLabel, StatNumber, Badge, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import rentPoolABI from '@/constant/abis/RentPool'
import { testnetChain } from '@/constant/constants'

import { formatEther } from 'viem'
import { useContractReads, useNetwork, useAccount, readContracts } from 'wagmi'
import MaticIcon from '@/components/icons/MaticIcon'
import MakeNewBid from '@/components/sidebar/block/rent/MakeNewBid'
import { RentPoolContext } from '@/components/sidebar/block/rent/PoolCreated'

const PoolPending = ({ id, poolAddress }: { id: number, poolAddress: `0x${string}` }) => {
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const [rentDuration, setRentDuration] = useState<number>(0)

  const [currentBid, setCurrentBid] = useState({ id: 0, bidPrice: 0 })
  const [newBidPrice, setNewBidPrice] = useState<number>(0)
  const [isBidder, setIsBidder] = useState<boolean>(false)
  const [minBidPrice, setMinBidPrice] = useState<number>(0)

  const [timeLeft, setTimeLeft] = useState<number>()
  const timeLeftInterval = useRef<Timer>()

  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }

  function numberToCountdown(targetTime) {
    if (targetTime <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor(targetTime / 1000) % 60;
    const minutes = Math.floor(targetTime / (1000 * 60)) % 60;
    const hours = Math.floor(targetTime / (1000 * 60 * 60)) % 24;
    const days = Math.floor(targetTime / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }

  const fetchBidData = async (numBid: BigInt) => {
    try {
      const bidData = await readContracts({
        contracts: [
          {
            ...rentPoolContract,
            functionName: '_bidPerPixel',
            args: [numBid]
          }
        ]
      })
      const [bidPerPixel] = bidData
      setCurrentBid({
        ...currentBid,
        bidPrice: bidPerPixel.result ? Number(formatEther(bidPerPixel.result)) : 0
      })
    } catch (err) {
      console.error(err)
    }
  }

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...rentPoolContract,
        functionName: '_duration',
      },
      {
        ...rentPoolContract,
        functionName: '_numBids',
      },
      {
        ...rentPoolContract,
        functionName: '_biddingEndDate',
      },
      {
        ...rentPoolContract,
        functionName: 'getMinNextBid',
      },
      {
        ...rentPoolContract,
        functionName: 'isBidder',
        args: [address!]
      }
    ],
    onSuccess(data) {
      const [duration, numBids, biddingEndDate, nextBid, isBidder] = data
      setTimeLeft(new Date(Number(biddingEndDate.result) * 1000) - new Date())
      setRentDuration(duration.result ? duration.result as number : 0)
      setCurrentBid({ ...currentBid, id: numBids.result ? numBids.result : 0 })
      setMinBidPrice(nextBid.result ? Number(formatEther(nextBid.result)) : 0)
      setIsBidder(isBidder.result ? isBidder.result : false)
      setNewBidPrice(nextBid.result ? Number(formatEther(nextBid.result)) : 0)

      if (numBids.result) fetchBidData(numBids.result)

      timeLeftInterval.current = setInterval(() => {
        setTimeLeft(lastTime => { if (lastTime - 1000 > 0) { return (lastTime - 1000) } else { return 0 } });
      }, 1000);
    },
    onError(err) {
      setRentDuration(0)
      setCurrentBid({ id: 0, bidPrice: 0 })
      console.log(err)
    },
  }
  )

  useEffect(() => {
    refetch()
    return () => clearInterval(timeLeftInterval.current)
  }, [id])

  useEffect(() => {
    refetch()
    return () => clearInterval(timeLeftInterval.current)
  }, [])

  const countDown = numberToCountdown(timeLeft)

  return (
    <Card variant="filled" my={4}>
      <CardBody>
        <VStack spacing="3" align="stretch">
          {(timeLeft! > 0) ?
            <>
              <HStack spacing={2}>
                <Text color='gray.600' fontWeight='bold'>Days left to bid:</Text>
                <Badge colorScheme='purple'>{countDown.days + ' days ' + countDown.hours + ' hrs ' + countDown.minutes + ' min ' + countDown.seconds + 's'}</Badge>
              </HStack>
              <HStack spacing={0}>
                <Text color='gray.600' fontWeight='bold' mr={2}>Current Bid:</Text>
                <MaticIcon boxSize={5} /><Text pl={1}>{currentBid.bidPrice} MATIC per Pixel</Text>
              </HStack>
              <Box>
                <Text color='gray.600' fontWeight='bold'>Set Bid Price Per Pixel</Text>
                <Card border="1px solid" borderColor="purple">
                  <CardBody px="3" py="2">
                    <Stat>
                      <StatLabel color="purple">Bid Price</StatLabel>
                      <HStack><MaticIcon boxSize={8} mr="2" />
                        <NumberInput focusBorderColor={"purple.500"} defaultValue={minBidPrice} precision={4} step={Number((currentBid.bidPrice / 10).toPrecision(1))}
                          min={minBidPrice} value={newBidPrice.toPrecision(4)} onChange={(e) => { setNewBidPrice(parseFloat(e)) }}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput><StatNumber my="1" fontSize={"lg"}>
                          MATIC / Pixel</StatNumber></HStack>
                      <StatHelpText mb="0">*Min bid {minBidPrice} MATIC per Pixel</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </Box>
              {(!isBidder) ? <MakeNewBid id={id} bidPrice={newBidPrice} isConnected={isConnected} isValidChain={chain?.name === testnetChain} rentDuration={rentDuration} /> :
                <>
                  <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>You have already placed a bid!</AlertTitle>
                  </Alert>
                  <Button colorScheme='purple' width='100%' title='You have already placed a bid!' isDisabled>Place Bid</Button>
                </>}
            </>
            :
            <>
              <HStack spacing={2}>
                <Text color='gray.600' fontWeight='bold'>Days left to bid:</Text>
                <Text color='red'>Bidding Period Over</Text>
              </HStack>
              <Card border="1px solid" borderColor="purple">
                <CardBody px="3" py="2">
                  <Stat>
                    <StatLabel color="purple">Last Bid Price</StatLabel>
                    <StatNumber my="1" fontSize={"lg"}>
                      <MaticIcon boxSize={8} mr="2" /> {currentBid.bidPrice} MATIC / Pixel</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              <Text>You will receive 0.5% of all bids as reward</Text>
              <Initiate poolAddress={poolAddress} />
            </>}
        </VStack>
      </CardBody>
    </Card >
  )
}

const Initiate = ({ poolAddress }: { poolAddress: `0x${string}` }) => {
  const { refetch } = useContext(RentPoolContext)
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }

  const onInitiate = async () => {
    try {
      setIsLoading(true)
      const { request } = await prepareWriteContract({
        ...rentPoolContract,
        functionName: 'initiate',
      })
      const { hash } = await writeContract(request);
      const data = await waitForTransaction({
        hash,
      })
      setIsLoading(false)

      if (data.status === "success") refetch() // Update pool state

    } catch (e) {
      console.log(e)
      const id = 'error-toast'
      if (!toast.isActive(id)) toast({
        id: id,
        title: 'Unable to Initiate Rent Pool',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (<Button colorScheme='purple' width='100%' onClick={onInitiate}>Initiate</Button>)
}

export default PoolPending