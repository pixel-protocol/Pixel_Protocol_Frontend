import chainData from '@/constant/chain.json'
import blockABI from '@/constant/abis/Block.json'
import pixelABI from '@/constant/abis/Pixel.json'
import { ChainData } from '@/constant/types';


import {
  useAccount,
  useNetwork,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useContractRead
} from 'wagmi'




const PixelColor = ({ id }: { id: number }) => {
  const cData: ChainData = chainData;
  const { address, connector, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]

  const { data: existsData, isError: existsError, isLoading: existsLoading } = useContractRead({
    address: pixelAddress,
    abi: pixelABI,
    functionName: 'exists',
    args: [id],
    watch: true,
    staleTime: 5_000
  })


  const { data: colorData, isError: colorError, isLoading: colorLoading } = useContractRead({
    address: pixelAddress,
    abi: pixelABI,
    functionName: 'color',
    args: [id],
    watch: true,
    staleTime: 5_000
  })

  return (
    <>
      <p>{colorData as number}</p>
      <p>{existsData as boolean}</p>
    </>
  )





}