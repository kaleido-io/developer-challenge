// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

// Declares a new contract
contract SimpleStorage {
    // Storage. Persists in between transactions
    uint256 _x;

    // Allows the unsigned integer stored to be changed
    function set(uint256 x) public {
        _x = x;
        emit Changed(msg.sender, _x);
    }

    // Returns the currently stored unsigned integer
    function get() public view returns (uint256 x) {
        return (_x);
    }

    event Changed(address indexed from, uint256 x);
}
