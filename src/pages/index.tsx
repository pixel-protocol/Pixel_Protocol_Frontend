import Navbar from '@/components/landing/Navbar'
import FirstSection from '@/components/landing/FirstSection'
import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import ValueProposition from '@/components/landing/ValueProposition';
import Overview from '@/components/landing/Overview';
import Features from '@/components/landing/Features';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing: NextPage = () => {
  return (<>
    <Navbar />
    <FirstSection />
    <ValueProposition />
    <Overview />
    <Features />
    <LandingFooter />
  </>);
}

const FullHeightBox = () => {
  return <Box h="100vh" bg="black">

  </Box>;
};

export default Landing;