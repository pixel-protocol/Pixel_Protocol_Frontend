import { Box, Flex, Text, Spacer, Button, Icon, VStack, HStack } from "@chakra-ui/react";
import { FiArrowUpRight } from 'react-icons/fi'

const FirstSection = () => {
  return (
    <Flex id="first" h="100vh" align="flex-end" bg="url(/images/AdobeStock_597038909.jpeg)" bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat">
      <Box py={4} px={4} ml={[30, 30, 30, 40]} mb={5}>
        <Text fontSize="6xl" fontWeight="bold" color="white" padding="0px">Pixel Protocol</Text>

        <Text fontSize="2xl" color="white" padding="0px">
          Slogan: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Button colorScheme='purple' pr={2} borderRadius="full" mt={5} >
          Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
        </Button>
      </Box>
    </Flex >)
}

export default FirstSection;