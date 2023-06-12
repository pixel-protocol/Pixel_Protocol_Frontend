import React, { useEffect, useState, useContext } from 'react'

import {
  Center, Alert, AlertIcon,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, Box, ModalFooter, Button, Grid, GridItem, Spacer, Image, Flex, Link, Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber, VStack, Badge, SimpleGrid, Spinner
} from '@chakra-ui/react'

import { getColorForTier } from '@/helper/misc'
import MaticIcon from '@/components/icons/MaticIcon'

import BlockCanvas from '@/components/sidebar/block/BlockCanvas'
import { Coordinates, Tier, ChainData, RentPoolParameters } from '@/constant/types'
import chainData from "@/constant/chain.json"
import rentFactoryABI from '@/constant/abis/RentFactory'
import { useNetwork, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, zeroAddress } from 'viem'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

import { idToTierBlock, hexToDec } from '@/helper/conversion'
import { testnetChain } from '@/constant/constants'
import rentPoolABI from '@/constant/abis/RentPool'

import { ColorResult } from "@hello-pangea/color-picker";
import { CompactPicker } from "@hello-pangea/color-picker";
import { colorChoices } from "@/constant/constants";

import { RentPoolContext } from '@/components/sidebar/block/rent/PoolCreated'

const SecondMakeBidStep = ({ id, colors, bidPrice, rentDuration }: { id: number, colors: `#${string}`[], bidPrice: number, rentDuration: number }) => {
  return (
    <SimpleGrid p={5} columns={2} spacing={8}>
      <GridItem>
        <BlockCanvas colors={colors} />
      </GridItem>
      <GridItem>
        <VStack spacing="3" align="stretch">
          <Text fontSize="xl">Placing bid for <Text color="purple.500" as="span" fontWeight={"bold"}>Block #{id}</Text></Text>
          <Card border="1px solid" borderColor="purple.500">
            <CardBody px="3" py="2">
              <Stat>
                <StatLabel color="purple.500">Bid Price</StatLabel>
                <StatNumber my="1" fontSize={"lg"}><MaticIcon boxSize={8} mr="2" />{bidPrice * 100} MATIC</StatNumber>
                <StatHelpText mb="0"><Text as="span" fontWeight={"bold"}>{bidPrice} MATIC / Pixel</Text></StatHelpText>

              </Stat>

            </CardBody>
          </Card>
          <Text>Rent Duration is <Text color="purple.500" as="span" fontWeight={"bold"}>{(rentDuration === 0) ? 30 : (rentDuration === 1) ? 90 : 180} days</Text></Text>

        </VStack>
      </GridItem>
    </SimpleGrid>
  )
}

const FirstMakeBidStep = ({ colors, setColors, onCellClick }:
  { colors: `#${string}`[], setColors: React.Dispatch<React.SetStateAction<`#${string}`[]>>, onCellClick: (index: number, newColor: `#${string}`) => void }) => {
  const [newColor, setNewColor] = useState<`#${string}`>('#ffffff')

  const handleChangeColor = (c: ColorResult) => {
    console.log(c.hex)
    setNewColor(c.hex as `#${string}`)
  }

  const resetColor = () => {
    setColors([...Array(100)].map(_ => "#ffffff"))
  }

  return (
    <SimpleGrid columns={2} spacing={8} p="5">
      <Box >
        <BlockCanvas colors={colors} selectedColor={newColor} onCellClick={onCellClick} editable={true} />
      </Box>
      <Box>
        <VStack spacing={8} align={"stretch"}>
          <Alert status='warning'>
            <AlertIcon />
            <Text>Pixels are white by default!</Text>
          </Alert>
          <Center>
            <CompactPicker
              color={newColor}
              colors={colorChoices}
              onChangeComplete={(c: ColorResult) => handleChangeColor(c)}
              styles={{ bg: { boxShadow: 'none' }, compact: { width: "280px", } }}
            />
          </Center>
          <Button colorScheme='purple' onClick={resetColor}>
            Reset
          </Button>
        </VStack>

      </Box>
    </SimpleGrid>
  )
}


function MakeNewBidModal({ id, isModalOpen, onModalClose, bidPrice, rentDuration }: { id: number, isModalOpen: boolean, onModalClose: () => void, bidPrice: number, rentDuration: number }) {

  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const blockExplorerTx = cData[testnetChain]["blockExplorerTx"]


  const { poolAddress } = useContext(RentPoolContext)
  const [colors, setColors] = useState<`#${string}`[]>([...Array(100)].map(_ => "#ffffff"))


  const rentPoolContract = {
    address: poolAddress,
    abi: rentPoolABI,
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    ...rentPoolContract,
    functionName: 'makeBid',
    args: [parseEther((bidPrice).toString() as `${number}`), colors.map(c => hexToDec("0x" + c.slice(1)))],
    value: parseEther((bidPrice * 100).toString() as `${number}`),
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
    { title: 'Preview & Bid', forwardButtonText: 'Make Bid!' },
    { title: 'View Transaction', }
  ]

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length + 1,
  })

  const handleBid = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            {(activeStep == 0) && <FirstMakeBidStep colors={colors} setColors={setColors} onCellClick={onCellClick} />}
            {(activeStep == 1) && <SecondMakeBidStep id={id} colors={colors} bidPrice={bidPrice} rentDuration={rentDuration} />}

            {(activeStep == 2) && <SimpleGrid><Spinner size='xl' justifySelf="center" /></SimpleGrid>}
            {(activeStep == 3) && <VStack spacing={5} mt={5}><Image justifySelf="center"
              width={250}
              objectFit='scale-down'
              src={(isSuccess) ? '/images/GreenTick.png' : '/images/RedCross.png'}
              alt={(isSuccess) ? 'Transaction Complete' : 'Transaction Failed'}
            />

              {(isSuccess) ? <Text>
                Successfully Bidded! {(data?.hash) ? <Link color="blue.500" href={`${blockExplorerTx}${data.hash}`} isExternal>view txn</Link> : null}</Text>
                : (isPrepareError) ? <Text>{prepareError?.message?.substring(0, 240)}...</Text> : <Text>Make Bid Failed! {error?.message?.substring(0, 240)}... <Link color="blue.500" href={`${blockExplorerTx}${data?.hash}`} isExternal>view txn</Link></Text>}

            </VStack>}
          </ModalBody>
          <ModalFooter>
            {(activeStep === 1) && (<Button colorScheme='purple' onClick={goToPrevious} alignSelf="flex-start"><ArrowBackIcon /> Back</Button>)}
            <Spacer />
            {(activeStep === 3) && (<Button colorScheme='purple' onClick={onModalClose} alignSelf="center">Close</Button>)}
            <Spacer />
            {(activeStep === 0) && (<Button colorScheme='purple' onClick={goToNext} alignSelf="center">Proceed <ArrowForwardIcon /></Button>)}
            {(activeStep === 1) && (<Button colorScheme='purple' disabled={!write || isLoading} onClick={handleBid} alignSelf="center">Make Bid</Button>)}

          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default MakeNewBidModal;