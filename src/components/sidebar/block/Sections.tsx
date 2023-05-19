import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
import { MdHomeFilled, MdGridView, MdMonetizationOn } from 'react-icons/md'
import Home from '@/components/sidebar/block/Home'
import Pixels from '@/components/sidebar/block/Pixels'

const Sections = () => {


  return (
    <Tabs variant='soft-rounded' colorScheme='purple'>
      <TabList>
        <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
        <Tab><Icon as={MdGridView} mr="1" />Pixels</Tab>
        <Tab isDisabled><Icon as={MdMonetizationOn} mr="1" />Rent</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Home />
        </TabPanel>
        <TabPanel>
          <Pixels />
        </TabPanel>
        <TabPanel>
          <p>Hello World</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Sections;

