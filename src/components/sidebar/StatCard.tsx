import React from 'react'
import { Card, CardBody, Stat, StatNumber, StatHelpText, StatLabel } from "@chakra-ui/react"


const StatCard = () => {

  return (
    <Card>
      <CardBody p="3">
        <Stat>
          <StatLabel color="purple">Fair Value per Pixel</StatLabel>
          <StatNumber>0.01 MATIC</StatNumber>
          <StatHelpText>$1.22</StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  )
}