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

