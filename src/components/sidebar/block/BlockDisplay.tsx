import { useEffect, useRef, useState } from "react";
import { SimpleGrid, Box } from '@chakra-ui/react';

const BlockDisplay = ({ colors, onCellClick = () => { } }:
  { colors: `#${string}`[], onCellClick?: Function }) => {

  const walletAddresses = ['0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8', '0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2db']; // Replace with actual wallet addresses

  const currentAddress = '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8'

  const generateRandomColor = (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const generateDataArray = (): { color: string; owner: string }[] => {
    const data: { color: string; owner: string }[] = [];
    for (let i = 0; i < 100; i++) {
      const randomColor = generateRandomColor();
      const randomOwner = walletAddresses[Math.floor(Math.random() * walletAddresses.length)];
      data.push({ color: randomColor, owner: randomOwner });
    }
    return data;
  };

  const data: { color: string; owner: string }[] = generateDataArray();

  function handleCellSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) {
    e.preventDefault()
  }

  const greyedOut = {
    //opacity: 0.1,
    filter: 'brightness(0.9)',
    cursor: 'default',
    'background-color': 'white',
    border: "",
  }

  const overlay = {
    width: '100%',
    height: '100%',
    'background-color': 'rgba(0, 0, 0, 0.3)', /* Use rgba to set the background color with opacity */
    'z-index': 999, /* Adjust the z-index as needed */
  }

  return (
    <>
      <SimpleGrid columns={10} width='200px' height='200px' spacing={0}>
        {
          data.map(({ color, owner }, i) => <Box style={(owner !== currentAddress) ? greyedOut : { cursor: 'pointer' }} border={(owner === currentAddress) && "0.5px solid gray"} key={i} bg={color} height='20px' width='20px'>
          </Box>)
        }
      </SimpleGrid ></>
  )
}

export default BlockDisplay