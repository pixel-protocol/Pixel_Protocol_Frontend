import React, { useContext, useEffect, useState } from 'react'

import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, Box, ModalFooter, Button, Grid, GridItem, Spacer, Image, Flex, Link, Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber, VStack, Badge, SimpleGrid, Spinner
} from '@chakra-ui/react'

import { getColorForTier } from '@/helper/misc'
import MaticIcon from '@/components/icons/MaticIcon'

import BlockCanvas from '@/components/sidebar/block/BlockCanvas'
import { Coordinates, Tier, ChainData } from '@/constant/types'
import chainData from "@/constant/chain.json"
import rentFactoryABI from '@/constant/abis/RentFactory'
import { useNetwork, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, zeroAddress } from 'viem'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'


import { idToTierBlock, hexToDec } from '@/helper/conversion'
import { testnetChain } from '@/constant/constants'
import FirstRentPoolStep from '@/components/sidebar/block/rent/FirstRentPoolStep'
import SecondRentPoolStep from '@/components/sidebar/block/rent/SecondRentPoolStep'

import { RentPoolContext } from '@/components/sidebar/block/rent/PoolCreated'

function CreatePoolModal({ id, isModalOpen, onModalClose }: { id: number, isModalOpen: boolean, onModalClose: () => void }) {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const rentFactoryAddress = cData[testnetChain]["contractAddresses"][5]
  const fairValuePerPixel = cData[testnetChain]["fairValueEther"][idToTierBlock(id)]
  const blockExplorerTx = cData[testnetChain]["blockExplorerTx"]

  const { refetch } = useContext(RentPoolContext)
  const [baseFloorPrice, setBaseFloorPrice] = useState(fairValuePerPixel)
  const [bidDuration, setBidDuration] = useState(3)
  const [bidIncrement, setBidIncrement] = useState(5)

  const rentFactoryContract = {
    address: rentFactoryAddress,
    abi: rentFactoryABI,
  }
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    ...rentFactoryContract,
    functionName: 'createRentPool',
    args: [BigInt(id), parseEther((baseFloorPrice).toString() as `${number}`), BigInt(bidDuration), BigInt(bidIncrement)],
    onError(error) {
      //alert("Prepare Contract Write Error!")
      if (activeStep !== 3) {
        setActiveStep(3)
      }
    }
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,

    onSuccess(data) {
      //alert("Transaction Successful!")
      if (activeStep !== 3) {
        setActiveStep(3)
      }
      refetch()
    },
    onError(error) {
      //alert("Transaction Unsuccessful!")
      if (activeStep !== 3) {
        setActiveStep(3)
      }
    },
  })

  const steps = [
    { title: 'Set Pool Parameters', forwardButtonText: 'Proceed' },
    { title: 'Confirm Pool Parameters', forwardButtonText: 'Create Pool' },
    { title: 'View Transaction', }
  ]

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length + 1,
  })

  const handleCreatePool = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setActiveStep(2)
    write?.()

  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size={"3xl"} >
        <ModalOverlay />
        <ModalContent minH={"60vh"}>
          <Box m={5} mr={10}>
            <Stepper index={activeStep} colorScheme='purple'>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink='0'>
                    <StepTitle>{step.title}</StepTitle>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
          <Spacer />
          <ModalBody>
            {(activeStep == 0) && <FirstRentPoolStep id={id} mode={"Create"} baseFloorPrice={baseFloorPrice} bidDuration={bidDuration} bidIncrement={bidIncrement} setBaseFloorPrice={setBaseFloorPrice} setBidDuration={setBidDuration} setBidIncrement={setBidIncrement} />}
            {(activeStep == 1) && <SecondRentPoolStep id={id} mode={"Create"} baseFloorPrice={baseFloorPrice} bidDuration={bidDuration} bidIncrement={bidIncrement} />}
            {(activeStep == 2) && <SimpleGrid><Spinner size='xl' justifySelf="center" /></SimpleGrid>}
            {(activeStep == 3) && <VStack spacing={5} mt={5}><Image justifySelf="center"
              width={250}
              objectFit='scale-down'
              src={(isSuccess) ? '/images/GreenTick.png' : '/images/RedCross.png'}
              alt={(isSuccess) ? 'Transaction Complete' : 'Transaction Failed'}
            />

              {(isSuccess) ? <Text>
                Successfully Created Pool for Block #{id}! {(data?.hash) ? <Link color="blue.500" href={`${blockExplorerTx}${data.hash}`} isExternal>view txn</Link> : null}</Text>
                : (isPrepareError) ? <Text>{prepareError?.message?.substring(0, 240)}...</Text> : <Text>Pool Creation Failed! {error?.message?.substring(0, 240)}... <Link color="blue.500" href={`${blockExplorerTx}${data?.hash}`} isExternal>view txn</Link></Text>}

            </VStack>}
          </ModalBody>
          <ModalFooter>
            {(activeStep === 1) && (<Button colorScheme='purple' onClick={goToPrevious} alignSelf="flex-start"><ArrowBackIcon /> Back</Button>)}
            <Spacer />
            {(activeStep === 3) && (<Button colorScheme='purple' onClick={onModalClose} alignSelf="center">Close</Button>)}
            <Spacer />
            {(activeStep === 0) && (<Button colorScheme='purple' onClick={goToNext} alignSelf="center">Proceed <ArrowForwardIcon /></Button>)}
            {(activeStep === 1) && (<Button colorScheme='purple' disabled={!write || isLoading} onClick={handleCreatePool} alignSelf="center">Create Pool</Button>)}

          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default CreatePoolModal;