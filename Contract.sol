// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

contract Storage {

    string message;

    function set(string memory _message) public {
        message = _message;
    }

    function get() public view returns (string memory){
        return message;
    }
}
