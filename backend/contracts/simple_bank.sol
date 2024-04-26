// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.10;

// import "hardhat/console.sol";

// Declares a new contract
contract SimpleBank {
    address private user;

    struct User {
        uint idx;
        address name;
        uint256 bet;
        uint256 diceNum;
    }

    // mapping(address => bool) private _owners;
    mapping(address => User) private users;
    mapping(uint => uint) private userDice;
    uint public numOfPlayers;
    uint [] winners;
    // mapping(address => uint) private played;

    uint winningNumber;

    uint currentBalance;

    function placeBet(uint256 betAmount, uint256 number) external payable {
        require(numOfPlayers <= 4, "Max 4 players can play this game");
        require(currentBalance > 100, "Game can't start until Balance is at least 100");
        require(betAmount > 0, "You must bet more than 0");
        // require(played[msg.sender] < 4, "You have played the max times for the day!");
        // require(betAmount <= currentBalance, "You cannot bet more than current balance!");
        currentBalance += betAmount;

        if (users[msg.sender].bet == 0) {
            numOfPlayers++;
            users[msg.sender] = User(numOfPlayers, msg.sender, betAmount, number);
            userDice[numOfPlayers] = number;
        } else {
            users[msg.sender].bet += betAmount;
            userDice[users[msg.sender].idx] = number;
            // User(users[msg.sender].idx, msg.sender, users[msg.sender].bet+betAmount, number);
        }

        if (currentBalance >= 100) {
            uint randNonce = 0;
            // increase nonce
            randNonce++;
            winningNumber = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce))) % 6;
            for (uint i = 0; i < numOfPlayers; i++) {
                if (userDice[i] == winningNumber) {
                    winners.push(users[i]);
                } else {
                    users[i].bet = 0;
                }
            }
            // User[] memory ret = new User[](numOfPlayers);
            // for (uint i = 0; i < numOfPlayers; i++) {
            //     ret[i] = [i];
            // }
            // return ret;

            for (uint j = 0; j < winners.length; j++) {
                user[winners[j].name].bet = currentBalance/winners.length;
            }
        }
    }

    // function sendViaCall(address payable to, uint256 amount) public payable {
    //     (bool sent,) = to.call{value: amount}(""); // Returns false on failure
    //     if (sent == true) {
    //         require(sent, "Ether has been sent");
    //     }
    //     require(sent, "Failed to send Ether");
    // }

    // // required owner of the contract
    // modifier isOwner() {
    //     require(msg.sender == user, "You don't have access to these funds!");
    //     _;
    // }

    // // required to be valid either contract owner or enabled owner of shared wallet
    // modifier validOwner() {
    //     require(msg.sender == _owner || _owners[msg.sender], "Not contract owner or owners of shared wallet");
    //     _;
    // }

    // constructor() {
    //     user = msg.sender;
    // }

    // function getOwner() public view returns (address b) {
    //     return (user);
    // }\

    // // add an owner of shared wallet
    // function addOwner(address owner) public isOwner {
    //     // _owners[owner] = true;
    // }

    // // remove an owner from the wallet. false means disabled
    // function removeOwner(address owner)
    //     isOwner
    //     public {
    //     _owners[owner] = false;   
    // }

    // uint256 _balance;

    // // Allows the user to deposit
    // function deposit(uint256 amount) external payable {
    //     require(amount > 0, "You must deposit more than 0");
    //     require(amount < 0, "You must deposit more than 0");
    //     user[userIndex++] = User(msg.sender, user[userIndex].balance+amount);
    //     // _x = balance() + msg.value;
    //     // emit Changed(msg.sender, _balance);
    // }

    // // Allows the user to withdraw
    // function withdraw(uint256 amount) public {
    //     // console.log(_balance, amount);
    //     // require(_balance < amount, "You don't have enough money to withdraw");
    //     _balance -= amount;
    //     emit Changed(msg.sender, _balance);
    // }

    // // Returns the current balance
    // function balance() public view returns (uint b) {
    //     return (currentBalance);
    // }
    function balance() public view returns (User[] memory) {
        User[] memory ret = new User[](numOfPlayers);
        for (uint i = 0; i < numOfPlayers; i++) {
            ret[i] = [i];
        }
        return ret;
    }

    event TransferFunds(address indexed from, address indexed to, uint256 a);
    event Changed(address indexed from, uint256 b);
}