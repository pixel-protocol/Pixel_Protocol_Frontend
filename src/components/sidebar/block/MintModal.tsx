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
import blockABI from "@/constant/abis/Block";
import pixelABI from "@/constant/abis/Pixel";

import { useNetwork, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, zeroAddress } from 'viem'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

import FirstMintStep from '@/components/sidebar/block/FirstMintStep'
import SecondMintStep from '@/components/sidebar/block/SecondMintStep'
import { invertColor, hexToDec } from '@/helper/conversion'
import { testnetChain } from '@/constant/constants'

import { BlockContext } from '@/components/sidebar/block/Sections'


function MintModal({ id, coordinates, tier, isModalOpen, onModalClose }: { id: number, coordinates: Coordinates, tier: Tier, isModalOpen: boolean, onModalClose: () => void }) {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const blockAddress = cData[testnetChain]["contractAddresses"][1]
  const fairValuePerPixel = cData[testnetChain]["fairValueEther"][tier]
  const blockExplorerTx = cData[testnetChain]["blockExplorerTx"]

  const { refetch } = useContext(BlockContext)

  const [colors, setColors] = useState<`#${string}`[]>([...Array(100)].map(_ => "#ffffff"))

  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    ...blockContract,
    functionName: 'mint',
    args: [BigInt(id), colors.map(c => hexToDec("0x" + c.slice(1)))],
    value: parseEther((fairValuePerPixel * 100).toString() as `${number}`),
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
    { title: 'Select Colors', forwardButtonText: 'Proceed' },
    { title: 'Preview & Mint', forwardButtonText: 'Mint' },
    { title: 'View Transaction', }
  ]

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length + 1,
  })

  const handleMint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setActiveStep(2)
    //mint logic
    write?.()

  }

  const onCellClick = (index: number, newColor: `#${string}`) => {
    setColors((prevColors) => {
      const temp = [...prevColors];
      temp[index] = newColor;
      return temp;
    });
  }
  /*
  console.log("Chain: " + chain?.name)
  console.log("Block Address: " + blockAddress)
  console.log("ID: " + id)
  console.log("BigInt ID: " + BigInt(id))
  console.log(colors)
  console.log(colors.map(c => hexToDec("0x" + c.slice(1))))
  */


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
            {(activeStep == 0) && <FirstMintStep colors={colors} setColors={setColors} onCellClick={onCellClick} />}
            {(activeStep == 1) && <SecondMintStep id={id} coordinates={coordinates} tier={tier} fairValuePerPixel={fairValuePerPixel} colors={colors} />
            }
            {(activeStep == 2) && <SimpleGrid><Spinner size='xl' justifySelf="center" /></SimpleGrid>}
            {(activeStep == 3) && <VStack spacing={5} mt={5}><Image justifySelf="center"
              width={250}
              objectFit='scale-down'
              src={(isSuccess) ? '/images/GreenTick.png' : '/images/RedCross.png'}
              alt={(isSuccess) ? 'Transaction Complete' : 'Transaction Failed'}
            />

              {(isSuccess) ? <Text>
                Successfully Minted! Block #{id} {(data?.hash) ? <Link color="blue.500" href={`${blockExplorerTx}${data.hash}`} isExternal>view txn</Link> : null}</Text>
                : (isPrepareError) ? <Text>{prepareError?.message?.substring(0, 240)}...</Text> : <Text>Mint Failed! {error?.message?.substring(0, 240)}... <Link color="blue.500" href={`${blockExplorerTx}${data?.hash}`} isExternal>view txn</Link></Text>}

            </VStack>}
          </ModalBody>
          <ModalFooter>
            {(activeStep === 1) && (<Button colorScheme='purple' onClick={goToPrevious} alignSelf="flex-start"><ArrowBackIcon /> Back</Button>)}
            <Spacer />
            {(activeStep === 3) && (<Button colorScheme='purple' onClick={onModalClose} alignSelf="center">Close</Button>)}
            <Spacer />
            {(activeStep === 0) && (<Button colorScheme='purple' onClick={goToNext} alignSelf="center">Proceed <ArrowForwardIcon /></Button>)}
            {(activeStep === 1) && (<Button colorScheme='purple' disabled={!write || isLoading} onClick={handleMint} alignSelf="center">Mint</Button>)}

          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default MintModal;