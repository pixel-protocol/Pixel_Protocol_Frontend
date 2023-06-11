import React, { useState, useEffect } from 'react'

import { useContractReads, useNetwork, useAccount } from 'wagmi'
import { Card, CardBody, VStack, Box, Text, HStack, Button, StatLabel, NumberInput, Stat, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, StatHelpText, StatNumber } from '@chakra-ui/react'
import MaticIcon from '@/components/icons/MaticIcon'
import EditPool from '@/components/sidebar/block/rent/EditPool'
import rentPoolABI from '@/constant/abis/RentPool'
import { formatEther } from 'viem'
import MakeNewBid from '@/components/sidebar/block/rent/MakeNewBid'
import { testnetChain } from '@/constant/constants'

const PoolActive = ({ id, poolAddress }: { id: number, poolAddress: `0x${string}` }) => {
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const [rentDuration, setRentDuration] = useState<number>(0)
  const [floorPrice, setFloorPrice] = useState<number>(0)
  const [bidPrice, setBidPrice] = useState<number>(0)


  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...rentPoolContract,
        functionName: '_duration',
      },
      {
        ...rentPoolContract,
        functionName: '_floorBidPerPixel',
      }
    ],
    onSuccess(data) {
      const [duration, floorPrice] = data
      setRentDuration(duration.result ? duration.result as number : 0)
      setFloorPrice(floorPrice.result ? Number(formatEther(floorPrice.result)) : 0)
    },
    onError(err) {
      setRentDuration(0)
      setFloorPrice(0)
      console.log(err)
    },


  })

  /* get owners of blocks */

  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Card variant="filled" my={4}>
      <CardBody>
        <VStack spacing="3" align="stretch">
          <Box>
            <Text color='gray.600' fontWeight='bold'>Set Bid Price per Pixel</Text>
            <Card border="1px solid" borderColor="purple">
              <CardBody px="3" py="2">
                <Stat>
                  <StatLabel color="purple">Set Bid Price per Pixel</StatLabel>
                  <HStack><MaticIcon boxSize={8} mr="2" />
                    <NumberInput focusBorderColor={"purple.500"} defaultValue={floorPrice} precision={4} step={Number((floorPrice / 10).toPrecision(1))}
                      min={floorPrice} onChange={(valueAsString: string, valueAsNumber: number) => { setBidPrice(valueAsNumber) }}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput><StatNumber my="1" fontSize={"lg"}>
                      MATIC</StatNumber></HStack>
                  <StatHelpText mb="0">Total Bid Price is {Math.floor(bidPrice * 100)} MATIC</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

          </Box>

          <MakeNewBid id={id} bidPrice={bidPrice} isConnected={isConnected} isValidChain={chain?.name === testnetChain} />
        </VStack>
      </CardBody>
    </Card >
  )
}

export default PoolActive