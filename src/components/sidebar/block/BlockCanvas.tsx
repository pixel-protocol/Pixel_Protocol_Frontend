import { useEffect, useRef, useState } from "react";
import { Grid, GridItem, SimpleGrid, Box } from '@chakra-ui/react';
import { ColorResult } from "@hello-pangea/color-picker";

const BlockCanvas = ({ colors, selectedColor, onCellClick = () => { }, editable = false }:
  { colors: `#${string}`[], selectedColor?: `#${string}`, onCellClick?: Function, editable?: boolean }) => {


  function handleCellClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) {
    e.preventDefault()
    if (editable) {
      onCellClick(i, selectedColor)
    }
  }

  return (
    <SimpleGrid columns={10} border={"3px solid gray"}>
      {
        colors.map((color, i) => <Box border={"1px solid gray"} key={i} bg={color} height='32px' width='32px' onClick={(e) => handleCellClick(e, i)} />)
      }
    </SimpleGrid>)
}

export default BlockCanvas