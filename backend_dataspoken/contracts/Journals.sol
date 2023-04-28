// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Papers.sol";

contract Journals {
  Papers private _papersContract;
  address private _conference;

  struct Metadata {
    string title;
    string subjectArea;
    string issn;
  }

  struct Reviewer {
    int256 score;
    uint256[] papers;
  }

  mapping(uint256 => Metadata) private _metadata;
  mapping(uint256 => uint256[]) private _papers;
  mapping(uint256 => uint256) private _paperIdToJournalId;
  mapping(uint256 => address[]) private _reviews;
  mapping(uint256 => bool) private _retracted;
  
  address[] private _reviewers;
  mapping(address => Reviewer) private _reviewerInfo;


  uint256 private _idCounter;

  constructor(address papersContractAddress, address conference) public {
    _papersContract = Papers(papersContractAddress);
    _conference = conference;
  }

  function create(string memory title, string memory subjectArea, string memory issn) public returns (uint256) {
    require(msg.sender == _conference, "Only conference can create a journal");

    _metadata[_idCounter].title = title;
    _metadata[_idCounter].subjectArea = subjectArea;
    _metadata[_idCounter].issn = issn;

    emit journalCreated(_idCounter);

    _idCounter += 1;

    return _idCounter - 1;
  }

  function publishToJournal(uint256 journalId, uint256 paperId) public {
    (string memory dsId, address author, uint256 createdAt, string memory title, string memory organization, uint256[] memory rawData) = _papersContract.getMetadata(paperId);
    require(msg.sender == author, "Only the author can submit a paper");
    for (uint256 i = 0; i < _papers[journalId].length; i++) {
      if (_papers[journalId][i] == paperId) {
        revert("This paper has been already published to this journal");
      }
    }
    _papers[journalId].push(paperId);
    _paperIdToJournalId[paperId] = journalId;
    _papersContract.publish(paperId);

    emit paperPublished(journalId, paperId);
  }

  function retract(uint256 journalId, uint256 paperId) public {
    require(msg.sender == _conference, "Only conference can retract a journal");
    require(_retracted[paperId] != true, "The paper has been retracted already");

    uint256 indexToDelete;
    for (uint256 i = 0; i < _papers[journalId].length; i++) {
        if (_papers[journalId][i] == paperId) {
            indexToDelete = i;
            break;
        }
    }
    _papers[journalId][indexToDelete] = _papers[journalId][_papers[journalId].length - 1];
    _papers[journalId].pop();
    _retracted[paperId] = true;

    for (uint256 i = 0; i < _reviews[paperId].length; i++) {
      _reviewerInfo[_reviews[paperId][i]].score -= 10;
    }
    
    emit paperRetracted(journalId, paperId);
  }

  function review(uint256 paperId) public {
    bool found;
    for (uint256 i = 0; i < _reviewers.length; i++) {
      if (_reviewers[i] == msg.sender) {
        found = true;
        break;
      }
    }
    if (found == false) {
      _reviewers.push(msg.sender);
    }
    
    found = false;
    for (uint256 i = 0; i < _reviews[paperId].length; i++) {
      if (_reviews[paperId][i] == msg.sender) {
        found = true;
        break;
      }
    }
    if (found == false) {
      _reviews[paperId].push(msg.sender);
      _reviewerInfo[msg.sender].score += 1;
      _reviewerInfo[msg.sender].papers.push(paperId);
    }
  }

  function getLatestJournalId() public view returns (uint256) {
    require(_idCounter > 0, "Journal does not exist");
    return _idCounter - 1;
  }

  function getMetadata(uint256 id) public view returns (string memory, string memory, string memory) {
    return (_metadata[id].title, _metadata[id].subjectArea, _metadata[id].issn);
  }

  function getPapers(uint256 id) public view returns (uint256[] memory) {
    return _papers[id];
  }

  function getReviews(uint256 paperId) public view returns (address[] memory reviewers) {
    return _reviews[paperId];
  }

  function getReviewerInfo(address reviewer) public view returns (int score, uint256[] memory papers) {
    return (_reviewerInfo[reviewer].score, _reviewerInfo[reviewer].papers);
  }

  function getReviewers() public view returns (address[] memory _addresses) {
    return _reviewers;
  }

  function isRetracted(uint256 paperId) public view returns (bool retracted) {
    return _retracted[paperId];
  }

  event journalCreated(uint256 id);
  event paperPublished(uint256 journalId, uint256 paperId);
  event paperRetracted(uint256 journalId, uint256 paperId);
}
