import { Text, Button, Icon, VStack, Image, Grid, Link, Box } from "@chakra-ui/react";
import { FiArrowUpRight } from 'react-icons/fi'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Spacer, SimpleGrid } from '@chakra-ui/react'

const Features = () => {
  return (
    <Box id="features" h="120vh" bg="black" color="white">
      <Box pt={20} px={4}>
        <SimpleGrid minChildWidth='lg' spacing='15px' width="80vw" ml={20}>
          <Box justifySelf="center">
            <Feature />
          </Box>
          <Box justifySelf="center">
            <Feature />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>)
}

const Feature = () => {
  return (
    <Card
      overflow='hidden'
      bg="gray.900"
      color="white"
      maxW='lg'
      py={10}
    >
      <CardBody>
        <Image
          objectFit='contain'
          maxW={{ base: '100%', sm: '400px' }}
          src="/images/logo.png"
          alt='Caffe Latte'
        />

        <Stack>
          <Text fontSize="3xl">The perfect latte</Text>

          <Text py='2' color='grey'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>

          <Link>Learn more</Link>
        </Stack>
      </CardBody>
    </Card >
  )
}

export default Features;