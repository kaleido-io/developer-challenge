// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./RawData.sol";

contract Papers {
  RawData private _rawDataContract;

  struct Metadata {
    string dsId;
    address author;
    uint256 createdAt;
    string title;
    string organization;
  }

  struct States {
    bool published;
  }

  mapping(uint256 => Metadata) private _metadata;
  mapping(uint256 => States) private _states;
  mapping(uint256 => uint256[]) private _data;

  mapping(address => uint256[]) private _paperIds;
  mapping(string => uint256) private _dsIdToPaperId;

  uint256 private _idCounter;

  constructor(address rawDataContractAddress) public {
    _rawDataContract = RawData(rawDataContractAddress);
  }

  function create(string memory dsId, uint256[] memory data, string memory title, string memory organization) public returns (uint256) {
    _metadata[_idCounter].dsId = dsId;
    _dsIdToPaperId[dsId] = _idCounter;
    _metadata[_idCounter].author = msg.sender;
    _metadata[_idCounter].createdAt = block.timestamp;
    _metadata[_idCounter].title = title;
    _metadata[_idCounter].organization = organization;
    for (uint256 i = 0; i < data.length; i++) {
        _data[_idCounter].push(data[i]);
    }
    _paperIds[msg.sender].push(_idCounter);

    emit paperCreated(_idCounter);

    _idCounter += 1;

    return _idCounter - 1;
  }

  function getPaperIds() public view returns (uint256[] memory) {
    return _paperIds[msg.sender];
  }

  function getPaperId(string memory dsId) public view returns (uint256) {
    return _dsIdToPaperId[dsId];
  }

  function getMetadata(uint256 id) public view returns (string memory, address, uint256, string memory, string memory, uint256[] memory) {
    return (_metadata[id].dsId, _metadata[id].author, _metadata[id].createdAt, _metadata[id].title, _metadata[id].organization, _data[id]);
  }

  function getDataIds(uint256 id) public view returns (uint256[] memory) {
    return _data[id];
  }

  function publish(uint256 id) public {
    require(_metadata[id].author == msg.sender || _metadata[id].author == tx.origin, "Access Denied");
    for (uint256 i = 0; i < _data[id].length; i++) {
        _rawDataContract.publish(_data[id][i]);
    }
    _states[id].published = true;
  }

  event paperCreated(uint256 id);
}
