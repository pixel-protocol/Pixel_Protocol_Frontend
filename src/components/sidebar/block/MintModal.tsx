import React, { useEffect, useState } from 'react'

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

import { useNetwork, useContractWrite } from 'wagmi'
import { parseEther } from 'viem'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

import FirstMintStep from '@/components/sidebar/block/FirstMintStep'
import SecondMintStep from '@/components/sidebar/block/SecondMintStep'
import { invertColor, hexToDec } from '@/helper/conversion'


function MintModal({ id, coordinates, tier, isModalOpen, onModalClose }: { id: number, coordinates: Coordinates, tier: Tier, isModalOpen: boolean, onModalClose: () => void }) {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const [pixelAddress, blockAddress]: [`0x${string}`, `0x${string}`] = (chain && chain.name in cData) ? cData[chain.name]["contractAddresses"] : [null, null]

  const fairValuePerPixel = (chain && chain.name in cData) ? cData[chain.name]["fairValueEther"] : cData["polygonMumbai"]["fairValueEther"]
  const [colors, setColors] = useState<`#${string}`[]>(Array.apply(null, Array(100)).map(_ => "#ffffff"))

  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...blockContract,
    functionName: 'mint',
    onSuccess() {
      setActiveStep(3)
    }
  })

  const steps = [
    { title: 'Select Colors', forwardButtonText: 'Proceed' },
    { title: 'Preview & Mint', forwardButtonText: 'Mint' },
    { title: 'View Transaction', }
  ]

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleMint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActiveStep(2)
    //mint logic
    write({
      args: [id, colors.map(c => invertColor(hexToDec(c.slice(1))))],
      value: parseEther((fairValuePerPixel[tier] * 100).toString() as `${number}`)
    })
  }

  const onCellClick = (index: number, newColor: `#${string}`) => {
    setColors((prevColors) => {
      const temp = [...prevColors];
      temp[index] = newColor;
      return temp;
    });
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <Box m={5} mr={10}>
            <Stepper index={activeStep}>
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
            {(activeStep == 1) && <SecondMintStep id={id} coordinates={coordinates} tier={tier} fairValuePerPixel={fairValuePerPixel[tier]} colors={colors} />
            }
            {(activeStep == 2) && <SimpleGrid><Spinner size='xl' justifySelf="center" /></SimpleGrid>}
            {(activeStep == 3) && <VStack spacing={5} mt={5}><Image justifySelf="center"
              width={150}
              objectFit='scale-down'
              src='/images/GreenTick.png'
              alt='transaction complete'
            />
              <Text>Successfully Minted! Block #id <Link color="blue.500">view txn</Link></Text></VStack>}
          </ModalBody>
          <ModalFooter>
            {(activeStep === 1) && (<Button colorScheme='purple' onClick={goToPrevious} alignSelf="flex-start"><ArrowBackIcon /> Back</Button>)}
            <Spacer />
            {(activeStep === 3) && (<Button colorScheme='purple' onClick={onModalClose} alignSelf="center">Close</Button>)}
            <Spacer />
            {(activeStep === 0) && (<Button colorScheme='purple' onClick={goToNext} alignSelf="center">Proceed <ArrowForwardIcon /></Button>)}
            {(activeStep === 1) && (<Button colorScheme='purple' onClick={handleMint} alignSelf="center">Mint</Button>)}

          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default MintModal;