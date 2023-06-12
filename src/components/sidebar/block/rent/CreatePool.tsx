import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'

import { RentPoolModalContext } from '@/components/sidebar/block/Sections'
import CreatePoolModal from '@/components/sidebar/block/rent/CreatePoolModal'

const CreatePool = ({ id }: { id: number }) => {

  const { isOpen, onOpen, onClose } = useContext(RentPoolModalContext)

  return (
    <>
      <Button loadingText="Creating Pool..." colorScheme='purple' onClick={onOpen}>Create Pool</Button>
      {isOpen && <CreatePoolModal id={id} isModalOpen={isOpen} onModalClose={onClose} />}
    </>
  )
}

export default CreatePool