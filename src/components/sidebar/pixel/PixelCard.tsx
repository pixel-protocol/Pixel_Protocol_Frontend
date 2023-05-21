import { CSSProperties, useState } from "react";

import { Card, CardBody, Text, Box, Grid, GridItem } from '@chakra-ui/react'
import PixelPalette from "@/components/sidebar/pixel/PixelPalette";
import { ColorResult } from "@hello-pangea/color-picker";
import Info from "@/components/sidebar/pixel/Info";
import { Coordinates } from "@/constant/types";
import { coordToIdPixel } from "@/helper/conversion";

const PixelCard = () => {

  const [color, setColor] = useState('#ffffff');
  const [newColor, setNewColor] = useState('#ffffff')
  const [ownerAddress, setOwnerAddress] = useState("0x...")
  const [price, setPrice] = useState("0")
  const [blockId, setBlockId] = useState(0)
  const [isOwner, setIsOwner] = useState(true)
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 1 })

  const tier: "bronze" | "silver" | "gold" = "";
  let borderColor: CSSProperties["borderColor"] = "";

  switch (tier) {
    case "bronze":
      borderColor = "orange.600";
      break;
    case "silver":
      borderColor = "gray.400";
      break;
    case "gold":
      borderColor = "yellow.400";
      break;
    default:
      borderColor = "gray.500";
  }

  const handleChangeColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColor(newColor)
  }

  return (<Card maxW='400px'>
    <CardBody>
      <Grid templateColumns="1fr 3fr" gap={4} alignItems="center" mb={5}>
        <GridItem h="100%">
          <Box
            w="60px"
            h="60px"
            borderRadius="lg"
            border="2px solid"
            borderColor={borderColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={color}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="xl" fontWeight="bold">Pixel #{coordToIdPixel(coordinates.x, coordinates.y)}</Text>
          <Grid
            templateColumns='1fr 5fr 1fr 5fr'
            gap={3}
            maxW={["100%", "80%"]}
          >
            <GridItem><Text>X:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" width="100%">{coordinates.x}</Box></GridItem>
            <GridItem><Text>Y:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md">{coordinates.y}</Box></GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Info ownerAddress={ownerAddress} blockId={blockId} price={price} />
      {isOwner && <PixelPalette orgColor={color} color={newColor} handleChangeComplete={(c: ColorResult) => { setNewColor(c.hex) }}
        onButtonClick={handleChangeColor} />}
    </CardBody>
  </Card>)
}

export default PixelCard;