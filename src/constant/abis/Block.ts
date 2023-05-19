const blockABI = [
  "constructor(address)",
  "event Approval(address indexed,address indexed,uint256 indexed)",
  "event ApprovalForAll(address indexed,address indexed,bool)",
  "event Mint(address indexed,uint256,uint256[],uint24[])",
  "event OwnershipTransferred(address indexed,address indexed)",
  "event Transfer(address indexed,address indexed,uint256 indexed)",
  "function approve(address,uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function costPerPixel(uint256) pure returns (uint256)",
  "function exists(uint256) view returns (bool)",
  "function getApproved(uint256) view returns (address)",
  "function getId(uint256,uint256) pure returns (uint256)",
  "function getPixelColors(uint256) view returns (uint24[])",
  "function getPixelIds(uint256) view returns (uint256[])",
  "function getPixelOwners(uint256) view returns (address[])",
  "function getXY(uint256) pure returns (uint256, uint256)",
  "function isApprovedForAll(address,address) view returns (bool)",
  "function mint(uint256,uint24[]) payable",
  "function name() view returns (string)",
  "function owner() view returns (address)",
  "function ownerOf(uint256) view returns (address)",
  "function renounceOwnership()",
  "function safeTransferFrom(address,address,uint256)",
  "function safeTransferFrom(address,address,uint256,bytes)",
  "function setApprovalForAll(address,bool)",
  "function supportsInterface(bytes4) view returns (bool)",
  "function symbol() view returns (string)",
  "function tier(uint256) pure returns (uint256)",
  "function tokenByIndex(uint256) view returns (uint256)",
  "function tokenOfOwnerByIndex(address,uint256) view returns (uint256)",
  "function tokenURI(uint256) view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transferFrom(address,address,uint256)",
  "function transferOwnership(address)",
  "function withdraw()"
]

export default blockABI