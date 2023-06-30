import { Box, Flex, Text, Spacer, Button, Icon, VStack, HStack, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import LaunchAppButton from "@/components/landing/LaunchAppButton";

const FirstSection = () => {
  return (
    <Flex as="section" id="first" h="100vh" align="flex-end">
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
        <Text fontSize={["4xl", "5xl", "6xl"]} fontWeight="bold" color="white" padding="0px">Pixel Protocol</Text>

        <Text fontSize={["1xl", "2xl"]} color="white" padding="0px">
          A Web3 Renaissance of <Link href="http://www.milliondollarhomepage.com/" target="_blank"><Text as="span" color={"#f2a900"}>The Million Dollar Homepage <ExternalLinkIcon /></Text></Link>
        </Text>
        <Link href="/">
          <Box pr={2} mt={5}>
            <LaunchAppButton />
          </Box>

        </Link>
      </Box>
    </Flex >)
}

export default FirstSection;