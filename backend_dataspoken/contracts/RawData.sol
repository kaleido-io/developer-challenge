// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RawData {
  struct Metadata {
    string dsId;
    address createdBy;
    uint256 createdAt;
    string dataType;
    string description;
  }

  struct States {
    bool published;
  }

  mapping(uint256 => Metadata) private _metadata;
  mapping(uint256 => States) private _states;
  mapping(uint256 => string) private _dataHash;

  mapping(uint256 => mapping(address => bool)) private _access;
  mapping(address => uint256[]) private _allowedIds;
  mapping(string => uint256) private _dsIdToRawDataId;

  uint256 private _idCounter;

  constructor() public {
  }

  function create(string memory dsId, string memory dataType, string memory dataHash, string memory description) public returns (uint256) {
    _metadata[_idCounter].dsId = dsId;
    _dsIdToRawDataId[dsId] = _idCounter;
    _metadata[_idCounter].createdAt = block.timestamp;
    _metadata[_idCounter].createdBy = msg.sender;
    _metadata[_idCounter].dataType = dataType;
    _metadata[_idCounter].description = description;
    _dataHash[_idCounter] = dataHash;

    _access[_idCounter][msg.sender] = true;
    _allowedIds[msg.sender].push(_idCounter);

    emit rawDataCreated(_idCounter, dataHash);

    _idCounter += 1;

    return _idCounter - 1;
  }

  function getRawDataIds() public view returns (uint256[] memory) {
    return _allowedIds[msg.sender];
  }

  function getRawDataId(string memory dsId) public view returns (uint256) {
    return _dsIdToRawDataId[dsId];
  }

  function getMetadata(uint256 id) public view returns (address, uint256, string memory, string memory, string memory) {
    // Raw data is visible for everyone once it is published. Until then, only who's approved can see it.
    require(_states[id].published == true || _access[id][msg.sender] == true, "Access Denied");
    return (_metadata[id].createdBy, _metadata[id].createdAt, _metadata[id].dataType, _metadata[id].description, _dataHash[id]);
  }

  function publish(uint256 id) public {
    require(_access[id][msg.sender] == true || _access[id][tx.origin] == true, "Access Denied");
    _states[id].published = true;
  }

  function approveAccess(uint256 id, address to) public {
    require(_metadata[id].createdBy == msg.sender, "Only the creator can approve access");
    require(_access[id][to] != true, "Access has been already approved for the user");
    _access[id][to] = true;
    _allowedIds[to].push(id);
  }

  event rawDataCreated(uint256 id, string dataHash);
}
