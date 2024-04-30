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

    // function registerPlayer(address player) public {
    //     players[msg.sender] = Player(0, 0, 0);
    // }

    // constructor() public {
    //     // Mint 100 tokens to msg.sender
    //     // Similar to how
    //     // 1 dollar = 100 cents
    //     // 1 token = 1 * (10 ** decimals)
    //     _mint(msg.sender, 1 * 10 ** 8);
    // }

    // function mint(address to, uint256 tokenID) public payable {
    //     require(to != address(0));
    //     _tokenOwner[tokenID] = to;
    //     _ownedTokensCount[to] = _ownedTokensCount[to].add(1);
    //     emit Transfer(address(0), to, tokenID);
    // }

    function updatePlayerBalance(address player, uint balance) public {
        players[player].playerBalance = balance;
        emit GuessMade(
            msg.sender,
            0,
            0,
            players[msg.sender].playerBalance,
            0,
            0,
            currentBetBalance
        );
    }

    uint randNonce = 0;
    function sendGuess(uint guess, uint betAmount) public {
        // require(
        //     betAmount <= players[msg.sender].playerBalance,
        //     "Bet amount must be less than the balance you have."
        // );
        // require(
        //     players[msg.sender].playerBalance > 0,
        //     "You have run out of funds to play with."
        // );
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
