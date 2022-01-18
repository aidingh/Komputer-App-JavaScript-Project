
document.getElementById("myForm").style.display = "none";
let dateObj = new Date();
var list  = document.getElementById('loanList');
var repayList  = document.getElementById('repayList');
var bankHistoryList  = document.getElementById('bankHistoryList');

var computerTitle = document.getElementById('computerCardTitle');
var komputerSpecList = document.getElementById('specList');  
var komputerStockAmount = document.getElementById('stockMsg'); 

var recentLoanAmountElement = document.getElementById('recentLoanAmountMsg');
var recentLoanMsgElement = document.getElementById('lastLoanMsg');

var select = document.getElementById("selectNumber")
var desc = document.getElementById('descMsg');
var komputerPrice = document.getElementById('priceMsg');
var komputerImg = document.getElementById('komputerImg');   
var computerTitle = document.getElementById('computerCardTitle');  

var userBalanceElement = document.getElementById('balanceMsg');
var userNameElement = document.getElementById('bankName'); 

const loanDataStructure = {user:"", currentUserBalance: 0.0, totalLoanAmount:0.0, loans: [], historyList:[]};

var startServiceObject = new KomputerAppService('https://noroff-komputer-store-api.herokuapp.com/computers');
let computerJson = startServiceObject.getKomputerData();

var komputerBankObject = new KomputerAppBank("John banker", 0.0, loanDataStructure, 0.0);
komputerBankObject.initUserBalance();

var komputerWorkObject  = new KomputerAppWork();
komputerWorkObject.intiUserSaleryAmount();

