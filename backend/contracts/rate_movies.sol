// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.5;

struct MovieRating {
    bytes32 movieTitle;
    uint256 movieRating;
}

struct TransactionInfo {
    bytes32 userId;
    MovieRating rating;
}

// Declares a new contract
contract UserMovieRating {
    // Storage. Persists in between transactions
    // MovieRating[] ratings;
    TransactionInfo transInfo;

    mapping (bytes32 => MovieRating[]) public transactions; // "str": [{movieTitle: "a", movieRating: 3}]

    function setMovieRating(bytes32 userId, MovieRating memory ratingInfo) public {
        // ratings = ratingInfo; // memory to storage not yet supported error
        // for loop
        // for (uint256 i = 0; i < ratingInfo.length; i++) {
        //     // ratings.push(MovieRating(ratingInfo[i].movieTitle, ratingInfo[i].movieRating));
        //     transactions[userId].push(MovieRating(ratingInfo[i].movieTitle, ratingInfo[i].movieRating));
        // }

        
        transInfo.userId = userId;
        transInfo.rating = ratingInfo;

        // add to transactions[userId] -> movie ratings for that particular user
        transactions[userId].push(MovieRating(ratingInfo.movieTitle, ratingInfo.movieRating));
        
        emit Changed(msg.sender, transInfo);
    }

    // Returns the currently stored unsigned integer
    function getMovieRatings(bytes32 userId) public view returns (MovieRating[] memory) {
        // grab movie ratings just for given userId.
        return transactions[userId]; // return movie ratings for given user
    }

    event Changed(address indexed from, TransactionInfo ratingInfo);
}