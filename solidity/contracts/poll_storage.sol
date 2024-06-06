// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollStorage {
    struct Option {
        uint id;
        string name;
        uint voteCount;
    }

    struct Poll {
        uint id;
        string question;
        Option[] options;
    }

    mapping(uint => Poll) public polls;
    uint public pollCount;

    event PollCreated(uint pollId, string question);
    event VoteRecorded(uint pollId, uint optionId);

    function createPoll(string memory _question, string[] memory _options) public {
        pollCount++;
        Poll storage poll = polls[pollCount];
        poll.id = pollCount;
        poll.question = _question;
        for (uint i = 0; i < _options.length; i++) {
            poll.options.push(Option(i, _options[i], 0));
        }
        emit PollCreated(pollCount, _question);
    }

    function vote(uint _pollId, uint _optionId) public {
        Poll storage poll = polls[_pollId];

        poll.options[_optionId].voteCount++;

        emit VoteRecorded(_pollId, _optionId);
    }

    function getPoll(uint _pollId) public view returns (string memory, Option[] memory) {
        Poll storage poll = polls[_pollId];
        return (poll.question, poll.options);
    }
}
