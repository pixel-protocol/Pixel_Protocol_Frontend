import Navbar from '@/components/landing/Navbar'
import FirstSection from '@/components/landing/FirstSection'
import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Demo from '@/components/landing/Demo';
import Overview from '@/components/landing/Overview';
import Features from '@/components/landing/Features';
import LandingFooter from '@/components/landing/LandingFooter';
import BackToTopButton from '@/components/landing/BackToTopButton';
import { Global, css } from "@emotion/react";

const Landing: NextPage = () => {
  return (<>
    <Global
      styles={css`
          html {
            ${hideScrollbarStyle}
          },
        `}
    />
    <Navbar />
    <FirstSection />
    <Overview />
    <Demo />
    <Features />
    <LandingFooter />
    <BackToTopButton />
  </>);
}

const hideScrollbarStyle = css`
  /* Hide scrollbar for modern browsers */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Landing;