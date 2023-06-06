import { useEffect, useRef, useState } from "react";
import { SimpleGrid, Box } from '@chakra-ui/react';
import { sampleBlockColor } from "@/constant/constants";
import { useAccount } from "wagmi";

const PixelsGrid = ({ selectedCell, showAll, colors, owners, onCellClick = () => { } }:
  { selectedCell: number | undefined, showAll: boolean, colors: `#${string}`[], owners: `0x${string}`[], onCellClick?: Function }) => {
  const { address, connector, isConnected } = useAccount()

  function handleCellSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) {
    e.preventDefault()
    onCellClick(i)
  }

  const greyedOut = {
    //opacity: 0.1,
    filter: 'brightness(0.9)',
    cursor: 'default',
    backgroundColor: 'transparent',
    border: "",
  }

  return (

    <SimpleGrid columns={10} width="100%" aspectRatio={1} spacing={0} backgroundImage={"url(/images/blockbackground.png)"} backgroundSize={"cover"}>
      {
        colors.map(function (c, i) {
          return { color: c, owner: owners[i] }
        }).map(({ color, owner }, i) => <Box style={(!showAll && owner !== address) ? greyedOut : { cursor: 'pointer', border: (selectedCell && i === selectedCell) ? "1px solid purple" : "1px solid gray" }} key={i} bg={color} onClick={(e) => (showAll || owner === address) && handleCellSelect(e, i)}>
        </Box>)
      }
    </SimpleGrid >


  )
}

export default PixelsGrid