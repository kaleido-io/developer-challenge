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
        mapping(bytes32 => bool) voters;
    }

    mapping(uint => Poll) public polls;
    uint public pollCount;

    event PollCreated(uint pollId, string question, bytes32 creatorHash, address creatorAddress);
    event VoteRecorded(uint pollId, uint optionId, bytes32 voterHash, address voterAddress);

    function createPoll(string memory _question, string[] memory _options, bytes32 _creatorHash) public {
        pollCount++;
        Poll storage poll = polls[pollCount];
        poll.id = pollCount;
        poll.question = _question;
        for (uint i = 0; i < _options.length; i++) {
            poll.options.push(Option(i, _options[i], 0));
        }
        emit PollCreated(pollCount, _question, _creatorHash, msg.sender);
    }

    function vote(uint _pollId, uint _optionId, bytes32 _voterHash) public {
        Poll storage poll = polls[_pollId];

        poll.options[_optionId].voteCount++;
        poll.voters[_voterHash] = true; // Mark the voter hash as used

        emit VoteRecorded(_pollId, _optionId, _voterHash, msg.sender);
    }

    function getPoll(uint _pollId) public view returns (string memory, Option[] memory) {
        Poll storage poll = polls[_pollId];
        return (poll.question, poll.options);
    }
}
