import React, { useEffect, useRef, useState } from "react";
import { SimpleGrid, Box, Center, VStack, Button, Alert, AlertIcon, Text, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText } from '@chakra-ui/react';
import { ColorResult } from "@hello-pangea/color-picker";
import BlockCanvas from "@/components/sidebar/block/BlockCanvas";
import { CompactPicker } from "@hello-pangea/color-picker";
import { colorChoices } from "@/constant/constants";
import { idToTierBlock } from "@/helper/conversion";
import { testnetChain } from "@/constant/constants";
import { ChainData } from "@/constant/types";
import chainData from "@/constant/chain.json"



const FirstRentPoolStep = ({ id, mode, baseFloorPrice, bidDuration, bidIncrement, setBaseFloorPrice, setBidDuration, setBidIncrement }:
  { id: number, mode: "Create" | "Edit", baseFloorPrice: number, bidDuration: number, bidIncrement: number, setBaseFloorPrice: React.Dispatch<React.SetStateAction<number>>, setBidDuration: React.Dispatch<React.SetStateAction<number>>, setBidIncrement: React.Dispatch<React.SetStateAction<number>> }) => {
  const cData: ChainData = chainData;
  const fairValuePerPixel = cData[testnetChain]["fairValueEther"][idToTierBlock(id)]

  const [baseFloorPriceInput, setBaseFloorPriceInput] = useState<string>(baseFloorPrice.toString())
  const [bidDurationInput, setBidDurationInput] = useState<string>(bidDuration.toString())
  const [bidIncrementInput, setBidIncrementInput] = useState<string>(bidIncrement.toString())

  const isValid = (value: number, type: number) => {
    return (type === 0) ? value >= fairValuePerPixel && value <= fairValuePerPixel * 1e4 : (type === 1) ? value >= 3 && value <= 7 : value >= 5 && value <= 20
  }



  const handleChangeBaseFloorPrice = (valueAsString: string, valueAsNumber: number) => {
    setBaseFloorPriceInput(valueAsString)
    if (isValid(valueAsNumber, 0)) setBaseFloorPrice(valueAsNumber)
  }

  const handleChangeBidDuration = (valueAsString: string, valueAsNumber: number) => {
    setBidDurationInput(valueAsString)
    if (isValid(valueAsNumber, 1)) setBidDuration(valueAsNumber)
  }

  const handleChangeBidIncrement = (valueAsString: string, valueAsNumber: number) => {
    setBidIncrementInput(valueAsString)
    if (isValid(valueAsNumber, 2)) setBidIncrement(valueAsNumber)
  }

  const inputs = [{
    label: "Base Floor Price per Pixel (MATIC)",
    value: baseFloorPriceInput,
    precision: 4,
    min: fairValuePerPixel,
    max: fairValuePerPixel * 1e4,
    step: Number((fairValuePerPixel / 10).toPrecision(1)),
    changeHandler: handleChangeBaseFloorPrice,
    helperText: `Base Floor Price per Pixel is between ${fairValuePerPixel} MATIC and ${fairValuePerPixel * 1e4} MATIC`
  }, {
    label: "Bid Duration (in Days)",
    value: bidDurationInput,
    precision: 0,
    min: 3,
    max: 7,
    step: 1,
    changeHandler: handleChangeBidDuration,
    helperText: `Bid Duration is between 3 days and 3 days`
  }, {
    label: "Bid Increment (%)",
    value: bidIncrementInput,
    precision: 0,
    min: 5,
    max: 20,
    step: 1,
    changeHandler: handleChangeBidIncrement,
    helperText: `Bid Increment is between 5% and 20%`
  }]

  return (
    <VStack spacing={3} align="stretch">
      {(mode === "Create") ? <Text fontSize="xl">Create Rent Pool for <Text as="span" fontWeight="bold">Block #{id}</Text></Text> : <Text fontSize="xl">Edit Rent Pool for <Text as="span" fontWeight="bold">Block #{id}</Text></Text>}
      <VStack spacing={1} align="stretch">
        <Text fontStyle={"italic"}>Pool Parameters</Text>
        <VStack spacing={3} align="stretch">
          {inputs.map((input, i) => {
            return (
              <FormControlBox key={i} label={input.label} value={input.value} precision={input.precision} step={input.step} max={input.max} min={input.min} changeHandler={input.changeHandler} helperText={input.helperText} />
            )
          })}
        </VStack>
      </VStack>


    </VStack>
  )
}


const FormControlBox = ({ label, value, precision, step, max, min, changeHandler, helperText }: { label: string, value: string, precision: number, step: number, max: number, min: number, changeHandler: (valueAsString: string, valueAsNumber: number) => void, helperText: string }) => {
  return (

    <FormControl >
      <FormLabel>{label}</FormLabel>
      <NumberInput focusBorderColor={"purple.500"} value={value} precision={precision} step={step} max={max} min={min} onChange={changeHandler}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>


  )
}

export default FirstRentPoolStep