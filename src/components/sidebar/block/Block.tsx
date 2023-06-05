import React, { useState, useEffect, useRef, Dispatch, SetStateAction, createContext } from "react";
import { Coordinates, Tier } from "@/constant/types";


import Sections from "@/components/sidebar/block/Sections";

import { Box } from '@chakra-ui/react'


import { coordToIdBlock, coordToTierBlock } from "@/helper/conversion";




const Block = ({ coordinates }: { coordinates: Coordinates }) => {

  const [id, setId] = useState<number>(0)

  const [tier, setTier] = useState<Tier>("Bronze")

  useEffect(() => {
    setId(coordToIdBlock(coordinates.x, coordinates.y))
    setTier(coordToTierBlock(coordinates.x, coordinates.y))
  }, [])

  useEffect(() => {
    setId(coordToIdBlock(coordinates.x, coordinates.y))
    setTier(coordToTierBlock(coordinates.x, coordinates.y))
  }, [coordinates])




  // /* Check if Block exists (is minted) */
  // const { data: existsData, isError: existsIsError, isLoading: existsIsLoading } = useContractRead({

  //   address: blockAddress,
  //   abi: blockABI,
  //   functionName: 'exists',
  //   args: [coordToIdBlock(coordinates.x, coordinates.y)],

  // })

  // if (existsData) {
  //   const { data: ownerData, isError: ownerIsError, isLoading: ownerIsLoading } = useContractRead({
  //     address: blockAddress,
  //     abi: blockABI,
  //     functionName: 'owner',
  //     args: [coordToIdBlock(coordinates.x, coordinates.y)],
  //   })
  // }



  return (
    <Box p="2">
      <Sections id={id} coordinates={coordinates} tier={tier} />
    </Box>
  )
}

export default Block