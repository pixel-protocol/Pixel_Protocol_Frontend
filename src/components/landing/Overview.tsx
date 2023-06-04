import { Text, VStack, Image, Box, Stack, Spacer } from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';

const description1 = "Promote your ads and showcase your art through our decentralized public space built for the Web3 community."
const description2 = "Strengthen your community by creating a presence on the protocol through collaborative efforts."
const description3 = "Earn passive income by renting out real estate on The Homepage to prospective tenants."

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