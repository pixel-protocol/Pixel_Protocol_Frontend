import { Text, Button, Icon, VStack, Image, Grid, Link } from "@chakra-ui/react";
import { FiArrowUpRight } from 'react-icons/fi'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Spacer } from '@chakra-ui/react'

const ValueProposition = () => {
  return (
    <VStack id="value" width="100%" bg="black" alignContent="center" justifyContent="center" alignItems="center">
      <Hero />
      <HeroRight />
      <Hero />
    </VStack>
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

const Hero = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='unstyled'
      bg="black"
      py={20}
      color="white"
    >
      <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '300px' }}
        src="/images/logo.png"
        alt='Caffe Latte'
      />

      <Stack pl="50px">
        <CardBody pt="40px">
          <Text fontSize="3xl">The perfect latte</Text>

          <Text py='2' color='grey'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
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

const HeroRight = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='unstyled'
      bg="black"
      py={20}
      color="white"
    >

      <Stack pr="50px">
        <CardBody pt="40px">
          <Text fontSize="3xl">The perfect latte</Text>

          <Text py='2' color='grey'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>

        <CardFooter pb="40px">
          <Button colorScheme='purple' pr={2} borderRadius="full">
            Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
          </Button>
        </CardFooter>
      </Stack>

      <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '300px' }}
        src="/images/logo.png"
        alt='Caffe Latte'
      />

    </Card>)
}

export default ValueProposition;