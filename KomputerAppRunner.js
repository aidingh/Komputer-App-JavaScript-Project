
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

const loanDataStructure = {user:"", currentUserBalance: 0.0, totalLoanAmount:0.0, saleryAmount: 0.0, loans: [], tranfers:[]};

var startServiceObject = new KomputerAppService('https://noroff-komputer-store-api.herokuapp.com/computers');
let computerJson = startServiceObject.getKomputerData();

var komputerBankObject = new KomputerAppBank("John banker", 0.0, loanDataStructure, 0.0);
komputerBankObject.initUserBalance();

var komputerWorkObject  = new KomputerAppWork();
komputerWorkObject.intiUserSaleryAmount();

