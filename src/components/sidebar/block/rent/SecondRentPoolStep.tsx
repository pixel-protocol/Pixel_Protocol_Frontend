import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Stat, StatLabel, StatHelpText, StatNumber, VStack, Button, Alert, AlertIcon, Text, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormHelperText } from '@chakra-ui/react';
import { ColorResult } from "@hello-pangea/color-picker";
import BlockCanvas from "@/components/sidebar/block/BlockCanvas";
import { CompactPicker } from "@hello-pangea/color-picker";
import { colorChoices } from "@/constant/constants";
import { idToTierBlock } from "@/helper/conversion";
import { testnetChain } from "@/constant/constants";
import { ChainData } from "@/constant/types";
import chainData from "@/constant/chain.json"



const SecondRentPoolStep = ({ id, mode, baseFloorPrice, bidDuration, bidIncrement }:
  { id: number, mode: "Create" | "Edit", baseFloorPrice: number, bidDuration: number, bidIncrement: number }) => {



  const inputs = [{
    label: "Base Floor Price",
    value: `${baseFloorPrice} MATIC / Pixel`,
    helpText: `Total = ${baseFloorPrice * 100} MATIC`
  }, {
    label: "Bid Duration",
    value: `${bidDuration} days`,

  }, {
    label: "Bid Increment",
    value: `${bidIncrement}%`,

  }]

  return (
    <VStack spacing={3} align="stretch">
      {(mode === "Create") ? <Text fontSize="xl">Confirm Pool Parameters for <Text as="span" fontWeight="bold">Block #{id}</Text> Rent Pool</Text> : <Text fontSize="xl">Confirm Changes to Pool Parameters for <Text as="span" fontWeight="bold">Block #{id}</Text></Text>}

      {inputs.map((input, i) => {
        return (
          <DisplayCard key={i} label={input.label} value={input.value} helpText={("helpText" in input) ? (input.helpText as string) : undefined} />
        )
      })}


    </VStack>
  )
}


const DisplayCard = ({ label, value, helpText }: { label: string, value: string, helpText?: string }) => {
  return (

    <Card border="1px solid" borderColor="purple">
      <CardBody px="3" py="2">
        <Stat>
          <StatLabel color="purple">{label}</StatLabel>
          <StatNumber my="1" fontSize={"lg"}>{value}</StatNumber>
          {(helpText) && <StatHelpText mb="0">{helpText}</StatHelpText>}
        </Stat>
      </CardBody>
    </Card>


  )
}

export default SecondRentPoolStep