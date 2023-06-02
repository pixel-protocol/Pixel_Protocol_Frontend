import { Text, VStack, Image, Box, Card, CardBody, Stack } from "@chakra-ui/react";

const Features = () => {
  return (
    <Box id="features" py={45} bg="black" color="white">
      <VStack spacing={5} maxW="container.lg" mx="auto" alignItems="center">
        <Stack spacing={5} direction={{ base: 'column', sm: 'row' }}>
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
      bg="gray.900"
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
          <Text fontSize="3xl">{name}</Text>

          <Text py='2' color='grey'>
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card >
  )
}
export default Features;