import { Box, Flex, Text, Spacer, Button, Icon, VStack, HStack, Link } from "@chakra-ui/react";
import { FiArrowUpRight } from 'react-icons/fi'

const FirstSection = () => {
  return (
    <Flex id="first" h="100vh" align="flex-end" >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100vh"
        backgroundImage="url(/images/PixelProtocolBg.jpeg)" // Replace with the path or URL to your image
        backgroundSize="cover"
        backgroundPosition="center"
        filter="brightness(0.5)" // Adjust the brightness value as needed
        zIndex={-999}
      />
      <Box py={4} px={4} ml={[30, 30, 30, 40]} mb={5} bg="transparent">
        <Text fontSize="6xl" fontWeight="bold" color="white" padding="0px">Pixel Protocol</Text>

        <Text fontSize="2xl" color="white" padding="0px">
          Slogan: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Link href="/app">
          <Button colorScheme='purple' pr={2} borderRadius="full" mt={5} >
            Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
          </Button>
        </Link>
      </Box>
    </Flex >)
}

export default FirstSection;