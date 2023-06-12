import React, { useState, useEffect, useContext } from 'react'
import { useNFTOwnership } from '@/helper/hooks'
import { useAccount, useNetwork } from 'wagmi'
import { writeContract, prepareWriteContract, readContract } from 'wagmi/actions'

import { testnetChain } from '@/constant/constants'
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, VStack, Box, Text } from '@chakra-ui/react'
import { zeroAddress } from 'viem'

import chainData from "@/constant/chain.json"
import { ChainData } from '@/constant/types'
import { erc721ABI } from 'wagmi'

const fetchApproval = async (contractAddress: `0x${string}`, approver: `0x${string}`, approvee: `0x${string}`) => {
  try {
    const isApproved = await readContract({
      address: contractAddress,
      abi: erc721ABI,
      functionName: "isApprovedForAll",
      args: [approver, approvee]
    })
    return isApproved
  } catch (err) {
    console.error(err)
    return false
  }

}

const StakeUnstakeModal = ({ id, poolAddress, poolState, blocks, pixels, stakedBlocks, stakedPixels, refetch, isOpen, onClose }: { id: number, poolAddress: `0x${string}`, poolState: number, blocks: number[], pixels: number[], stakedBlocks: number[], stakedPixels: number[], refetch: () => Promise<void>, isOpen: boolean, onClose: () => void }) => {
  const cData: ChainData = chainData
  const [pixelAddress, blockAddress, stakedPixelAddress, stakedBlockAddress] = cData[testnetChain]["contractAddresses"].slice(0, 4)
  return (<>
    <Modal isOpen={isOpen} onClose={onClose} size={"md"} >
      <ModalOverlay />
      <ModalContent minH={"60vh"}>
        <VStack spacing={3} align="stretch">
          <Box>
            <Text>You have {blocks.length} Block NFTs</Text>
            (blocks.length)
          </Box>

        </VStack>
      </ModalContent></Modal>
  </>)
}

const StakeUnstake = ({ id, poolAddress, poolState }: { id: number, poolAddress: `0x${string}`, poolState: number }) => {
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()

  const { isOpen, onOpen, onClose } = useDisclosure()


  const { blocks, pixels, stakedBlocks, stakedPixels, refetch } = useNFTOwnership(address ? address : zeroAddress)






  return (
    (isConnected && chain?.name === testnetChain) ? <>
      <Button onClick={() => onOpen()} variant={"outline"} colorScheme='purple'>Stake or Unstake Assets</Button>
      {(isOpen) && <StakeUnstakeModal
        id={id}
        poolAddress={poolAddress}
        poolState={poolState}
        blocks={blocks}
        pixels={pixels}
        stakedBlocks={stakedBlocks}
        stakedPixels={stakedPixels}
        refetch={refetch}
        isOpen={isOpen}
        onClose={onClose}
      />}
    </> : null
  )
}

export default StakeUnstake