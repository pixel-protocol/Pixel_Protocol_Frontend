import React, { useEffect, useRef, useState } from "react";
import { SimpleGrid, Box, Center, VStack, Button, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { ColorResult } from "@hello-pangea/color-picker";
import BlockCanvas from "@/components/sidebar/block/BlockCanvas";
import { CompactPicker } from "@hello-pangea/color-picker";
import { colorChoices } from "@/constant/constants";
const FirstMintStep = ({ colors, setColors, onCellClick }:
  { colors: `#${string}`[], setColors: React.Dispatch<React.SetStateAction<`#${string}`[]>>, onCellClick: Function }) => {
  const [newColor, setNewColor] = useState<`#${string}`>('#ffffff')


  const handleChangeColor = (c: ColorResult) => {
    console.log(c.hex)
    setNewColor(c.hex as `#${string}`)
  }

  const resetColor = () => {
    setColors(Array.apply(null, Array(100)).map(_ => "#ffffff"))
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
            <Text color="gray">Pixels are white by default</Text>
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

export default FirstMintStep