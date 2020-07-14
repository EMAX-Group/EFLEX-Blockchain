pragma solidity ^0.6.0;

import "./Ownable.sol";

/**
  * @title Verifier
  * @dev The users register and admin approves
 
  */

contract Verifier is Ownable{
    
     enum roles{
        TSO,
        DSO,
        Aggregator,
        none
    }
    
     struct entityDetail{
        bool registrationStatus;
        bytes32 companyName;
        bytes32 location;
        bytes32 entityType;
        uint id;
        address _address;
        roles role_assigned;
    }
    
    mapping(address => entityDetail) entityDB;
    
    address[] public address_info;
    uint count;
    address private admin;
    
    event LogEntityInfoSet(address addr);
    event LogRoleSet(address addr, roles Role);
    
    modifier onlyAdmin() {
         require(admin == msg.sender, "Verifier: caller is not the admin");
        _;
    }
    
      constructor() 
      internal {
          
        admin = msg.sender;
        count = 1;
    }
    
     /**
     * @dev Stores the registered users
     
     */
    
    function register(address _addr, bytes32 _companyName, bytes32 _location, bytes32 entity_type) 
    public
    returns(bool) {
       
        entityDB[_addr].location = _location;
        entityDB[_addr].companyName= _companyName;
        entityDB[_addr].entityType = entity_type;
        entityDB[_addr]._address = _addr;
        entityDB[_addr].id = count;
        entityDB[_addr].role_assigned = roles.none;
        entityDB[_addr].registrationStatus = false;
        
        address_info.push(_addr);
        
        count++;
        
        emit LogEntityInfoSet(_addr);
        return true;
    }
    
    function getRegisteredUsers1() 
    public 
    view 
    returns (address [] memory)
    {

        return address_info;
     
    }
    
    function getReg(address _addr) 
    public 
    view 
    returns(uint _id, address addr, bytes32 comp, bytes32 loc, bytes32 et, bool reg){
        
        _id = entityDB[_addr].id;
        addr = entityDB[_addr]._address;
        comp = entityDB[_addr].companyName;
        loc = entityDB[_addr].location;
        et = entityDB[_addr].entityType;
        reg = entityDB[_addr].registrationStatus;
        
        return (_id, addr, comp, loc, et, reg);
    }
    
      /**
     * @dev Admin verifies the registered users and assigns them with roles
   
     */
  
     function setRole(address _addr, roles _role) 
     public  
     onlyOwner
     returns(bool){
   
        entityDB[_addr].role_assigned = _role;
        entityDB[_addr].registrationStatus = true;
        
        emit LogRoleSet(_addr, entityDB[_addr].role_assigned);
        
        return true;
    }
    
    function getRole(address _addr)
    public 
    view
    returns(uint _id, address addr, bytes32 cn, bytes32 loc, roles ro, bool reg){
        
        _id = entityDB[_addr].id;
        addr = entityDB[_addr]._address;
        cn = entityDB[_addr].companyName;
        loc = entityDB[_addr].location;
        ro = entityDB[_addr].role_assigned;
        reg = entityDB[_addr].registrationStatus;
        
        return (_id, addr, cn, loc, ro, reg);
    }
    
    
    
}