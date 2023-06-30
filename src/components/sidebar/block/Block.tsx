import React, { useState, useEffect, useRef, Dispatch, SetStateAction, createContext } from "react";
import { Coordinates, Tier } from "@/constant/types";
import { useDisclosure } from "@chakra-ui/react";

import Sections from "@/components/sidebar/block/Sections";

import { Box } from '@chakra-ui/react'


import { coordToIdBlock, coordToTierBlock } from "@/helper/conversion";

type ModalContextType = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

export const MintModalContext = createContext<ModalContextType>({
  isOpen: false,
  onOpen: () => { },
  onClose: () => { }
})



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

  // Modals placed at the top of the hierarchy to prevent auto close on rerendering
  const { isOpen: isOpenMintModal, onOpen: onOpenMintModal, onClose: onCloseMintModal } = useDisclosure()



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
      <MintModalContext.Provider value={{ isOpen: isOpenMintModal, onOpen: onOpenMintModal, onClose: onCloseMintModal }}>

        <Sections id={id} coordinates={coordinates} tier={tier} />
      </MintModalContext.Provider>

    </Box>
  )
}

export default Block