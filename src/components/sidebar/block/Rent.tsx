import React, { useState, useEffect } from "react"
import { Coordinates, Tier, ChainData } from "@/constant/types"
import chainData from "@/constant/chain.json"
import { useNetwork, useAccount, useContractReads } from "wagmi"
import { testnetChain } from "@/constant/constants"

import PoolNotCreated from "@/components/sidebar/block/rent/PoolNotCreated"
import PoolCreated from "@/components/sidebar/block/rent/PoolCreated"
import { zeroAddress } from "viem"

import rentFactoryABI from "@/constant/abis/RentFactory"

const Rent = ({ id, coordinates, tier }: { id: number, coordinates: Coordinates, tier: Tier }) => {
  const cData: ChainData = chainData;
  const { chain, chains } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const rentFactoryAddress = cData[testnetChain]["contractAddresses"][5]

  const [poolAddress, setPoolAddress] = useState<`0x${string}`>(zeroAddress)

  const rentFactoryContract = {
    address: rentFactoryAddress,
    abi: rentFactoryABI,
  }

  const readConfig = {
    watch: true,
    staleTime: 5_000
  }


  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...rentFactoryContract,
        functionName: 'getPoolAddress',
        args: [BigInt(id)],
      },

    ],
    onSuccess(data) {
      const [poolAddress] = data
      setPoolAddress(poolAddress.result ? poolAddress.result as `0x${string}` : zeroAddress)
    },
    onError(err) {
      setPoolAddress(zeroAddress)
      console.log(err)
    },

  })

  /* get owners of blocks */

  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    refetch()
  }, [])

  return ((poolAddress === zeroAddress) ? <PoolNotCreated id={id} coordinates={coordinates} tier={tier} /> : <PoolCreated id={id} coordinates={coordinates} tier={tier} />)
}

export default Rent