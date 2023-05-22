import React, { useState } from "react";
import { CompactPicker, ColorResult, Color } from "@hello-pangea/color-picker";
import { Box, Button, Grid, GridItem, Icon, VStack } from "@chakra-ui/react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const colorChoices = [
  "#0f0f12",
  "#505359",
  "#b6bfbc",
  "#f2fbff",
  "#5ee7ff",
  "#00a1db",
  "#1d5bb8",
  "#1f2c66",
  "#1b5245",
  "#2e8f46",
  "#58d92e",
  "#cbff70",
  "#ffff8f",
  "#ffdf2b",
  "#f0771a",
  "#e32239",
  "#851540",
  "#401a24",
  "#9c3b30",
  "#c95d3c",
  "#ed8a5f",
  "#ffbca6",
  "#eb75be",
  "#77388c"
]
interface PixelPaletteProps {
  orgColor: string | undefined,
  handleChangeComplete?: (color: ColorResult) => void,
  color: string | undefined,
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const PixelPalette = (props: PixelPaletteProps) => {

  return (
    <VStack spacing={2} align="stretch">
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

      <CompactPicker
        color={props.color}
        colors={colorChoices}
        onChangeComplete={props.handleChangeComplete}
        styles={{ bg: { boxShadow: 'none' } } as any}
      />
      <Button colorScheme='purple' variant='solid' onClick={props.onButtonClick}>Replace Color</Button>
    </VStack>
  )

}

export default PixelPalette;