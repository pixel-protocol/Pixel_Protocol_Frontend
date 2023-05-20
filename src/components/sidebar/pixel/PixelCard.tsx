import { CSSProperties, useState } from "react";

import { Card, CardHeader, CardBody, CardFooter, Text, Box, Grid, GridItem, Link } from '@chakra-ui/react'

const PixelCard = () => {

  const [color, setColor] = useState('#ffff8f');

  const tier: "bronze" | "silver" | "gold" = "gold";
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
  return (<Card maxW='400px'>
    <CardBody>
      <Grid templateColumns="1fr 3fr" gap={4} alignItems="center" mb={5}>
        <GridItem h="100%">
          <Box
            w="60px"
            h="60px"
            borderRadius="md"
            border="3px solid"
            borderColor={borderColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={color}
          >
          </Box>
        </GridItem>
        <GridItem>
          <Text fontSize="xl" fontWeight="bold">Pixel #1000</Text>
          <Grid
            templateColumns='1fr 5fr 1fr 5fr'
            gap={3}
            maxW={["100%", "80%"]}
          >
            <GridItem><Text>X:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md" width="100%">0</Box></GridItem>
            <GridItem><Text>Y:</Text></GridItem>
            <GridItem><Box border="1px solid" textAlign="center" borderColor="gray.300" borderRadius="md">1</Box></GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Text>Owner: <Link color="blue.500">0x...</Link></Text>
      <Text>Fair Value: ... ETH</Text>
      <br />
      <Text color="gray.600" fontSize="sm" fontStyle="italic">
        This Pixel is available for mint at <Link color="blue.500">Block #0</Link> for ... ETH
      </Text>
    </CardBody>
  </Card>)
}

export default PixelCard;