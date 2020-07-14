pragma solidity ^0.6.0;

import "./ResourceReg.sol";
import "./Escrow.sol";

/**
  * @title Settlement
  * @dev The resources are requested and offered
  */
  
contract Settlement is ResourceReg,Escrow {
    
    struct requestDetails {
        uint requestID;
        uint resourceID;
        uint rvolume;
        uint rcost;
        uint rstartDateTime;
        uint rendDateTime;
        bool stat;
    }
    uint _count;
    bool _offer;
    uint reqID;
    mapping(uint => requestDetails) requestDB;
    uint[] public request_info;
    
    event LogRequest(uint _rID, uint _reID, uint _rv, uint _rc);
    event LogOffer(bool offr);
    event LogPay(bool);
    event LogPayID(address, bool);
    
    constructor() public{
        _count = 1;
        _offer = false;
    }
    
    function request(uint resID, uint _rvol, uint _rcost, uint _rsdatetime, uint _redatetime )
    public
    payable
    onlyDSOTSO
    returns(bool)
    {
        
        address buyer = msg.sender;
        reqID = _count++;
   
        require(resourceDB[resID].cost < buyer.balance, "Insufficient balance to trade");
        require(resourceDB[resID].volume >= _rvol,"Insufficient volume");
        require(resourceDB[resID].startDateTime < _rsdatetime, "Date or time is earlier");
        require(resourceDB[resID].endDateTime > _redatetime, "Date or time is earlier");
        
        
        requestDB[resID].requestID = reqID;
        requestDB[resID].resourceID = resID;
        requestDB[resID].rvolume = _rvol;
        requestDB[resID].rcost = _rcost;
        requestDB[resID].rstartDateTime = _rsdatetime;
        requestDB[resID].rendDateTime = _redatetime;
        requestDB[resID].stat = false;
        
        address seller = resourceDB[resID].providerAddress;
        
        request_info.push(resID);
      
        Escrow.deposit(seller);
     
        emit LogRequest(reqID, resID, _rvol, _rcost);
        return true;
    }
    
    function getRequests() 
    public 
    view 
    returns (uint [] memory)
    {
        
        return request_info;
     
    }
    
   
   function getRequestedRes(uint resrID)
   public
   view
   returns (uint requID , uint , uint _rvol, uint _sdtime, uint _edtime, uint _rcost, bool rstat){
       
       
       requID= requestDB[resrID].requestID;
       _rvol = requestDB[resrID].rvolume;
       _sdtime = requestDB[resrID].rstartDateTime;
       _edtime = requestDB[resrID].rendDateTime;
       _rcost = requestDB[resrID].rcost;
       rstat = requestDB[resrID].stat;
       
       return (requID, resrID, _rvol, _sdtime, _edtime, _rcost, rstat);
   }
   
   function payID(uint prID) public view returns (address, bool){
       
      
       return (resourceDB[prID].providerAddress, requestDB[prID].stat);
   }
    
    
    
    
    function offer(uint resID, uint _rvol)
    public 
    onlyRegistered
   returns (bool)
   {
        require(resourceDB[resID].flag ==  true,"Resource is not active");
        requestDB[resID].stat = true;
        resourceDB[resID].volume -= _rvol;
        _offer = true;
        
        emit LogOffer(true);
        return true;
    }
    
    function pay(address payable seller) 
    public 
    onlyDSOTSO
   {
         _offer = false;
         
         Escrow.withdraw(seller);
         
         emit LogPay(true);
    }
    
    function status(uint resID, bool stat)
    public
    onlyRegistered
    returns (bool){
        resourceDB[resID].flag = stat;
        return true;
    }
   
    
}