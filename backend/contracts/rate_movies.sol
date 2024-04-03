// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

struct UserInfo {
   string emailAddress;
   MovieRating[] ratings;
}

struct MovieRating {
    string movieTitle;
    string movieRating;
}

// Declares a new contract
contract SimpleStorage {
    // Storage. Persists in between transactions
    // uint256 x;
    UserInfo info;

    // Allows the unsigned integer stored to be changed
    function set(UserInfo memory _userInfo) public {
        // TODO: need to call get and iterate to see if user email address already has a transaction
        info = _userInfo;
        emit Changed(msg.sender, info);
    }

    // Returns the currently stored unsigned integer
    function get() public view returns (UserInfo memory) {
        return info;
    }

    event Changed(address indexed from, UserInfo userInfo);
}