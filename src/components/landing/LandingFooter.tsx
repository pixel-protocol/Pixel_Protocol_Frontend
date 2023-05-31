import { Box, Flex, Link, Spacer, Text, VStack, Avatar, Icon, chakra, Divider } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';
import { SiTwitter } from 'react-icons/si';

const LandingFooter = () => {
  const DISCORD_LINK = "#"
  const TWITTER_LINK = "#"

  return (
    <chakra.footer>
      <Divider style={{ 'borderColor': 'black' }} />
      <Box bg="black" py={4} top={0} left={0} right={0} zIndex={999}>
        <Flex maxW="container.lg" mx="auto" alignItems="center">
          <VStack align="left">
            <Text color="white">Connect with us</Text>
            <Box>
              <Link mx={2} href={TWITTER_LINK}>
                <Icon as={SiTwitter} boxSize={30} color="white" />
              </Link>
              <Link mx={2} href={DISCORD_LINK}>
                <Icon as={BsDiscord} boxSize={30} color="white" />
              </Link>
            </Box>
          </VStack>

          <Spacer />
          <Flex justifySelf="flex-end" align="center">
            <VStack align="right">
              <Text color="white" align="right">The team that built it</Text>
              <Box>
                <Link mx={2} href="#">
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link mx={2} href="#">
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link mx={2} href="#">
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
                <Link mx={2} href="#">
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Link>
              </Box>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </chakra.footer>
  )
}

export default LandingFooter;