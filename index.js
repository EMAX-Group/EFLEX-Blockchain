import Web3 from "web3";
import Web3Utils from "web3-utils";
import ethers from 'ethers';

var roles = {TSO: "TSO", DSO: "DSO" ,AGGREGATOR:"Aggregator", NONE:"none"};

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      
        this.meta = new web3.eth.Contract(
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weiAmount",
				"type": "uint256"
			}
		],
		"name": "Deposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "LogEntityInfoSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "offr",
				"type": "bool"
			}
		],
		"name": "LogOffer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "LogPay",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "LogPayID",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_rID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_reID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_rv",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_rc",
				"type": "uint256"
			}
		],
		"name": "LogRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_resID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_costperkWh",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_resType",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_loc",
				"type": "bytes32"
			}
		],
		"name": "LogResourceInfo",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum Verifier.roles",
				"name": "Role",
				"type": "uint8"
			}
		],
		"name": "LogRoleSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weiAmount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "conflictWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "payee",
				"type": "address"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "resID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rvol",
				"type": "uint256"
			}
		],
		"name": "offer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "pay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_companyName",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_location",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "entity_type",
				"type": "bytes32"
			}
		],
		"name": "register",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_providerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_volume",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startDateTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDateTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_resourceType",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_location",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "_flag",
				"type": "bool"
			}
		],
		"name": "registerResource",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "resID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rvol",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rcost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rsdatetime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_redatetime",
				"type": "uint256"
			}
		],
		"name": "request",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "enum Verifier.roles",
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "setRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "resID",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "stat",
				"type": "bool"
			}
		],
		"name": "status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "payee",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "address_info",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "payee",
				"type": "address"
			}
		],
		"name": "depositsOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getReg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "comp",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "loc",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "et",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "reg",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rID",
				"type": "uint256"
			}
		],
		"name": "getRegisteredRes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_rsrID",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_rcn",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_rvol",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sdtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_edtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rcost",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_rtype",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_rloc",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "_rf",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegisteredUsers1",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "resrID",
				"type": "uint256"
			}
		],
		"name": "getRequestedRes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "requID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rvol",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_sdtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_edtime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rcost",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "rstat",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRequests",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getResources",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getRole",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "cn",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "loc",
				"type": "bytes32"
			},
			{
				"internalType": "enum Verifier.roles",
				"name": "ro",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "reg",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "prID",
				"type": "uint256"
			}
		],
		"name": "payID",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "request_info",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "resourceID_info",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
],
        "0xA44673A5Ee128B6d8E0809d3C5dba6f51CbD5254",
);

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
},


 register: async function() {
	  
	const _walletaddr = document.getElementById('register_wallet_address').value;
	const _compname = document.getElementById('register_company_name').value;
    const _location = document.getElementById('register_location').value;
    const _entityType = document.getElementById('register_entity_type').value;
 
    const { register } = this.meta.methods;
	
	//const _wadd = Web3Utils.toBN(_walletaddr).toString();
	const _cn =  ethers.utils.formatBytes32String(_compname);
	const _lo = ethers.utils.formatBytes32String(_location);
	const _et = ethers.utils.formatBytes32String(_entityType);
	
    await register(_walletaddr, _cn, _lo, _et ).send({ from: this.account, gas: '1000000' });

},
  
getRegisteredUsers1: async function() {
	
    const { getRegisteredUsers1 } = this.meta.methods;
    const addresses = await getRegisteredUsers1().call();
    
	const { getReg } = this.meta.methods;
	var table = document.getElementById('getEntityTable');
	for(var i=0;i<addresses.length;i++){
		await getReg(addresses[i]).call().then(function(result){
		
            var tr = document.createElement('tr'); 
            var td0 = document.createElement('td');  
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
		    var td5 = document.createElement('td');
            var enID = document.createTextNode(result[0]);
            var waddr = document.createTextNode(result[1]);
            var c_name = document.createTextNode(ethers.utils.parseBytes32String(result[2]));
            var loc = document.createTextNode(ethers.utils.parseBytes32String(result[3]));
            var entityType = document.createTextNode(ethers.utils.parseBytes32String(result[4]));
			
		    if(result[5] == false)
		       var regStatus = document.createTextNode("Not Approved");
	        else
			   var regStatus = document.createTextNode("Approved");
		   
               td0.appendChild(enID);
               td1.appendChild(waddr);
               td2.appendChild(c_name);
               td3.appendChild(loc);
               td4.appendChild(entityType);
		       td5.appendChild(regStatus);
               tr.appendChild(td0);
               tr.appendChild(td1);
               tr.appendChild(td2);
               tr.appendChild(td3);
               tr.appendChild(td4);
		       tr.appendChild(td5);
               table.appendChild(tr);
         
		   });
	    }
		
},
  
  
setRole: async function() {
	  
	const _waddr = document.getElementById('setrole_wallet_address').value;
    const assign_role = document.getElementById('set_roles').value;
	var roleAss;
	
	switch(assign_role){
		case 'Aggregator':
		roleAss = 2;
		break;
		case 'DSO':
		roleAss = 1;
		break;
		case 'TSO':
		roleAss = 0;
		break;
	}
 
    const { setRole } = this.meta.methods;

    const result = await setRole(_waddr, roleAss).send({ from: this.account, gas: '1000000' }).on('error', function(error,receipt){
		console.log(error);
		console.log(receipt);
	});
    console.log(result.status);
},
  
getRole: async function() {
	  
	const _waddr = document.getElementById('getRole_wallet_address').value;

	function checkRole(val) {
          switch(val) {
            case '0':
             var roleAssigned= roles.DSO; 
              break;
            case '1':
              var roleAssigned = roles.AGGREGATOR;
              break;
            case '2':
              var roleAssigned = roles.NONE;
              break;
          }
          return roleAssigned;
        }
	
	
	
    const { getRole } = this.meta.methods;
	var table = document.getElementById('getRoleTable');
    await getRole(_waddr).call().then(function (result){;
		
		  var tr = document.createElement('tr'); 
          var td0 = document.createElement('td');  
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
		  var td5 = document.createElement('td');
          var enID = document.createTextNode(result[0]);
          var waddr = document.createTextNode(result[1]);
          var c_name = document.createTextNode(ethers.utils.parseBytes32String(result[2]));
          var loc = document.createTextNode(ethers.utils.parseBytes32String(result[3]));
          var entityType = document.createTextNode(ethers.utils.parseBytes32String(result[4]));
		  var rol_stat = document.createTextNode(result[5]);
          td0.appendChild(enID);
          td1.appendChild(waddr);
          td2.appendChild(c_name);
          td3.appendChild(loc);
          td4.appendChild(entityType);
		  td5.appendChild(rol_stat);
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
		  tr.appendChild(td5);
          table.appendChild(tr);
        		
	});			
},
  
registerResource: async function() {
	  
	const _waddr3 = document.getElementById('provider_wallet_address').value;
	const _vol3 = document.getElementById('list_resource_volume').value;
	const _st3 = document.getElementById('list_time_from').value;
	const _et3 = document.getElementById('list_time_to').value;
	const _sd3 = document.getElementById('list_date_from').value;
	const _ed3 = document.getElementById('list_date_to').value;
	const _c3 = document.getElementById('list_cost').value;
    const _re3 = document.getElementById('list_resource').value;
    const _lo3 = document.getElementById('list_location').value;
	const _f3 = document.getElementById('list_flag').value;
  
    var newDate1 = _sd3 + " " + _st3 ;
    var newDate2 = _ed3 + " " + _et3 ; 
	
	var dateString = newDate1,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

    var dateString2 = newDate2,
    dateTimeParts2 = dateString2.split(' '),
    timeParts2 = dateTimeParts2[1].split(':'),
    dateParts2 = dateTimeParts2[0].split('-'),
    date2;

    date2 = new Date(dateParts2[2], parseInt(dateParts2[1], 10) - 1, dateParts2[0], timeParts2[0], timeParts2[1]);

	const _startDateTime = date.getTime();
	const _endDateTime = date2.getTime();
	const _res =  ethers.utils.formatBytes32String(_re3);
	const _lo = ethers.utils.formatBytes32String(_lo3);

    const { registerResource } = this.meta.methods;

    const result = await registerResource(_waddr3, _vol3,_startDateTime, _endDateTime, _c3, _res, _lo, _f3).send({ from: this.account, gas: '1000000' });
    console.log(result.status);
},
  
  
getResources: async function() {
    const { getResources } = this.meta.methods;
    const addresses = await getResources().call();
    console.log(addresses);
	console.log(addresses.length);
	console.log(addresses[0]);
	
	const { getRegisteredRes } = this.meta.methods;
	var table = document.getElementById('getResourceTable');
	for(var i=0;i<addresses.length;i++){
		await getRegisteredRes(addresses[i]).call().then(function(result){
			
    // initialize new Date object
    var num = Number(result[3]);
    var date_ob = new Date(num);
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    var hours = ("0" + date_ob.getHours()).slice(-2);
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);
    var fulldate = date + "-" + month + "-" + year;
    var fulltime = hours + ":" + minutes;

    var num2 = Number(result[4]);
    var date_ob2 = new Date(num2);
    var year2 = date_ob2.getFullYear();
    var month2 = ("0" + (date_ob2.getMonth() + 1)).slice(-2);
    var date2 = ("0" + date_ob2.getDate()).slice(-2);
    var hours2 = ("0" + date_ob2.getHours()).slice(-2);
    var minutes2 = ("0" + date_ob2.getMinutes()).slice(-2);
    var fulldate2 = date2 + "-" + month2 + "-" + year2;

    var fulltime2 = hours2 + ":" + minutes2;

          var tr = document.createElement('tr'); 
          var td0 = document.createElement('td');  
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
		  var td5 = document.createElement('td');
		  var td6 = document.createElement('td');
		  var td7 = document.createElement('td');
		  var td8 = document.createElement('td');
		  var td9 = document.createElement('td');
		  var td10 = document.createElement('td');
          var resID = document.createTextNode(result[0]);
		  var rcn = document.createTextNode(ethers.utils.parseBytes32String(result[1]));
          var rvol = document.createTextNode(result[2]);
          var from_date = document.createTextNode(fulldate);
		  var to_date = document.createTextNode(fulldate2);
		  var from_time = document.createTextNode(fulltime);
		  var to_time = document.createTextNode(fulltime2);
		  var rcost = document.createTextNode(result[5]);
		  var rty = document.createTextNode(ethers.utils.parseBytes32String(result[6]));
          var rloc = document.createTextNode(ethers.utils.parseBytes32String(result[7]));
          var rstatus = document.createTextNode(result[8]);
          td0.appendChild(resID);
          td1.appendChild(rcn);
          td2.appendChild(rvol);
          td3.appendChild(from_date);
		  td4.appendChild(to_date);
		  td5.appendChild(from_time);
		  td6.appendChild(to_time);
		  td7.appendChild(rcost);
		  td8.appendChild(rty);
		  td9.appendChild(rloc);
		  td10.appendChild(rstatus);
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
		  tr.appendChild(td5);
		  tr.appendChild(td6);
		  tr.appendChild(td7);
		  tr.appendChild(td8);
		  tr.appendChild(td9);
		  tr.appendChild(td10);
          table.appendChild(tr);
		});
	}
},
  
  
request: async function() {
	  
	const _rid5 = document.getElementById('req_rID').value;
	const _vol5 = document.getElementById('req_vol').value;
	const _c5 = document.getElementById('req_cos').value;
	const _st5 = document.getElementById('req_tf').value;
	const _et5 = document.getElementById('req_tt').value;
	const _sd5 = document.getElementById('req_sd').value;
	const _ed5 = document.getElementById('req_ed').value;
	
	var newDate1 = _sd5 + " " + _st5 ;
    var newDate2 = _ed5 + " " + _et5 ; 
	
	var dateString = newDate1,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

    date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

    var dateString2 = newDate2,
    dateTimeParts2 = dateString2.split(' '),
    timeParts2 = dateTimeParts2[1].split(':'),
    dateParts2 = dateTimeParts2[0].split('-'),
    date2;

    date2 = new Date(dateParts2[2], parseInt(dateParts2[1], 10) - 1, dateParts2[0], timeParts2[0], timeParts2[1]);

	const _startDateTime = date.getTime();
	const _endDateTime = date2.getTime();
	const val = _c5 * _vol5 + '00000000000';
    const { request } = this.meta.methods;
    const result = await request(_rid5, _vol5, _c5, _startDateTime, _endDateTime ).send({ from: this.account, gas: '1000000', value: val });
    console.log(result.status);
},
  
  
getRequests: async function() {
	   
	const { getRequests } = this.meta.methods;
    const requests = await getRequests().call();
	  
	const { getRequestedRes } = this.meta.methods;
	    var table = document.getElementById('getOfferTable');
	    for(var i=0;i<requests.length;i++){
		await getRequestedRes(requests[i]).call().then(function(result){

            var num = Number(result[3]);
            var date_ob = new Date(num);
            var year = date_ob.getFullYear();
            var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            var date = ("0" + date_ob.getDate()).slice(-2);
            var hours = ("0" + date_ob.getHours()).slice(-2);
            var minutes = ("0" + date_ob.getMinutes()).slice(-2);
            var fulldate = date + "-" + month + "-" + year;
            var fulltime = hours + ":" + minutes;

            var num2 = Number(result[4]);
            var date_ob2 = new Date(num2);
            var year2 = date_ob2.getFullYear();
            var month2 = ("0" + (date_ob2.getMonth() + 1)).slice(-2);
            var date2 = ("0" + date_ob2.getDate()).slice(-2);
            var hours2 = ("0" + date_ob2.getHours()).slice(-2);
            var minutes2 = ("0" + date_ob2.getMinutes()).slice(-2);
            var fulldate2 = date2 + "-" + month2 + "-" + year2;
            var fulltime2 = hours2 + ":" + minutes2;

            var tr = document.createElement('tr'); 
            var td0 = document.createElement('td');  
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
		    var td5 = document.createElement('td');
		    var td6 = document.createElement('td');
		    var td7 = document.createElement('td');
		    var td8 = document.createElement('td');
            var reqID = document.createTextNode(result[0]);
		    var resID = document.createTextNode(result[1]);
            var rvol = document.createTextNode(result[2]);
            var from_date = document.createTextNode(fulldate);
		    var to_date = document.createTextNode(fulldate2);
		    var from_time = document.createTextNode(fulltime);
		    var to_time = document.createTextNode(fulltime2);
		    var rcost = document.createTextNode(result[5]);
		    if(result[6] == false)
			   var b = "Not Offered";
		    else
			   var b = "Offered";
               var rstatus = document.createTextNode(b);
            td0.appendChild(reqID);
		    td1.appendChild(resID);
		    td2.appendChild(rvol);
		    td3.appendChild(from_date);
		    td4.appendChild(to_date);
            td5.appendChild(from_time);
            td6.appendChild(to_time);
            td7.appendChild(rcost);
            td8.appendChild(rstatus);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
		    tr.appendChild(td5);
		    tr.appendChild(td6);
		    tr.appendChild(td7);
		    tr.appendChild(td8);
            table.appendChild(tr);
		});
	}  
},
  
  
offer: async function() {
	   
	const _rid6 = document.getElementById('resreID').value;
	const _offvol = document.getElementById('offerVol').value;	
 
    const { offer } = this.meta.methods;	
    const result = await offer(_rid6, _offvol ).send({ from: this.account, gas: '1000000' }).on('error', function(error,receipt){
		console.log(error);
		console.log(receipt);
	});
    console.log(result.status);
},
  
  
payID: async function() {
	    
    const { payID } = this.meta.methods;
	const _p_rID = document.getElementById('p_rID').value;
	
	await payID(_p_rID).call().then(function(result){
	document.getElementById('payee').innerHTML = result[0];
	var off_stat;
	if(result[1] == true)
	   off_stat = "Offered";
    else
	   off_stat = "Not Offered";
	document.getElementById('pur_ID').innerHTML = off_stat;
    });
},
  
pay: async function() {
	    
	const _seller = document.getElementById('sellerAddress').value;
	
    const { pay } = this.meta.methods;
    const result = await pay(_seller ).send({ from: this.account, gas: '1000000' });
    console.log(result.status);
},

  
status: async function() {
	  
	const _rid8 = document.getElementById('resID8').value;
	const _flag8 = document.getElementById('flag8').value;
 
    const { status } = this.meta.methods;
	console.log(_flag8);
	console.log(_rid8);
	
    const result = await status( _rid8, _flag8 ).send({ from: this.account, gas: '1000000' }).on('error', function(error,receipt){
		console.log(error);
		console.log(receipt);
	});
    console.log(result.status);
},
  
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
