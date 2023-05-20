import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Icon } from '@chakra-ui/react'
import { MdHomeFilled, MdGridView, MdMonetizationOn, MdList } from 'react-icons/md'
import PixelCard from '@/components/sidebar/pixel/PixelCard'

const Sections = () => {


  return (
    <Tabs variant='soft-rounded' colorScheme='purple'>
      <TabList>
        <Tab><Icon as={MdHomeFilled} mr="1" />Home</Tab>
        <Tab isDisabled><Icon as={MdMonetizationOn} mr="1" />Rent</Tab>
        <Tab isDisabled><Icon as={MdList} mr="1" />Activity</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PixelCard />
        </TabPanel>
        <TabPanel>
          <p>placeholder</p>
        </TabPanel>
        <TabPanel>
          <p>placeholder</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Sections;

