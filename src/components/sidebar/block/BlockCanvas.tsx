import { useEffect, useRef, useState } from "react";
import { Grid, GridItem, SimpleGrid, Box } from '@chakra-ui/react';
import { ColorResult } from "@hello-pangea/color-picker";

const BlockCanvas = ({ colors, selectedColor, onCellClick = () => { }, editable = false }:
  { colors: `#${string}`[], selectedColor?: `#${string}`, onCellClick?: Function, editable?: boolean }) => {

  function handleCellSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) {
    e.preventDefault()
    if (e.buttons === 1 || e.buttons === 3 || e.shiftKey) {
      if (editable) {
        onCellClick(i, selectedColor)
      }
    }
  }

  return (
    <SimpleGrid columns={10} border={"3px solid gray"}>
      {
        colors.map((color, i) => <Box border={"1px solid gray"} key={i} bg={color} height='32px' width='32px' onMouseEnter={(e) => handleCellSelect(e, i)} onMouseDown={(e) => handleCellSelect(e, i)} />)
      }
    </SimpleGrid>)
}

export default BlockCanvas