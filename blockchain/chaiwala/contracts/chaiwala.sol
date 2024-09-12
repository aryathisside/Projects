//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract chaiwala{

    struct Memo{
        string name;
        string message;
        uint timeStamp;
        address from;
    }

    Memo[] memos;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyChai(string calldata name, string calldata message) external payable{
        require(msg.value > 0, "Send Something!");

        owner.transfer(msg.value);
        memos.push(Memo(name,message,block.timestamp,msg.sender));
        
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
    
}