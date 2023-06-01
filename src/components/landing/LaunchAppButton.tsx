import React from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { Button, Icon } from "@chakra-ui/react"

const LaunchAppButton = () => {
  return (
    <Button colorScheme='purple' borderRadius="full" >
      Launch App <Icon as={FiArrowUpRight} ml={1} boxSize="20px" />
    </Button>
  )
}

export default LaunchAppButton;