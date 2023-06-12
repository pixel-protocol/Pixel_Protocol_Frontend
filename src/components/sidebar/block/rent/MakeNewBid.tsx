import React, { useState, useEffect, useContext } from 'react'
import {
  Icon,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup, Card, CardHeader, CardBody, CardFooter, Text, Grid, GridItem, Box, Link, Badge, Button, Image, useDisclosure, Alert, AlertIcon
} from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import MaticIcon from '@/components/icons/MaticIcon';
import PixelIcon from '@/components/icons/PixelIcon';
import BlockIcon from '@/components/icons/BlockIcon';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import chainData from "@/constant/chain.json"

import { Tier, Coordinates, ChainData } from '@/constant/types'
import { testnetChain } from '@/constant/constants';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { RentPoolModalContext } from '@/components/sidebar/block/Sections';
import MakeNewBidModal from '@/components/sidebar/block/rent/MakeNewBidModal';


const MakeNewBid = ({ id, bidPrice, isConnected, isValidChain, rentDuration }: { id: number, bidPrice: number, isConnected: boolean, isValidChain: boolean, rentDuration: number }) => {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()


  const { isOpen, onOpen, onClose } = useContext(RentPoolModalContext)

  const { openConnectModal } = useConnectModal();

  return (<>

    {(isConnected) ? (isValidChain) ?
      <Button loadingText="Making Bid..." colorScheme='purple' onClick={onOpen}>
        Make Bid
      </Button> : <><Alert status="error">
        <AlertIcon />
        <Text>Please switch network to make bid!</Text>

      </Alert>
        <Button disabled={!switchNetwork || chains[0].id === chain?.id} colorScheme='purple' onClick={() => switchNetwork?.(chains[0].id)}>Switch Network</Button>

      </> : <><Alert status="error">
        <AlertIcon />
        <Text>Please connect wallet to make bid!</Text>
      </Alert>

      <Button disabled={!openConnectModal || isConnected} colorScheme='purple' onClick={openConnectModal}>Connect Wallet</Button></>

    }
    {isOpen && (<MakeNewBidModal id={id} isModalOpen={isOpen} onModalClose={onClose} bidPrice={bidPrice} rentDuration={rentDuration} />)}
  </>
  )
}

export default MakeNewBid;