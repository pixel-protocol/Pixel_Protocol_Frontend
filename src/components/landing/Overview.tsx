import { Text, VStack, Image, Box, Stack, Spacer } from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';

const description1 = 'Pixel Protocol offers a unique opportunity to market your project or cause through "The Homepage," a decentralized canvas. Showcase your ideas, artwork, or messages to the wider Web3 community, building trust and generating publicity for your project.'
const description2 = "Join forces with others in your project or community to collectively purchase pixels on the canvas. By forming a bigger picture together, you strengthen your community bonds and create a visual representation of your shared vision or identity."
const description3 = "Monetize your pixels by renting them out to interested parties. This innovative feature allows you to generate passive income while facilitating dynamic content creation on the canvas. Renting out your space not only earns you income but also contributes to a vibrant and engaging ecosystem within Pixel Protocol."

const ValueProposition = () => {
  return (
    <Box as="section" id="overview" py={120} bg="black" color="white">
      <VStack spacing={10} id="value" maxW="container.lg" mx="auto" bg="black" alignContent="center" justifyContent="center" alignItems="center">
        <Text px={{ base: 2, sm: 0 }} fontSize={{ base: "xl", sm: "4xl" }} textAlign={"center"} fontWeight={"bold"}>a free and open <Text as="span" color={"#f2a900"}>pixel-based</Text> forum for you to...</Text>
        <Hero title="Market Your Content" image="/images/hero1.png" description={description1} />
        <HeroRight title="Build Your Community" image="/images/hero2.png" description={description2} />
        <Hero title="Earn Passive Income" image="/images/hero3.png" description={description3} />
      </VStack>
    </Box >
  )
}

const Hero = ({ title, image, description }: { title: string, image: string, description: string }) => {
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      bg="black"
      px={{ base: 2, sm: 0 }}
      width={{ base: "100%" }}
      spacing={{ base: 2, sm: 5 }}

    >
      <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: "47.5%" }}
        src={image}
        alt={title}
      />
      <Spacer />
      <Stack p={3} width={{ base: "100%", sm: "47.5%" }}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", sm: "3xl" }}>{title}</Text>

        <Text py='2' color='gray.300'>
          {description}
        </Text>
      </Stack>
    </Stack >)
}

const HeroRight = ({ title, image, description }: { title: string, image: string, description: string }) => {
  const isBigScreen = useBreakpointValue({ base: false, sm: true });

  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      bg="black"
      px={{ base: 2, sm: 0 }}
      width={{ base: "100%" }}
      spacing={{ base: 2, sm: 5 }}
    >
      {!isBigScreen && <Image
        objectFit='contain'
        src={image}
        alt={title}
      />}
      <Stack p={3} width={{ base: "100%", sm: "47.5%" }}>
        <Text fontWeight={"bold"} fontSize={{ base: "xl", sm: "3xl" }}>{title}</Text>

        <Text py='2' color='gray.300'>
          {description}
        </Text>
      </Stack>
      <Spacer />
      {isBigScreen && <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '47.5%' }}
        src={image}
        alt={title}
      />}

    </Stack>)
}

export default ValueProposition;