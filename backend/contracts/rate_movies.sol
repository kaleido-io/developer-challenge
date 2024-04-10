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
    // TransactionInfo transInfo;

    mapping (bytes32 => MovieRating[]) public transactions; // "user email address": [{movieTitle: "a", movieRating: 3}]

    function setMovieRating(bytes32 userId, MovieRating memory ratingInfo) public {        
        // transInfo.userId = userId;
        // transInfo.rating = ratingInfo;

        // add to transactions[userId] -> movie ratings for that particular user
        transactions[userId].push(MovieRating(ratingInfo.movieTitle, ratingInfo.movieRating));
        
        emit UserInfo(msg.sender, userId);
        emit RatingInfo(msg.sender, ratingInfo);
    }

    // Returns array of ratings for given user
    function getMovieRatings(bytes32 userId) public view returns (MovieRating[] memory) {
        return transactions[userId];
    }

    event UserInfo(address indexed from, bytes32 userId);
    event RatingInfo(address indexed from, MovieRating ratingInfo);
}