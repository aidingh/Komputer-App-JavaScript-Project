

document.getElementById("myForm").style.display = "none";

const loanDataStructure = {user:"", currentUserBalance: 0.0, totalLoanAmount:0.0, saleryAmount: 0.0, loans: [], tranfers:[]};

var startServiceObject = new KomputerAppService('https://noroff-komputer-store-api.herokuapp.com/computers');
let computerJson = startServiceObject.getKomputerData();

var komputerBankObject = new KomputerAppBank("John banker", 0.0, loanDataStructure, 0.0);
komputerBankObject.initUserBalance();

var komputerWorkObject  = new KomputerAppWork();
komputerWorkObject.intiUserSaleryAmount();

