import { Box, Flex, Link, Spacer, Text } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi'
import { SiTwitter } from 'react-icons/si';

import { Button, HStack, chakra, Icon } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import Image from 'next/image';

import LaunchAppButton from '@/components/landing/LaunchAppButton';

const Navbar = () => {

  const DISCORD_LINK = "#"
  const TWITTER_LINK = "https://twitter.com/0xPixelProtocol"

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <chakra.header id="header">
      <Box bg={isScrolled ? "black" : "transparent"} py={3} position="fixed" top={0} left={0} right={0} zIndex={999}>
        <Flex maxW="container.xl" mx="auto" alignItems="center">
          <Image src="/images/logo.png" alt="pixelprotocol" width={40} height={40} />
          <Flex ml={5} as="nav" >
            <ScrollLink
              to="first"
              smooth={true}
              duration={500}
              mx={2}
            >
              <Button variant="ghost" _hover={{ bg: 'purple.600' }} borderRadius="full" color="white">Home</Button>
            </ScrollLink>
            <ScrollLink
              to="value"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button variant="ghost" _hover={{ bg: 'purple.600' }} borderRadius="full" color="white">Overview</Button>
            </ScrollLink>
            <ScrollLink
              to="overview"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button variant="ghost" _hover={{ bg: 'purple.600' }} borderRadius="full" color="white">Demo</Button>
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button variant="ghost" _hover={{ bg: 'purple.600' }} borderRadius="full" color="white">Features</Button>
            </ScrollLink>
          </Flex>
          <Spacer />
          <Flex justifySelf="flex-end" align="center">
            <Link mx={2} href={TWITTER_LINK} target="_blank">
              <Icon as={SiTwitter} boxSize={30} color="white" />
            </Link>
            <Link mx={2} href={DISCORD_LINK} target="_blank">
              <Icon as={BsDiscord} boxSize={30} color="white" />
            </Link>
            <Link mx={2} href="/app">
              <Box pr={2}>
                <LaunchAppButton />
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </chakra.header >
  );
};

const LinkButton = () => {

}

export default Navbar;