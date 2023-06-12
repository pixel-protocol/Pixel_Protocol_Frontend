import React, { useContext } from 'react'
import { Button, Box } from '@chakra-ui/react'

import { RentPoolModalContext } from '@/components/sidebar/block/Sections'
import { RentPoolContext } from '@/components/sidebar/block/rent/PoolCreated'
import EditPoolModal from '@/components/sidebar/block/rent/EditPoolModal'

const EditPool = ({ id }: { id: number }) => {

  const { isOpen, onOpen, onClose } = useContext(RentPoolModalContext)
  const { poolAddress, baseFloorPrice, bidDuration, bidIncrement } = useContext(RentPoolContext)

  return (
    <Box width="100%">
      <Button width="100%" loadingText="Editing Pool..." colorScheme='purple' onClick={onOpen}>Edit Pool</Button>
      {isOpen && <EditPoolModal id={id} isModalOpen={isOpen} onModalClose={onClose} parameters={{ address: poolAddress, baseFloorPrice: baseFloorPrice, bidDuration: bidDuration, bidIncrement: bidIncrement }} />}
    </Box>
  )
}

export default EditPool