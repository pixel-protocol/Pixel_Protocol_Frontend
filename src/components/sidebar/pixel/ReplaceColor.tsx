import React, { useState, useEffect } from 'react'
import {
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, Button, Image
} from '@chakra-ui/react'

import { ColorResult } from "@hello-pangea/color-picker";


import chainData from "@/constant/chain.json"
import PixelPalette from '@/components/sidebar/pixel/PixelPalette'

import { Tier, Coordinates, ChainData } from '@/constant/types'

const cData: ChainData = chainData;

const ReplaceColor = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const [color, setColor] = useState('#ffffff');
  const [newColor, setNewColor] = useState('#ffffff')
  const handleChangeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColor(newColor)
  }
  return (
    <Card variant="filled">
      <CardBody>
        <PixelPalette orgColor={color} color={newColor} handleChangeComplete={(c: ColorResult) => { setNewColor(c.hex) }}
          onButtonClick={handleChangeColor} />
      </CardBody>
    </Card>


  )
}

export default ReplaceColor;