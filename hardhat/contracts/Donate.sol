// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from purchases
    Memo[] public memos;

    constructor() Ownable(msg.sender) {

    }

    function sendDonation(string memory _name, string memory _message) public payable returns(string memory) {
        require(msg.value > 0, "You must send some ether to send Donation");
        
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );

        return "Thanks for your donation!";
    } 

    function withdraw() public onlyOwner payable {
        require(address(this).balance > 0, "Contract balance is zero!");
        payable(msg.sender).transfer(address(this).balance);
    }

}