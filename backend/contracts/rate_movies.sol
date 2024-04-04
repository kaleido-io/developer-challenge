// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

struct MovieRating {
    bytes32 movieTitle;
    bytes32 movieRating;
}

// Declares a new contract
contract UserMovieRating {
    // Storage. Persists in between transactions
    MovieRating[] ratings;

    // Allows the user movie info (array of ratings) stored to be changed
    function set(MovieRating[] memory ratingInfo) public {
        // ratings = ratingInfo; // memory to storage not yet supported error
        // for loop
        for (uint256 i = 0; i < ratingInfo.length; i++) {
            ratings.push(MovieRating(ratingInfo[i].movieTitle, ratingInfo[i].movieRating));
        }

        emit Changed(msg.sender, ratings);
    }

    // Returns the currently stored unsigned integer
    function get() public view returns (MovieRating[] memory) {
        // needed for transaction ID -> to make sure same user can't create multiple rating transactions.
        return ratings;
    }

    event Changed(address indexed from, MovieRating[] ratingInfo);
}