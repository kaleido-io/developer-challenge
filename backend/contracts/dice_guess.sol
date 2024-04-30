// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

contract DiceGuess {
    struct Player {
        uint guess;
        uint betAmount;
        uint playerBalance;
    }

    mapping(address => Player) private players;

    uint public numOfPlayers;

    uint currentBetBalance;

    uint randNonce = 0;
    function sendGuess(uint guess, uint betAmount) public {
        if (players[msg.sender].playerBalance > 0) {
            players[msg.sender].playerBalance -= betAmount;
        } else {
            players[msg.sender] = Player(
                guess,
                players[msg.sender].betAmount + betAmount,
                0
            );
            numOfPlayers++;
        }

        currentBetBalance += betAmount;

        randNonce++;
        uint dice1 = (uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        ) % 6) + 1;
        uint dice2 = (uint(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, randNonce + 1)
            )
        ) % 6) + 1;

        emit GuessMade(
            msg.sender,
            guess,
            betAmount,
            players[msg.sender].playerBalance,
            dice1,
            dice2,
            currentBetBalance
        );
    }

    function transferMoneyToWinner(uint amount) public {
        require(amount == currentBetBalance);
        players[msg.sender].betAmount = 0;
        players[msg.sender].playerBalance += amount;
        currentBetBalance = 0;
        emit BalanceTransferred(msg.sender, players[msg.sender].playerBalance);
    }

    event GuessMade(
        address indexed from,
        uint guess,
        uint playerBet,
        uint playerBalance,
        uint dice1,
        uint dice2,
        uint currentBetBalance
    );

    event BalanceTransferred(address indexed from, uint256 playerBalance);
}
