import { Box, Flex, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi'
import { SiTwitter } from 'react-icons/si';
import { IoMdMenu } from 'react-icons/io';

import {
  Button, HStack, chakra, Icon, Image, useDisclosure,
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter,
  DrawerHeader, DrawerOverlay
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from "react";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import { DISCORD_LINK, TWITTER_LINK } from '@/constant/constants';

import LaunchAppButton from '@/components/landing/LaunchAppButton';

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

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
          <Box pl={2}>
            <Image src="/images/logo.png" alt="pixelprotocol" height="40px" />
          </Box>
          <Flex ml={5} as="nav" display={{ base: "none", md: "flex" }}>
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
              to="demo"
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
          <Flex justifySelf="flex-end" align="center" display={{ base: "none", md: "flex" }}>
            <Link mx={2} href={TWITTER_LINK} target="_blank">
              <Icon as={SiTwitter} boxSize={30} color="white" />
            </Link>
            <Link mx={2} href={DISCORD_LINK} target="_blank">
              <Icon as={BsDiscord} boxSize={30} color="white" />
            </Link>

          </Flex>
          <Link ml={2} href="/app">
            <Box display={{ base: "none", sm: "block" }}>
              <LaunchAppButton />
            </Box>
          </Link>
          <Button ref={btnRef} onClick={onOpen} display={{ md: "none" }} colorScheme='blackAlpha'>
            <IoMdMenu size="26px" />
          </Button>
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="gray.900">
          <DrawerHeader color="white">Pixel Protocol</DrawerHeader>

          <VStack align="left" spacing={0}>
            <ScrollLink
              to="first"
              smooth={true}
              duration={500}
              mx={2}
            >
              <Button _hover={{ bg: 'purple.600' }} colorScheme="blackAlpha"
                width="100%" borderRadius="none" justifyContent="left"
                onClick={onClose}>Home</Button>
            </ScrollLink>
            <ScrollLink
              to="value"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button _hover={{ bg: 'purple.600' }} colorScheme="blackAlpha"
                width="100%" borderRadius="none" justifyContent="left" pt={0}
                onClick={onClose}>Overview</Button>
            </ScrollLink>
            <ScrollLink
              to="demo"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button _hover={{ bg: 'purple.600' }} colorScheme="blackAlpha"
                width="100%" borderRadius="none" justifyContent="left"
                onClick={onClose}>Demo</Button>
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-20}
              mx={2}
            >
              <Button _hover={{ bg: 'purple.600' }} colorScheme="blackAlpha"
                width="100%" borderRadius="none" justifyContent="left"
                onClick={onClose}>Features</Button>
            </ScrollLink>
            <Text color="white" pt={3} pl={4}>Connect with us</Text>
            <Box pt={3} pl={3}>
              <Link mx={2} href={TWITTER_LINK} target="_blank">
                <Icon as={SiTwitter} boxSize={30} color="white" />
              </Link>
              <Link mx={2} href={DISCORD_LINK} target="_blank">
                <Icon as={BsDiscord} boxSize={30} color="white" />
              </Link>
            </Box>
          </VStack>
          <Box pt={3} pl={2}>
            <LaunchAppButton />
          </Box>
        </DrawerContent>
      </Drawer>
    </chakra.header >
  );
};

const LinkButton = () => {

}

export default Navbar;