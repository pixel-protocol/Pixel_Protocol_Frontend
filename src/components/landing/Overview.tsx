import { Text, VStack, Image, Box, Stack, Spacer } from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';

const ValueProposition = () => {
  return (
    <Box as="section" id="overview" pt={45} bg="black" color="white">
      <VStack id="value" maxW="container.lg" mx="auto" bg="black" alignContent="center" justifyContent="center" alignItems="center">
        <Hero title="Market Your Content" image="/images/hero1.jpeg" description="Hero 1 Description" />
        <HeroRight title="Build Your Community" image="/images/hero2.jpeg" description="Hero 2 Description" />
        <Hero title="Earn Passive Income" image="/images/hero3.png" description="Hero 3 Description" />
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
      pt={20}
      color="white"
      width={{ base: "100%", lg: "80%" }}
    >
      <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: "45%" }}
        src={image}
        alt={title}
      />
      <Spacer />
      <Stack width={{ base: "100%", sm: "45%" }}>
        <Text fontSize="3xl">{title}</Text>

        <Text py='2' color='grey'>
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
      pt={20}
      color="white"
      width={{ base: "100%", lg: "80%" }}
      spacing={5}
    >
      {!isBigScreen && <Image
        objectFit='contain'
        src={image}
        alt={title}
      />}
      <Stack width={{ base: "100%", sm: "45%" }}>
        <Text fontSize="3xl">{title}</Text>

        <Text py='2' color='grey'>
          {description}
        </Text>
      </Stack>
      <Spacer />
      {isBigScreen && <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '45%' }}
        src={image}
        alt={title}
      />}

    </Stack>)
}

export default ValueProposition;