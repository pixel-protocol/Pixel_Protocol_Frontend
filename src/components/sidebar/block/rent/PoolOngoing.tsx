import MaticIcon from "@/components/icons/MaticIcon";
import rentPoolABI from "@/constant/abis/RentPool";
import { truncateAddress } from "@/helper/misc";
import { Card, CardBody, Stat, StatLabel, StatNumber, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { formatEther } from "viem";
import { readContracts, useContractReads } from "wagmi";

const PoolOngoing = ({ poolAddress }: { poolAddress: `0x${string}` }) => {

  const [rentDuration, setRentDuration] = useState<number>(0)
  const [winningBid, setWinningBid] = useState<{ id: number | bigint, bidPrice: number, bidder: `0x${string}` }>({ id: 0, bidPrice: 0, bidder: '0x...' })

  const durations = [{ index: 0, days: 30 }, { index: 1, days: 90 }, { index: 2, days: 180 }]

  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }
  const fetchBidData = async (numBid: BigInt) => {
    try {
      const bidData = await readContracts({
        contracts: [
          {
            ...rentPoolContract,
            functionName: '_bidPerPixel',
            args: [numBid]
          },
          {
            ...rentPoolContract,
            functionName: '_bidToBidder',
            args: [numBid]
          }
        ]
      })
      const [bidPerPixel, bidder] = bidData
      setWinningBid({
        ...winningBid,
        bidPrice: bidPerPixel.result ? Number(formatEther(bidPerPixel.result)) : 0,
        bidder: bidder.result ? bidder.result : '0x...'
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
      }
    ],
    onSuccess(data) {
      const [duration, numBids] = data
      setRentDuration(duration.result ? duration.result as number : 0)
      setWinningBid({ ...winningBid, id: numBids.result ? numBids.result : 0 })

      if (numBids.result) fetchBidData(numBids.result)
    },
    onError(err) {
      setRentDuration(0)
      setWinningBid({ id: 0, bidPrice: 0, bidder: '0x...' })
      console.log(err)
    },
  }
  )

  return (
    <Card variant="filled" my={4}>
      <CardBody>
        <VStack spacing="3" align="stretch">
          <Card border="1px solid" borderColor="purple">
            <CardBody px="3" py="2">
              <Stat>
                <StatLabel color="purple">Last Bid Price Per Pixel</StatLabel>
                <StatNumber my="1" fontSize={"lg"}>
                  <MaticIcon boxSize={8} mr="2" /> {winningBid.bidPrice} MATIC / Pixel</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <HStack>
            <Text color='gray.600' fontWeight='bold'>Winning Bidder: </Text>
            <Link title={winningBid.bidder}>{truncateAddress(winningBid.bidder)}</Link>
          </HStack>
          <HStack>
            <Text color='gray.600' fontWeight='bold'>Rent Duration: </Text>
            <Text>{durations[rentDuration].days} days</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card >)
}

export default PoolOngoing;