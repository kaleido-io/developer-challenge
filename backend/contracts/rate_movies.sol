// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

struct UserMovieInfo {
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
    UserMovieInfo info;

    // Allows the unsigned integer stored to be changed
    function set(UserMovieInfo memory _userInfo) public {
        // TODO: need to call get and iterate to see if user email address already has a transaction
        info = _userInfo;
        emit Changed(msg.sender, info);
    }

    // Returns the currently stored unsigned integer
    function get() public view returns (UserMovieInfo memory) {
        return info;
    }

    event Changed(address indexed from, UserMovieInfo userInfo);
}