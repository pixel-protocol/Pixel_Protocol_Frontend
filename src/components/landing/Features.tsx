import { Text, VStack, Image, Box, Card, CardBody, Stack } from "@chakra-ui/react";

const Features = () => {
  return (
    <Box as="section" id="features" py={120} bg="black" color="white">
      <VStack spacing={10} maxW="container.lg" mx="auto" alignItems="center">
        <Text px={{ base: 2, sm: 0 }} fontSize={{ base: "xl", sm: "4xl" }} fontWeight={"bold"} textAlign={"center"}>features in the <Text as="span" color={"#f2a900"}>Pixel</Text> ecosytem</Text>

        <Stack spacing={5} direction={{ base: 'column', sm: 'row' }} px={{ base: 2, sm: 0 }}>
          {
            features.map((f, i) => {
              return (
                <FeatureCard key={i} name={f.name} image={f.image} description={f.description} />
              )
            })
          }
        </Stack>
      </VStack>
    </Box>)
}

const features = [
  { name: "The Homepage", image: "/images/hero_image_thehomepage_feature.jpg", description: "A decentralized canvas for public discourse using pixels. Own a piece of Web3 history today!" },
  { name: "Pixel Estate", image: "/images/hero_image_pixelestate_feature.jpg", description: "Real estate on The Homepage for passive income generation via renting out blocks and pixels." },
]

const FeatureCard = ({ name, image, description }: { name: string, image: string, description: string }) => {
  return (
    <Card
      overflow='hidden'
      bgGradient={"linear(to bottom right, black, gray.900)"}
      color="white"
      width="100%"
    >
      <Image
        objectFit='contain'
        width="100%"
        src={image}
        alt={name}
      />
      <CardBody>


        <Stack>
          <Text fontWeight={"bold"} fontSize={{ base: "xl", sm: "3xl" }}>{name}</Text>

          <Text py='2' color='gray.300'>
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card >
  )
}
export default Features;