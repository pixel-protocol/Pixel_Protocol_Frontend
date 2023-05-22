import React, { useEffect, useState } from 'react'

import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, Box, ModalFooter, Button, Grid, GridItem, Spacer, Image, Flex, Link, Card, CardBody, Stat, StatHelpText, StatLabel, StatNumber, VStack, Badge, SimpleGrid, Spinner
} from '@chakra-ui/react'

import { getColorForTier } from '@/helper/misc'
import MaticIcon from '@/components/icons/MaticIcon'

import BlockCanvas from '@/components/sidebar/block/BlockCanvas'

function MintModal({ isModalOpen, onModalClose }: { isModalOpen: boolean, onModalClose: () => void }) {
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    let temp = []
    for (let i = 0; i < 100; i++) {
      temp.push('#' + Math.floor(Math.random() * 16777215).toString(16))
    }
    setColors(temp)
  }, [])

  useEffect(() => {
    console.log(newColor)
  }, [newColor])

  const steps = [
    { title: 'Select Color for Pixels', forwardButtonText: 'Proceed' },
    { title: 'Preview Block Design', forwardButtonText: 'Mint' },
    { title: 'Confirm Transaction' }
  ]

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleMint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActiveStep(2)
    //mint logic
    new Promise((resolve) => {
      setTimeout(() => {
        setActiveStep(3)
        resolve("Success");
      }, 5000); // Wait for 5 seconds
    });
  }

  const onCellClick = (index, newColor) => {
    setColors((prevColors) => {
      const temp = [...prevColors];
      temp[index] = newColor;
      return temp;
    });
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size={activeStep < 3 ? "4xl" : "sm"}>
        <ModalOverlay />
        <ModalContent>
          {(activeStep < 3) && <Box m={5} mr={10}>
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
          </Box>}
          <Spacer />
          <ModalBody>
            {(activeStep == 0) && <BlockCanvas colors={colors} onCellClick={onCellClick} isEditting={true} />}
            {(activeStep == 1) &&
              <SimpleGrid justifyContent="center" alignContent="center" minChildWidth={300} spacing={5}>
                <GridItem justifySelf="center">
                  <BlockCanvas colors={colors} />
                </GridItem>
                <GridItem>
                  <VStack spacing="2" align="stretch">
                    <Text fontSize="xl" fontWeight="bold" color="purple">Block #0 <Badge ml={2} variant='solid' bg={getColorForTier("Gold")}>
                      Gold
                    </Badge></Text>
                    <Grid
                      templateColumns='1fr 5fr 1fr 5fr'
                      gap={3}
                      maxW={["100%", "100%", "50%"]}
                    >
                      <GridItem><Text>X:</Text></GridItem>
                      <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>0</Box></GridItem>
                      <GridItem><Text>Y:</Text></GridItem>
                      <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" fontWeight={"bold"}>1</Box></GridItem>
                    </Grid>
                    <Card border="1px solid" borderColor="purple">
                      <CardBody p="3">
                        <Stat>
                          <StatLabel color="purple">You will receive:</StatLabel>
                          <StatNumber my="1">1 <span style={{ fontSize: "18px" }}>$BLOCK</span> + 100 <span style={{ fontSize: "18px" }}>$PIXEL</span></StatNumber>
                        </Stat>
                      </CardBody>
                    </Card>
                    <Card border="1px solid" borderColor="purple">
                      <CardBody p="3">
                        <Stat>
                          <StatLabel color="purple">Fair Value / Mint Price</StatLabel>
                          <StatNumber my="1"><MaticIcon boxSize={12} mr="2" />{0.01 * 100} MATIC</StatNumber>
                          <StatHelpText mb="0">≈$1.02 ({0.01} MATIC per Pixel)</StatHelpText>
                        </Stat>
                      </CardBody>
                    </Card>
                  </VStack>
                </GridItem>
              </SimpleGrid>}
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
            {(activeStep == 0) && (<Button colorScheme='purple' onClick={goToNext} alignSelf="flex-start">Proceed</Button>)}
            {(activeStep == 1) && (<Button colorScheme='purple' onClick={handleMint} alignSelf="flex-start">Mint</Button>)}
            <Spacer />
            {(activeStep == 3) && (<Button colorScheme='purple' onClick={onModalClose} alignSelf="center">Close</Button>)}
            <Spacer />
            {(activeStep > 0 && activeStep < 2) && (<Button colorScheme='purple' onClick={goToPrevious} alignSelf="center">Back</Button>)}
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default MintModal;