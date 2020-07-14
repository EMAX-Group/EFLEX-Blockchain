pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";
import "./Ownable.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
import "./ResourceReg.sol";


 /**
  * @title Escrow
  * @dev Base escrow contract, holds funds designated for a payee until they
  * withdraw them.
  
  */
contract Escrow is Ownable,ResourceReg {
    using SafeMath for uint256;
    using Address for address payable;
    

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    mapping(address => uint256) private _deposits;

    function depositsOf(address payee) public view returns (uint256) {
        return _deposits[payee];
    }

    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param payee The destination address of the funds.
     */
    function deposit(address payee)
    public
    virtual
    payable
    onlyDSOTSO 
    {
        uint256 amount = msg.value;
        _deposits[payee] = _deposits[payee].add(amount);

        emit Deposited(payee, amount);
    }

    /**
     * @dev Withdraw accumulated balance for a payee, forwarding all gas to the
     * recipient.
     *
    
     * @param payee The address whose funds will be withdrawn and transferred to.
     */
    function withdraw(address payable payee)
    public
    virtual
    onlyDSOTSO 
    {
        uint256 payment = _deposits[payee];

        _deposits[payee] = 0;

        payee.sendValue(payment);

        emit Withdrawn(payee, payment);
    }
    
    function conflictWithdraw(address payable buyer, address seller)
    public 
    virtual 
    onlyOwner
    {
         uint256 payment = _deposits[seller];

        _deposits[seller] = 0;

        buyer.sendValue(payment);

        emit Withdrawn(buyer, payment);
    }
}