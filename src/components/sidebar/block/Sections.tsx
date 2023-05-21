import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
import { MdHomeFilled, MdGridView, MdMonetizationOn } from 'react-icons/md'
import Home from '@/components/sidebar/block/Home'
import Pixels from '@/components/sidebar/block/Pixels'
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

import blockABI from '@/constant/abis/Block'
import pixelABI from '@/constant/abis/Pixel'
import { useStateCallback } from "../../../helper/hooks"

import LoadingSpinner from "@/components/LoadingSpinner"
import styled from 'styled-components'
import chainData from "@/constant/chain.json"

const Sections = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {

  const [tabIndex, setTabIndex] = useState(0)


  return (
    <Tabs onChange={(index) => setTabIndex(index)} variant='soft-rounded' colorScheme='purple'>
      <TabList>
        <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
        <Tab><Icon as={MdGridView} mr="1" />Pixels</Tab>
        <Tab isDisabled><Icon as={MdMonetizationOn} mr="1" />Rent</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {(tabIndex === 0) ? <Home id={id} coordinates={coordinates} tier={tier} /> : null}


        </TabPanel>
        <TabPanel>
          {(tabIndex === 1) ? <Pixels /> : null}

        </TabPanel>
        <TabPanel>
          <p>Hello World</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Sections;

