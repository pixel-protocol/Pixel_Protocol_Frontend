import React, { useState, createContext, useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
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
}
export const BlockContext = createContext<BlockContextType>({
  blockOwner: zeroAddress,
  pixelColors: [...Array(100)].map(_ => "#ffffff"),
  pixelOwners: [...Array(100)].map(_ => zeroAddress)
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
  }, [id])

  useEffect(() => {
    refetch()
  }, [])






  return (
    <BlockContext.Provider value={{ blockOwner: blockOwner, pixelColors: pixelColors, pixelOwners: pixelOwners }}>


      <Tabs onChange={(index) => setTabIndex(index)} variant='soft-rounded' colorScheme='purple' >
        <TabList>
          <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
          <Tab><Icon as={MdGridView} mr="1" />Pixels</Tab>
          <Tab><Icon as={MdMonetizationOn} mr="1" />Rent</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {(tabIndex === 0) ? <Home id={id} coordinates={coordinates} tier={tier} /> : null}


          </TabPanel>
          <TabPanel>
            {(tabIndex === 1) ? <Pixels id={id} coordinates={coordinates} tier={tier} /> : null}

          </TabPanel>
          <TabPanel>
            {(tabIndex === 2) ? <Rent id={id} coordinates={coordinates} tier={tier} /> : null}
          </TabPanel>
        </TabPanels>
      </Tabs >
    </BlockContext.Provider>
  )
}

export default Sections;

