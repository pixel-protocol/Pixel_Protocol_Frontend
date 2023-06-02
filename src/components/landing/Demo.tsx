import { Box, Text } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Box id="demo" bg=" black" color="white">
      < Box py={20} px={4} ml={[30, 30, 30, "10vw"]} >
        <Text fontSize="6xl">Mission</Text>
        <Text>blah blah blah</Text>
        <Text fontSize="6xl">Vision</Text>
        <Text>blah blah blah</Text>
      </Box >
    </Box >
  )
}

export default Demo;