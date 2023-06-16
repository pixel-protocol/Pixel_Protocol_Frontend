import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
import { MdHomeFilled, MdGridView, MdMonetizationOn, MdList } from 'react-icons/md'
import Home from '@/components/sidebar/pixel/Home'
import { Coordinates, Tier } from '@/constant/types'

const Sections = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Tabs onChange={(index) => setTabIndex(index)} variant='soft-rounded' colorScheme='purple' >
      <TabList>
        <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
        <Tab isDisabled><Icon as={MdMonetizationOn} mr="1" />Draw</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {(tabIndex === 0) ? <Home id={id} coordinates={coordinates} tier={tier} /> : null}

        </TabPanel>
        <TabPanel>
          {(tabIndex === 1) ? <p>placeholder</p> : null}

        </TabPanel>
        <TabPanel>
          <p>placeholder</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Sections;

