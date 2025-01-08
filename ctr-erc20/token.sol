//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CounterToken is ERC20, Ownable {
  uint16 public counter;
  uint constant public _tS = 100;
  uint constant public incrementCost = 5;
  uint constant public decrementCost = 7;

  event Increment(address indexed from, uint16 ctr);
  event Decrement(address indexed from, uint16 ctr);

  constructor() 
  ERC20("Counter", "CTR")
  Ownable(msg.sender) 
  {
    _mint(owner(), _tS * 10 ** decimals());
  }

  function increment() public {
    //check
    require(balanceOf(msg.sender)>=incrementCost, "insufficient funds");   
    //effects
    transfer(owner(), incrementCost);    
    //interactions
    counter++;
    emit Increment(msg.sender, counter);
  }

  function decrement() public {
    //check
    require(balanceOf(msg.sender)>=decrementCost, "insufficient funds");   
    require(counter>0, "counter can not be negative");
    //effects
    transfer(owner(), decrementCost);    
    //interactions
    counter--;
    emit Decrement(msg.sender, counter);
  }

}