// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Token standards are a critical part of the Ethereum ecosystem. This is a sample of an ERC-721 token.
// View the OpenZeppelin docs to determine if tokens fit in your use case, and which standard to use: https://docs.openzeppelin.com/contracts/2.x/tokens

contract Token is ERC721, Ownable {
    constructor() ERC721("Token", "TKN") Ownable(msg.sender)  {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}