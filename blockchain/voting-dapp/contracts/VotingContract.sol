// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

     address public votingOrganizer;

     struct Candidate {
        uint256 candidateId;
        uint256 age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
     }

     event CandidateCreated (
        uint256 indexed candidateId,
        int age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
     )

     address[] public candidateAddress;

     mapping (address => Candidate) public candidates;

     address[] public votedVoters;
     address[] public votersAddress;

     mapping(address => Voter) public voters;

     struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
     }

     event VoterCreated (
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
     );

    constructor () {
        votingOrganizer = msg.sender;
    }

    function setCandidate
            (address _address, 
             string memory _age, 
              string memory _age, 
              string memory _name, 
              string memory _image,) public {

        require(msg.sender == votingOrganizer, "Only Organizer can authorise candidate");

        _candidateId.increment();

        uint256 idNumber = _candidateId.current();
        Candidate storage candidate = candidates[_address];

        candidate.age = _age;
        candidate.candidateName = _name;
        candidate.candidateId = idNumber;
        candidate.candidateImage = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CandidateCreated (
        idNumber,
        _age,
        _name,
        _image,
        candidate.voteCount,
        _address,
        _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory){
        return candidateAddress; 
    }

    function getCandidateLength() pubic view returns (uint256) {
        return candidateAddress.length;
    }
        uint256 candidateId;
        int age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;

    function getCandidateData (address _address) 
        pubic 
        view 
        returns(
            uint256, 
            string memory, 
            uint256, 
            string memory, 
            uint256, 
            address,  
            string memory){
        
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address,
        );
    }

    function voterRight ( address _address, string memory _name, string memory _image, string memory _ipfs) pubic {

        require( msg.sender ==v otingOrganizer, "Only organizer can create voters!")

        _voterId.increment();

        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0);

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        )

    }

    function vote (address _candidateAddress, uint256 _candidateVoteId) external {

        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already Voted");
        require(voter.voter_allowed != 0, "You have no right to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voteCount += voter.voter_allowed;


    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterData (address _address) 
        pubic 
        view 
        returns (   
            uint256, 
            string memory, 
            string memory, 
            address, 
            string memory, 
            uint256, 
            bool
        )
    {
        return(
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_ipfs,
            voters[_address].voter_allowed,
            voters[_address].voter_voted
        );
    }

    function getVotedVoterList() pubic view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() pubic view returns(address[] memory){
        return votersAddress;
    }

}