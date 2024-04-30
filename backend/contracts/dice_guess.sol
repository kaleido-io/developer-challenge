// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

contract DiceGuess {
    struct Player {
        // uint idx;
        // address name;
        uint guess;
        uint betAmount;
        uint balance;
    }

    mapping(address => Player) private players;
    uint public numOfPlayers;

    uint currentBetBalance;

    uint randNonce = 0;
    function sendGuess(uint guess, uint betAmount) public {
        if (players[msg.sender].balance > 0) {
            players[msg.sender].balance -= betAmount;
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
            dice1,
            dice2,
            currentBetBalance,
            players[msg.sender].balance
        );
    }

    function transferMoneyToWinner(uint amount) public {
        require(amount == currentBetBalance);
        players[msg.sender].balance += amount;
        players[msg.sender].betAmount = 0;
        currentBetBalance = 0;
        emit BalanceTransferred(msg.sender, players[msg.sender].balance);
    }

    // function getPlayer(address player) public view returns (Player[] memory) {
    //     Player[] memory ret = new Player[](numOfPlayers);
    //     for (uint i = 0; i < numOfPlayers; i++) {

    //     }
    //     return ret;
    //     // return players[msg.sender];
    // }

    event GuessMade(
        address indexed from,
        uint guess,
        uint playerBet,
        uint dice1,
        uint dice2,
        uint betBalance,
        uint balance
    );

    event BalanceTransferred(address indexed from, uint256 balance);
}
