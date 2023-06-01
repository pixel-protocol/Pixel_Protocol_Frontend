import Navbar from '@/components/landing/Navbar'
import FirstSection from '@/components/landing/FirstSection'
import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Demo from '@/components/landing/Demo';
import Overview from '@/components/landing/Overview';
import Features from '@/components/landing/Features';
import LandingFooter from '@/components/landing/LandingFooter';
import BackToTopButton from '@/components/landing/BackToTopButton';

const Landing: NextPage = () => {
  return (<>
    <Navbar />
    <FirstSection />
    <Overview />
    <Demo />
    <Features />
    <LandingFooter />
    <BackToTopButton />
  </>);
}

const FullHeightBox = () => {
  return <Box h="100vh" bg="black">

  </Box>;
};

export default Landing;