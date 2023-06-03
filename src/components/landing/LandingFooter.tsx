import { Box, Flex, Link, Spacer, Text, VStack, Avatar, Icon, chakra, Divider, HStack } from '@chakra-ui/react';
import { BsDiscord, BsFillEnvelopeFill } from 'react-icons/bs';
import { SiTwitter } from 'react-icons/si';


import { DISCORD_LINK, TWITTER_LINK, EMAIL_LINK } from '@/constant/constants';

const LandingFooter = () => {


  return (
    <chakra.footer>
      <Divider style={{ 'borderColor': 'black' }} />
      <Box bg="black" py={4} top={0} left={0} right={0} zIndex={999}>
        <Flex maxW="container.xl" mx="auto" alignItems="center" px={{ base: 2, sm: 0 }}
        >
          <Flex justifySelf="flex-start" align="center">

            <VStack align="left">
              <Text color="white">Connect with us</Text>
              <Box>
                <Link mx={2} href={TWITTER_LINK}>
                  <Icon as={SiTwitter} boxSize={{ base: 25, sm: 30 }} color="white" />
                </Link>
                <Link mx={2} href={DISCORD_LINK}>
                  <Icon as={BsDiscord} boxSize={{ base: 25, sm: 30 }} color="white" />
                </Link>
                <Link mx={2} href={EMAIL_LINK}>
                  <Icon as={BsFillEnvelopeFill} boxSize={{ base: 25, sm: 30 }} color="white" />
                </Link>
              </Box>
            </VStack>
          </Flex>
          <Spacer />
          <Flex justifySelf="flex-end" align="center">
            <VStack align="right">
              <Text color="white" align="right">Built with &hearts; by</Text>
              <HStack spacing={2}>
                <Link href="#">
                  <Avatar boxSize={{ base: 9, sm: 10 }} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link href="#">
                  <Avatar boxSize={{ base: 9, sm: 10 }} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link href="#">
                  <Avatar boxSize={{ base: 9, sm: 10 }} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link href="#">
                  <Avatar boxSize={{ base: 9, sm: 10 }} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </chakra.footer >
  )
}

export default LandingFooter;