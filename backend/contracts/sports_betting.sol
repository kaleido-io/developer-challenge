// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;
import '@openzeppelin/contracts/utils/Context.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SportsBetting is Context, Ownable, ERC20 {
    uint public betCount = 1;

    constructor(string memory name, string memory symbol) Ownable(msg.sender) ERC20(name, symbol) {}

    struct Game {
        uint id;
        uint awayTeamId;
        uint homeTeamId;
        int awayMoneyLine;
        int homeMoneyLine;
        uint awayScore;
        uint homeScore;
        bool started;
        bool finished;
    }
    
    struct Bet {
        uint id;
        address user;
        uint gameId;
        uint teamId;
        uint amount;
        bool paid;
    }

    mapping(uint => Game) public games;
    mapping(uint => Bet) public bets;
    mapping(uint => uint[]) public gameBets;

    event GameAdded(string eventName, uint indexed gameId);
    event GameStarted(string eventName, uint indexed gameId);
    event GameFinished(string eventName, uint indexed gameId);
    event TokenAllowance(string eventName, address indexed user, address indexed spender, uint amount);
    event TokenName(string eventName, string name);
    event TokenSymbol(string eventName, string symbol);
    event TokenBalance(string eventName, address indexed user, string name, string symbol, uint256 balance);
    event TokenSupply(string eventName, string name, string symbol, uint256 totalSupply);
    event BetPlaced(string eventName, address indexed user, uint betId, uint indexed gameId, uint indexed teamId, uint amount);
    event BetLost(string eventName, uint indexed betId, address indexed user);
    event BetWon(string eventName, uint indexed betId, address indexed user, uint payoutAmount);

    function transferFundsToContract() external payable onlyOwner {
        // No additional logic needed, the onlyOwner modifier ensures only the owner can call this function
    }

    function addGame(uint _id, uint _awayTeamId, uint _homeTeamId, int _awayMoneyLine, int _homeMoneyLine) external onlyOwner {
        games[_id] = Game({
            id: _id,
            awayTeamId: _awayTeamId,
            homeTeamId: _homeTeamId,
            awayMoneyLine: _awayMoneyLine,
            homeMoneyLine: _homeMoneyLine,
            awayScore: 0,
            homeScore: 0,
            started: false,
            finished: false
        });

        emit GameAdded("GameAdded", _id);
    }

    function markGameAsStarted(uint _gameId) external onlyOwner {
        Game storage game = games[_gameId];
        require(game.id != 0, "Invalid game ID");
        require(!game.started, "Game already started");

        game.started = true;

        emit GameStarted("GameStarted", _gameId);
    }

    function markGameAsFinished(uint _gameId, uint _awayScore, uint _homeScore) external onlyOwner {
        Game storage game = games[_gameId];
        require(game.id != 0, "Invalid game ID");
        require(game.started, "Game not started yet");
        require(!game.finished, "Game already finished");

        game.awayScore = _awayScore;
        game.homeScore = _homeScore;
        game.finished = true;

        emit GameFinished("GameFinished", game.id);

        uint[] storage betsForGame = gameBets[_gameId];

        for (uint i = 0; i < betsForGame.length; i++) {
            uint betId = betsForGame[i];
            Bet storage bet = bets[betId];
            require(bet.id != 0, "Invalid bet ID");
            require(bet.gameId == _gameId, "Bet does not belong to this game");
            
            bool betWon = (bet.teamId == game.awayTeamId && game.awayScore > game.homeScore) || 
                        (bet.teamId == game.homeTeamId && game.homeScore > game.awayScore);
            
            uint payoutAmount;
            if (betWon) {
                payoutAmount = bet.amount * 2;
                // if (bet.teamId == game.awayTeamId) {
                //     if (game.awayMoneyLine > 0) {
                //         payoutAmount = bet.amount * (100 + uint(game.awayMoneyLine)) / 100;
                //     } else {
                //         uint impliedProbability = 100 / uint(-game.awayMoneyLine);
                //         payoutAmount = bet.amount * (100 + impliedProbability) / impliedProbability;
                //     }
                // } else {
                //     if (game.homeMoneyLine > 0) {
                //         payoutAmount = bet.amount * (100 + uint(game.homeMoneyLine)) / 100;
                //     } else {
                //         uint impliedProbability = 100 / uint(-game.homeMoneyLine);
                //         payoutAmount = bet.amount * (100 + impliedProbability) / impliedProbability;
                //     }
                // }
            } else {
                payoutAmount = 0;
                emit BetLost("BetLost", bet.id, bet.user);
            }

            // require(owner().balance >= payoutAmount, "Insufficient contract balance for payout");
        
            if (betWon && payoutAmount > 0 && !bet.paid) {
                // payable(bet.user).transfer(payoutAmount);
                bet.paid = true;
                emit BetWon("BetWon", bet.id, bet.user, payoutAmount);
            }
        }
    }

    function tokenBalance() external {
        string memory name = name();
        emit TokenName("TokenName", name);
        string memory symbol = symbol();
        emit TokenSymbol("TokenSymbol", symbol);
        uint256 balance = balanceOf(msg.sender);
        emit TokenBalance("TokenBalance", msg.sender, name, symbol, balance);
        uint256 totalSupply = totalSupply();
        emit TokenSupply("TokenSupply", name, symbol, totalSupply);
    }

    function tokenApproval(address _contractAddress, uint256 _value) external {
        require(_value > 0, "Approved token amount must be greater than zero.");
        approve(_contractAddress, _value);
    }

    function tokenAllowance(address _contractAddress) external {
        uint256 amount = allowance(msg.sender, _contractAddress);
        emit TokenAllowance("TokenAllowance", msg.sender, _contractAddress, amount);
    }

    function placeBet(address _contractAddress, uint _gameId, uint _teamId, uint256 _value) external payable {
        require(_value > 0, "Bet amount must be greater than zero");

        Game storage game = games[_gameId];
        require(game.id != 0, "Invalid game ID");
        require(!game.started, "Game already started");
        require(!game.finished, "Game already finished");
        require(_teamId == game.awayTeamId || _teamId == game.homeTeamId, "Invalid team ID");
        // require(transfer(_contractAddress, _value), "Transfer failed");

        bets[betCount] = Bet({
            id: betCount,
            user: msg.sender,
            gameId: _gameId,
            teamId: _teamId,
            amount: _value,
            paid: false
        });

        gameBets[_gameId].push(betCount);
        
        emit BetPlaced("BetPlaced", msg.sender, betCount, _gameId, _teamId, _value);
        
        betCount++;
    }

}
