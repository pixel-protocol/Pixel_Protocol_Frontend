import React, { useState } from "react";
import { CompactPicker, ColorResult, Color } from "@hello-pangea/color-picker";
import { Box, Button, Grid, GridItem, Icon, VStack, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { colorChoices } from "@/constant/constants";

interface PixelPaletteProps {
  isLoading: boolean,
  write: (() => void) | undefined,
  orgColor: string | undefined,
  handleChangeComplete?: (color: ColorResult) => void,
  color: string | undefined,
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const PixelPalette = (props: PixelPaletteProps) => {

  return (
    <VStack spacing={3} align="stretch">
      <Grid templateColumns="1fr 1fr 1fr"
        alignItems="center" w="100%" my={3}>
        <GridItem justifySelf="right">
          <Box
            w="60px"
            h="60px"
            borderRadius="lg"
            border="2px solid"
            borderColor="gray.500"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={props.orgColor ? props.orgColor : "#ffffff"}
          />
        </GridItem>
        <GridItem justifySelf="center">
          <Icon as={MdOutlineKeyboardDoubleArrowRight} boxSize={50} />
        </GridItem>
        <GridItem justifySelf="left">
          <Box
            w="60px"
            h="60px"
            borderRadius="lg"
            border="2px solid"
            borderColor="gray.500"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={props.color}
          />
        </GridItem>
      </Grid>
      <VStack align={"center"} bg="white" p={1}>
        <CompactPicker
          color={props.color}
          colors={colorChoices}
          onChangeComplete={props.handleChangeComplete}
          styles={{ bg: { boxShadow: 'none' }, compact: { width: "280px", } }}
        />
      </VStack>
      {(props.orgColor === props.color) ? <Alert status="error"><AlertIcon /><Text>Select a different color!</Text></Alert> : null}

      <Button disabled={!props.write || props.isLoading} isLoading={props.isLoading} loadingText="Replacing Color" isDisabled={props.orgColor === props.color} colorScheme='purple' variant='solid' onClick={props.onButtonClick}>Replace Color</Button>
    </VStack>
  )

}

export default PixelPalette;