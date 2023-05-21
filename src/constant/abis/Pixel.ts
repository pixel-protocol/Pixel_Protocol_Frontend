const pixelABI = [
  "constructor()",
  "event ApprovalForAll(address indexed,address indexed,bool)",
  "event ColorChange(address indexed,uint256[],uint24[])",
  "event OwnershipTransferred(address indexed,address indexed)",
  "event TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
  "event TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
  "event URI(string,uint256 indexed)",
  "function balanceOf(address,uint256) view returns (uint256)",
  "function balanceOfBatch(address[],uint256[]) view returns (uint256[])",
  "function blockContract() view returns (address)",
  "function color(uint256) view returns (uint24)",
  "function exists(uint256) view returns (bool)",
  "function fairValue(uint256) view returns (uint256)",
  "function getBlockId(uint256) view returns (uint256)",
  "function getCanvasRow(uint256) view returns (uint24[])",
  "function getId(uint256,uint256) pure returns (uint256)",
  "function getXY(uint256) pure returns (uint256, uint256)",
  "function isApprovedForAll(address,address) view returns (bool)",
  "function mint(uint24[],uint256[],address)",
  "function owner() view returns (address)",
  "function pixelOwner(uint256) view returns (address)",
  "function pixelXYtoBlockXY(uint256,uint256) pure returns (uint256, uint256)",
  "function renounceOwnership()",
  "function safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)",
  "function safeTransferFrom(address,address,uint256,uint256,bytes)",
  "function setApprovalForAll(address,bool)",
  "function setBlockContract(address)",
  "function supportsInterface(bytes4) view returns (bool)",
  "function transferOwnership(address)",
  "function transform(uint24[],uint256[])",
  "function transform(uint24,uint256)",
  "function uri(uint256) view returns (string)",
  "function withdraw()"
]

export default pixelABI