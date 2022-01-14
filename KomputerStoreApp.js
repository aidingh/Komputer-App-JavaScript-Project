
var select = document.getElementById("selectNumber");
var desc = document.getElementById('descMsg');
var komputerImg = document.getElementById('komputerImg');  
var komputerPrice = document.getElementById('priceMsg');  
var userBalanceElement = document.getElementById('balanceMsg');  
var recentLoanAmountElement = document.getElementById('recentLoanAmountMsg'); 
var userNameElement = document.getElementById('bankName');
var recentLoanMsgElement = document.getElementById('lastLoanMsg'); 

var list  = document.getElementById('loanList');
var repayList  = document.getElementById('repayList');

let currentUserBalance = 200.0;
let loanAmount =  0.0;
let loanCounter = 0;

let dateObj = new Date();

document.getElementById("myForm").style.display = "none";


const loanDataStructure = {user:"John banker", currentUserBalance: 200.0, totalLoanAmount:0.0, repayAmount: 0.0, totalAmountOfLoans: 0.0, loans: []};

let globalKomputerJsonObject;

async function getKomputerData(){
    
    let response = fetch('https://noroff-komputer-store-api.herokuapp.com/computers');
    if((await response).status == 200){
        let computerData = await (await response).text();
        globalKomputerJsonObject = computerData;
        initUserBalance();
        komputerDataTitleToSelection(computerData);
    }
    else{
        console.log('Something went wrong, could not get computer data');
    }
}

function komputerDataTitleToSelection(computers){
    var obj = JSON.parse(computers);

    for(var i = 0; i < obj.length; i++) {
        select.innerHTML = select.innerHTML +'<option value=' + obj[i].id + '>' + obj[i].title + '</option>';
    }
    desc.innerHTML = obj[0].description;
    komputerPrice.innerHTML = obj[0].price + ' SEK';
     komputerImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + obj[0].image;

}


function onKomputerSelectListener(){
    var obj = JSON.parse(globalKomputerJsonObject); 
    let selectedItem = obj.find(x => x.id == select.value);

    desc.innerHTML = selectedItem.description;
    komputerPrice.innerHTML = selectedItem.price + ' SEK';
    console.log(selectedItem.image);
    komputerImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedItem.image;
}


function initUserBalance(){
    userBalanceElement.innerHTML = 'Current balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    userNameElement.innerHTML = loanDataStructure.user;
}

function getUserLoanButtonListener(){

    while(true){
        let input = prompt("Input loan amount: ");
        if (input == null) {
            alert("You have cancelled your loan application");
            return true;
        }
        else if (input.length <= 0 || isNaN(input)) {
            alert("Please enter loan amount to continue");
        }
        else if(parseInt(input) <= 0){
            alert("Please enter a loan value greater than 0");

        }
        else if(parseInt(input) >= loanDataStructure.currentUserBalance * 2){
            alert("Loans can not be twice the amount of your current balance");
        }
        if(checkTotalLoans()){
            updateUserBalance(parseInt(input));
            alert("Loan have been submitted");
            return true;
        } 
    }
}

function checkTotalLoans(){
    if(loanDataStructure.loans.length == 2){
        alert("Repay your last loan fully to take take a new loan ");
        return false;
    }
    else{
        return true; 
    }
}


function updateUserBalance(newLoanAmount){

    loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newLoanAmount;
    loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount + newLoanAmount;

    loanDataStructure.loans.push(newLoanAmount);
    loanCounter ++ ;
    
    updateBankInformation(list, repayList);
}


function openForm(){
    document.getElementById("myForm").style.display = "block";
}

function closeForm(){
    document.getElementById("myForm").style.display = "none";
}


// SOLVE THE BUGGS!!!!
function rePayLoanListener(){
    
    var repayValue = document.getElementById("form").value;
    let restOfRepay = 0.0;

    restOfRepay  =  loanDataStructure.loans[loanDataStructure.loans.length - 1] - repayValue;
    console.log(restOfRepay);

    if(restOfRepay == 0){
        loanCounter--;
        loanDataStructure.currentUserBalance  = loanDataStructure.currentUserBalance - repayValue;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount - repayValue;
        loanDataStructure.loans.pop();
        updateBankInformation(list, repayList);
        console.log(loanDataStructure);
    }
    else if(loanDataStructure.totalLoanAmount == 0){
        recentLoanMsgElement.innerHTML =  'ERROR: Take a new loan to be able to repay!';
    }
    else if(repayValue < 0){
        recentLoanMsgElement.innerHTML =  'ERROR: You can not enter a negative amount!';
    }
    else if(repayValue == loanDataStructure.totalLoanAmount){
        loanDataStructure.totalLoanAmount = 0;


    }
    else{
        console.log('du är');
        loanDataStructure.currentUserBalance  = loanDataStructure.currentUserBalance - repayValue;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount - repayValue;
        loanDataStructure.loans[loanDataStructure.loans.length - 1] = repayValue;
        updateBankInformation(list, repayList);
        console.log(loanDataStructure);
    }
    
}

function updateBankInformation(list, repayList){

    userBalanceElement.innerHTML = 'New balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    recentLoanAmountElement.innerHTML = 'Total loan amount: ' + loanDataStructure.totalLoanAmount +  ' SEK';

    if(loanDataStructure.loans.length == 0){
        recentLoanMsgElement.innerHTML =  'All loans are now payed back! You can borrow more if you like.';
        list.innerHTML = '';
        repayList.innerHTML = '';
    }
    else{
        console.log('gay');
        recentLoanMsgElement.innerHTML =  'Your recent loan amount: ' + loanDataStructure.loans[loanDataStructure.loans.length - 1] +  ' SEK';

        for(var i = 0; i < loanDataStructure.loans.length; i++) {
            list.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
            repayList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
        }
    }
}


getKomputerData();







