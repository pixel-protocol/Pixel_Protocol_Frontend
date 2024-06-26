import { Tooltip, Icon, Box, border, Button } from "@chakra-ui/react"
import { MdContentCopy } from "react-icons/md"
import React, { useState, useEffect, useRef } from "react";

export default function CopyButton({ target }: { target: string }) {

  const [isOpen, setIsOpen] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    navigator.clipboard.writeText(target)
      .then(() => {
        setIsOpen(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => { setIsOpen(false); console.log("done") }, 3000)
      })
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     const closeTimer = setTimeout(() => { setIsOpen(false); console.log("done") }, 3000)
  //     return () => clearTimeout(closeTimer)
  //   }
  // }, [isOpen])

  return (
    <Tooltip isOpen={isOpen} label="Copied!" bg="gray.500" placement="top" hasArrow={true} arrowPadding={0} gutter={0}>
      <Button minW={0} colorScheme='gray' p="0" m="0" borderRadius="full" size="sm" onClick={handleClick}>
        <Icon as={MdContentCopy} style={{ cursor: "pointer" }} />
      </Button>
    </Tooltip>)
}