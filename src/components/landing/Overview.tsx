import { Box, Text } from "@chakra-ui/react"

const Overview = () => {
  return (
    <Box id="overview" h="100vh" bg="black" color="white">
      <Box py={20} px={4} ml={[30, 30, 30, 40]}>
        <Text fontSize="6xl">Mission</Text>
        <Text>blah blah blah</Text>
        <Text fontSize="6xl">Vision</Text>
        <Text>blah blah blah</Text>
      </Box>
    </Box>
  )
}

export default Overview;