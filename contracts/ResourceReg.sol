pragma solidity ^0.6.0;

import "./Verifier.sol";


 /**
  * @title ResourceReg
  * @dev The approved Aggregatores lists resources  which is mapped and stored with ID
 
  */
  

contract ResourceReg is Verifier{
    
     struct resourceDetails {
         
        bool flag;
        uint resourceID;
        uint volume;
        uint startDateTime;
        uint endDateTime;
        uint cost;
        bytes32 resourceType;
        bytes32 location;
        bytes32 provider_company;
        address providerAddress;
    }
     
    uint[] public resourceID_info;
    uint rcount;
    
    mapping(uint => resourceDetails) resourceDB;
    mapping(address => resourceDetails) resourceProvider;
    
    event LogResourceInfo(uint _resID, uint _amt, uint _costperkWh, bytes32 _resType, bytes32 _loc);
    
    modifier onlyRegistered() {
        require(entityDB[msg.sender].role_assigned == roles.Aggregator, "Caller does not hold a role");
        _;
    }
    
     modifier onlyDSOTSO() {
        require(entityDB[msg.sender].role_assigned == roles.DSO || entityDB[msg.sender].role_assigned == roles.TSO ,"Caller is not registered as DSO or TSO");
        _;
    }
    
    
    constructor() public {
        rcount = 101;
    }
    
    function registerResource(address _providerAddress, uint _volume, uint _startDateTime,
    uint _endDateTime, uint _cost, bytes32 _resourceType, bytes32 _location, bool _flag)
    public
    onlyRegistered
    returns(bool){
        
        uint _resourceID = rcount;
        resourceDB[_resourceID].resourceID = _resourceID;
        resourceDB[_resourceID].volume = _volume;
        resourceDB[_resourceID].startDateTime = _startDateTime;
        resourceDB[_resourceID].endDateTime = _endDateTime;
        resourceDB[_resourceID].cost = _cost;
        resourceDB[_resourceID].resourceType = _resourceType;
        resourceDB[_resourceID].location = _location;
        resourceDB[_resourceID].flag = _flag;
        resourceDB[_resourceID].providerAddress = _providerAddress; 
        resourceDB[_resourceID].provider_company = entityDB[msg.sender].companyName;
        
        rcount++;
        
        
        resourceProvider[_providerAddress].resourceID = _resourceID;
        
        resourceID_info.push(_resourceID);

        emit LogResourceInfo(_resourceID, _volume, _cost, _resourceType, _location);
        
        return true;
    }
    
    function getResources() 
    public 
    view 
    returns (uint [] memory)
    {
        
        return resourceID_info;
     
    }
    
   
   function getRegisteredRes(uint rID)
   public
   view
   returns (uint _rsrID, bytes32 _rcn, uint _rvol, uint _sdtime, uint _edtime, uint _rcost, bytes32 _rtype, bytes32 _rloc, bool _rf){
       
       _rsrID = resourceDB[rID].resourceID;
       _rvol = resourceDB[rID].volume;
       _sdtime = resourceDB[rID].startDateTime;
       _edtime = resourceDB[rID].endDateTime;
       _rcost = resourceDB[rID].cost;
       _rtype = resourceDB[rID].resourceType;
       _rloc = resourceDB[rID].location;
       _rf = resourceDB[rID].flag;
       _rcn = resourceDB[rID].provider_company;
       
       
       return (_rsrID, _rcn, _rvol, _sdtime, _edtime, _rcost, _rtype, _rloc, _rf);
   }
    
}