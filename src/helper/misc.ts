import { Tier } from "@/constant/types";


export const getColorForTier = (tier: Tier | null) => {
  switch (tier) {
    case "Bronze":
      return "orange.600";
    case "Silver":
      return "gray.400";
    case "Gold":
      return "yellow.400";
    default:
      return "gray.500";
  }
}

export const truncateAddress = (address: `0x${string}`) => {
  return address.slice(0, 5) + '...' + address.slice(-4)
}