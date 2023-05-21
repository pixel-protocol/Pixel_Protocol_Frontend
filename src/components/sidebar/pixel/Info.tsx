import { Text, Link } from '@chakra-ui/react'
import { Address } from 'wagmi';

const Info = ({ ownerAddress, blockId, price }: { ownerAddress: string | undefined, blockId: number, price: string }) => {
  return (<>
    {ownerAddress ? <>
      <Text>Owner: <Link color="blue.500">{ownerAddress}</Link></Text>
      <Text>Fair Value: {price} MATIC</Text>
      <br />
      <Text color="gray.600" fontSize="sm" fontStyle="italic">
        Pixel belongs to <Link color="blue.500">Block #{blockId}</Link>
      </Text></>
      : <Text color="gray.600" fontSize="sm" fontStyle="italic">
        This Pixel is available for mint at <Link color="blue.500">Block #{blockId}</Link> for {price} MATIC
      </Text>
    }
  </>)
}

export default Info;