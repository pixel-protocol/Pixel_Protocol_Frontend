import { Box, Text, VStack, AspectRatio, Center } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Box as="section" id="demo" bg=" black" color="white" py={120}>
      <Box maxW="container.lg" mx="auto">
        <Center ><Text px={{ base: 2, sm: 0 }} fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="bold" >watch our demo!</Text></Center>
        <Center pb={10}><Text px={{ base: 2, sm: 0 }} textAlign={"center"} color={"gray.300"} fontWeight={"light"} fontSize="lg">A 3-minute video demonstrates the key features of Pixel Protocol</Text></Center>
        <AspectRatio maxW='560px' ratio={16 / 9} style={{ margin: "0 auto" }}>
          <iframe src="https://www.youtube.com/embed/YRnKv-9Ea_U" title="Pixel Protocol Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </AspectRatio>
      </Box>

    </Box >
  )
}

export default Demo;