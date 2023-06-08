import { Card, CardBody, VStack, Image, Alert, AlertIcon, Text, Button, Stat, StatHelpText, StatLabel, StatNumber, Link, StatArrow, StatGroup, HStack, Box, Tag, Select } from '@chakra-ui/react'
import { poolStateString } from '@/helper/conversion'
import { zeroAddress } from "viem"
import MaticIcon from '@/components/icons/MaticIcon'
import { truncateAddress } from '@/helper/misc'

export default function PoolInfo({ poolAddress, poolState, baseFloorPrice, bidDuration, bidIncrement, epoch }: {
  poolAddress: `0x${string}`, poolState: number, baseFloorPrice: number, bidIncrement: number,
  bidDuration: number, epoch: number
}) {
  return (
    <Card variant="filled">
      <CardBody>
        <VStack spacing="3" align="left">
          <HStack>
            <Image h="120px" src="/images/rent.svg" alt="rent me!" />
            <VStack align="left">
              <HStack>
                <Text color='gray.600' fontWeight='bold'>Status:</Text>
                <Tag size='md' variant='solid' colorScheme='purple'>{poolStateString[poolState]}</Tag>
              </HStack>
              <HStack>
                <Text color='gray.600' fontWeight='bold'>Epochs:</Text>
                <Text>{epoch}</Text>
              </HStack>
            </VStack>
          </HStack>
          <VStack width='100%' align='left' spacing={3}>
            <HStack>
              <Text color='gray.600' fontWeight='bold'>Pool Contract: </Text>
              <Link title={poolAddress}>{truncateAddress(poolAddress)}</Link>
            </HStack>
            <Card border="1px solid" borderColor="purple">
              <CardBody px="3" py="2">
                <Stat>
                  <StatLabel color="purple">Base Cost Per Pixel</StatLabel>
                  <StatNumber my="1" fontSize={"lg"}><MaticIcon boxSize={8} mr="2" />{baseFloorPrice} MATIC / Pixel</StatNumber>
                </Stat>
              </CardBody>
            </Card>
            <HStack align="stretch">
              <Stat>
                <StatLabel>Bidding Duration</StatLabel>
                <Text>{bidDuration} days</Text>
              </Stat>
              <Stat>
                <StatLabel>Minimum bid increment</StatLabel>
                <Text>{bidIncrement}%</Text>
              </Stat>
            </HStack>
          </VStack>
        </VStack>
      </CardBody></Card>
  )
}