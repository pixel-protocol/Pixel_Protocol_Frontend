import React, { useState, createContext, useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon, useDisclosure } from '@chakra-ui/react'
import { MdHomeFilled, MdGridView, MdMonetizationOn } from 'react-icons/md'
import Home from '@/components/sidebar/block/Home'
import Pixels from '@/components/sidebar/block/Pixels'
import Rent from '@/components/sidebar/block/Rent'
import { Coordinates, ChainData, Tier } from '@/constant/types'
import {
  useAccount,
  useNetwork,
  useContractReads,
  useContractRead,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

import { useStateCallback } from "../../../helper/hooks"

import LoadingSpinner from "@/components/LoadingSpinner"
import styled from 'styled-components'
import chainData from "@/constant/chain.json"
import { testnetChain, zeroAddress } from '@/constant/constants'
import blockABI from '@/constant/abis/Block'


type BlockContextType = {
  blockOwner: `0x${string}`,
  pixelColors: `#${string}`[],
  pixelOwners: `0x${string}`[],
  refetch: () => void
}

type ModalContextType = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}
export const BlockContext = createContext<BlockContextType>({
  blockOwner: zeroAddress,
  pixelColors: [...Array(100)].map(_ => "#ffffff"),
  pixelOwners: [...Array(100)].map(_ => zeroAddress),
  refetch: () => { }
})

export const MintModalContext = createContext<ModalContextType>({
  isOpen: false,
  onOpen: () => { },
  onClose: () => { }
})

export const RentPoolModalContext = createContext<ModalContextType>({
  isOpen: false,
  onOpen: () => { },
  onClose: () => { }
})

const Sections = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const blockAddress = cData[testnetChain]["contractAddresses"][1]

  const [tabIndex, setTabIndex] = useState(0)

  const [blockOwner, setBlockOwner] = useState<`0x${string}`>(zeroAddress)
  const [pixelColors, setPixelColors] = useState<`#${string}`[]>([...Array(100)].map(_ => "#ffffff"))
  const [pixelOwners, setPixelOwners] = useState<`0x${string}`[]>([...Array(100)].map(_ => zeroAddress))


  // Modals placed at the top of the hierarchy to prevent auto close on rerendering
  const { isOpen: isOpenMintModal, onOpen: onOpenMintModal, onClose: onCloseMintModal } = useDisclosure()
  const { isOpen: isOpenRentPoolModal, onOpen: onOpenRentPoolModal, onClose: onCloseRentPoolModal } = useDisclosure()




  const blockContract = {
    address: blockAddress,
    abi: blockABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }


  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...blockContract,
        functionName: 'ownerOf',
        args: [BigInt(id)],
      },
      {
        ...blockContract,
        functionName: 'getPixelColors',
        args: [BigInt(id)],
      },
      {
        ...blockContract,
        functionName: 'getPixelOwners',
        args: [BigInt(id)],
      }
    ],
    onSuccess(data) {
      const [blockOwner, pixelColors, pixelOwners] = data
      setBlockOwner(blockOwner.result ? blockOwner.result as `0x${string}` : zeroAddress)
      setPixelColors(pixelColors.result ? (pixelColors.result as number[]).map(x => "#" + x.toString(16).padStart(6, '0') as `#${string}`) : [...Array(100)].map(_ => "#ffffff"))
      setPixelOwners(pixelOwners.result ? pixelOwners.result as `0x${string}`[] : [...Array(100)].map(_ => zeroAddress))
    },
    onError(err) {
      setBlockOwner(zeroAddress)
      setPixelColors([...Array(100)].map(_ => "#ffffff"))
      setPixelOwners([...Array(100)].map(_ => zeroAddress))
      console.log(err)
    },

  })

  /* get owners of blocks */

  useEffect(() => {
    refetch()
    setTabIndex(0)
  }, [id])

  useEffect(() => {
    refetch()
  }, [])






  return (
    <BlockContext.Provider value={{ blockOwner: blockOwner, pixelColors: pixelColors, pixelOwners: pixelOwners, refetch: refetch }}>

      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant='soft-rounded' colorScheme='purple' >
        <TabList>
          <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
          <Tab isDisabled={blockOwner === zeroAddress}><Icon as={MdGridView} mr="1" />Pixels</Tab>
          <Tab isDisabled={blockOwner === zeroAddress}><Icon as={MdMonetizationOn} mr="1" />Rent</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MintModalContext.Provider value={{ isOpen: isOpenMintModal, onOpen: onOpenMintModal, onClose: onCloseMintModal }}>
              {(tabIndex === 0) ? <Home id={id} coordinates={coordinates} tier={tier} /> : null}
            </MintModalContext.Provider>

          </TabPanel>
          <TabPanel>
            {(tabIndex === 1) ? (blockOwner !== zeroAddress) && <Pixels id={id} coordinates={coordinates} tier={tier} /> : null}

          </TabPanel>
          <TabPanel>
            <RentPoolModalContext.Provider value={{ isOpen: isOpenRentPoolModal, onOpen: onOpenRentPoolModal, onClose: onCloseRentPoolModal }}>
              {(tabIndex === 2) ? (blockOwner !== zeroAddress) && <Rent id={id} coordinates={coordinates} tier={tier} /> : null}
            </RentPoolModalContext.Provider>
          </TabPanel>
        </TabPanels>
      </Tabs >
    </BlockContext.Provider>
  )
}

export default Sections;

