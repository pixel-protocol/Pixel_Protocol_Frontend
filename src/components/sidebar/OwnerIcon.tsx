import { Tooltip, Icon, Box, border } from "@chakra-ui/react"
import { MdPerson } from "react-icons/md"


export default function OwnerIcon() {
  return (
    <Box>
      <Tooltip label='You are Owner of this' fontSize='md'>
        <span>
          <Icon as={MdPerson} />
        </span>
      </Tooltip>
    </Box>)
} 