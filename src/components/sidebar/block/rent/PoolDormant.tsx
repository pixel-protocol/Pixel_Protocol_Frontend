import React, { useState } from 'react'

import { prepareWriteContract, writeContract } from 'wagmi/dist/actions'
import { Card, CardBody, VStack, Box, Text, Select, HStack, Button } from '@chakra-ui/react'
import EditPool from '@/components/sidebar/block/rent/EditPool'
import rentPoolABI from '@/constant/abis/RentPool'

const PoolDormant = ({ id, poolAddress, baseFloorPrice }: { id: number, poolAddress: `0x${string}`, baseFloorPrice: number }) => {

  const [rentDuration, setRentDuration] = useState<number>(0)

  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }


  const onActivate = async () => {
    const { request } = await prepareWriteContract({
      ...rentPoolContract,
      functionName: 'activate',
      args: [BigInt(rentDuration)]
    })
    await writeContract(request);
  }

  return (
    <Card variant="filled" my={4}>
      <CardBody>
        <VStack spacing="3" align="stretch">
          <Box>
            <Text color='gray.600' fontWeight='bold'>Select Rent Duration</Text>
            <Select variant='filled' colorScheme='purple' bg='white' focusBorderColor={"purple.500"} onChange={(e) => setRentDuration(Number(e.target.value))}>
              <option value={0}>30 Days</option>
              <option value={1}>90 Days</option>
              <option value={2}>180 Days</option>
            </Select>
          </Box>
          <HStack align="stretch">
            <Button colorScheme='purple' width='100%' onClick={onActivate}>Activate</Button>
            <EditPool id={id} />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default PoolDormant