import { Text, Button, Icon, VStack, Image, Box, Card, CardBody, CardFooter, Stack } from "@chakra-ui/react";
import { FiArrowUpRight } from 'react-icons/fi'
import { useBreakpointValue } from '@chakra-ui/media-query';

const ValueProposition = () => {
  return (
    <Box id="overview" pt={45} bg="black" color="white">
      <VStack id="value" maxW="container.lg" mx="auto" bg="black" alignContent="center" justifyContent="center" alignItems="center">
        <Hero title="Market Your Content" image="/images/hero1.jpeg" description="Hero 1 Description" />
        <Hero title="Build Your Community" image="/images/hero1.jpeg" description="Hero 2 Description" />
        <Hero title="Earn Passive Income" image="/images/hero3.jpeg" description="Hero 3 Description" />
      </VStack>
    </Box >
  )
}

// const Hero = () => {
//   return (
//     <Grid templateColumns="11fr 9fr" position="relative" width="60%" color="white" gap="50px" py={105} >
//       <Image src="/images/logo.png" maxH="40vh" />
//       <VStack align="flex-start" pt="30px">
//         <Text fontSize="3xl" pb="15px">ASJFAJ</Text>
//         <Text color="grey" pb="37px">asdasd</Text>
//         <Link mx={2} href="/app">
//           <Button colorScheme='purple' pr={2} borderRadius="full">
//             Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
//           </Button>
//         </Link>
//       </VStack>
//     </Grid>
//   )
// }

// const HeroRight = () => {
//   return (
//     <Grid templateColumns="9fr 11fr" position="relative" width="60%" color="white" gap="50px" py={10}>
//       <VStack align="flex-start" pt="30px">
//         <Text fontSize="3xl" pb="15px">ASJFAJ</Text>
//         <Text color="grey" pb="37px">asdasd</Text>
//         <Button colorScheme='purple' pr={2} borderRadius="full">
//           Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
//         </Button>
//       </VStack>
//       <Image src="/images/AdobeStock_597038909.jpeg" maxH="40vh" />
//     </Grid>
//   )
// }

const Hero = ({ title, image, description }: { title: string, image: string, description: string }) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='unstyled'
      bg="black"
      pt={20}
      color="white"
      width={{ base: "100%", lg: "80%" }}
    >
      <Image
        objectFit='contain'
        minW={{ md: "350px" }}
        maxW={{ base: '100%', sm: "45%", md: '400px' }}
        src={image}
        alt={title}
      />

      <Stack pl={["20px", "20px", "50px"]} maxW={400}>
        <CardBody pt="40px">
          <Text fontSize="3xl">{title}</Text>

          <Text py='2' color='grey'>
            {description}
          </Text>
        </CardBody>

        <CardFooter pb="40px">
          <Button colorScheme='purple' pr={2} borderRadius="full">
            Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
          </Button>
        </CardFooter>
      </Stack>
    </Card >)
}

const HeroRight = ({ title, image, description }: { title: string, image: string, description: string }) => {
  const isBigScreen = useBreakpointValue({ base: false, sm: true });

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='unstyled'
      bg="black"
      pt={20}
      color="white"
    >
      {!isBigScreen && <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '250px', md: '400px' }}
        src={image}
        alt={title}
      />}
      <Stack pr={{ sm: '50px' }} pl={{ base: '50px', sm: '0px' }}>
        <CardBody pt="40px">
          <Text fontSize="3xl">{title}</Text>

          <Text py='2' color='grey'>
            {description}
          </Text>
        </CardBody>

        <CardFooter pb="40px">
          <Button colorScheme='purple' pr={2} borderRadius="full">
            Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
          </Button>
        </CardFooter>
      </Stack>

      {isBigScreen && <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '250px', md: '400px' }}
        src={image}
        alt={title}
      />}

    </Card>)
}

export default ValueProposition;