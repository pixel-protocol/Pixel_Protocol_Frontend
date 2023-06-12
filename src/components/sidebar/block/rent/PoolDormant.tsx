import React, { useContext, useState } from 'react'

import { prepareWriteContract, writeContract, waitForTransaction } from 'wagmi/actions'
import { Center, Grid, GridItem, Card, CardBody, VStack, Box, Text, Select, HStack, Button } from '@chakra-ui/react'
import EditPool from '@/components/sidebar/block/rent/EditPool'
import rentPoolABI from '@/constant/abis/RentPool'
import { RentPoolContext } from '@/components/sidebar/block/rent/PoolCreated'
import { useStateCallback } from '@/helper/hooks'

const PoolDormant = ({ id, poolAddress, baseFloorPrice }: { id: number, poolAddress: `0x${string}`, baseFloorPrice: number }) => {

  const [rentDuration, setRentDuration] = useState<number>(0)
  const [isLoading, setIsLoading] = useStateCallback<boolean>(false)
  const { refetch } = useContext(RentPoolContext)


  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }


  const onActivate = async () => {
    try {
      setIsLoading(true)
      const { request } = await prepareWriteContract({
        ...rentPoolContract,
        functionName: 'activate',
        args: [BigInt(rentDuration)]
      })
      const { hash } = await writeContract(request);
      const data = await waitForTransaction({
        hash,
      })
      setIsLoading(false)

      if (data.status === "success") refetch() // Update pool state

    } catch (e) {
      console.log(e)
    }
  }

  const durations = [{ index: 0, days: 30 }, { index: 1, days: 90 }, { index: 2, days: 180 }]

  return (
    <Card variant="filled" my={4}>
      <CardBody>
        <VStack spacing="3" align="stretch">
          <VStack spacing={1} align="stretch">
            <Text color='gray.600' fontWeight='bold'>Select Rent Duration</Text>

            <Grid h="75px" templateColumns='repeat(3, 1fr)' gap={1}>
              {
                (durations).map(d => {
                  return (
                    <GridItem w='100%' h='100%' key={d.index}>


                      <Card cursor={"pointer"} h="100%" borderRadius={0} border="2px solid" borderColor={"purple.500"} backgroundColor={(rentDuration === d.index) ? 'purple.500' : undefined} onClick={() => setRentDuration(d.index)}>
                        <CardBody px="3" py="2">
                          <Center h="100%"><Text color={(rentDuration === d.index) ? 'white' : undefined} fontWeight={"bold"}>{d.days} days</Text></Center>
                        </CardBody>
                      </Card>
                    </GridItem>
                  )
                })
              }

            </Grid>
            <Text color='gray.600'>Floor Price is <Text as="span" fontWeight={"bold"}>{(rentDuration + 1) * baseFloorPrice} MATIC / Pixel</Text></Text>
          </VStack>
          <HStack align="stretch">
            <Button isLoading={isLoading} loadingText="Activating..." colorScheme='purple' width='100%' onClick={onActivate}>Activate</Button>
            <EditPool id={id} />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default PoolDormant