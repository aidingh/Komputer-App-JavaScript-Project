
var userNameElementGlobal;



class KomputerAppBank{
    
    constructor(userName, initBalanceAmount, loanDataStructure, initialTotalLoanAmount){
        this.userName = userName;
        this.initBalanceAmount = initBalanceAmount;
        this.initialTotalLoanAmount = initialTotalLoanAmount;
        this.loanDataStructure = loanDataStructure;

        this.userBalanceElement = document.getElementById('balanceMsg');
        this.userNameElement = document.getElementById('bankName'); 
        userNameElementGlobal = this.userBalanceElement;
    }
}

KomputerAppBank.prototype.initUserBalance = function(){

    loanDataStructure.currentUserBalance = this.initBalanceAmount;
    loanDataStructure.totalLoanAmount = this.initialTotalLoanAmount;
    loanDataStructure.user = this.userName;

    this.userBalanceElement.innerHTML = 'Current balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    bankHistoryList.innerHTML = 'No current bank information available';
    this.userNameElement.innerHTML = loanDataStructure.user;
}


KomputerAppBank.prototype.getLoanPrompt = function(){
    

    if(loanDataStructure.currentUserBalance == 0){
        alert("Current bank balance is " + loanDataStructure.currentUserBalance + " SEK. Transfer money to bank salery to continue");
        return;
    }
    else{
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
            else if(KomputerAppBank.prototype.updateUserBalance(parseInt(input))){
                alert("Loan have been submitted");
                return true;
            }
            else{
                return false;
            }
        }
    }
}


KomputerAppBank.prototype.updateUserBalance = function(newLoanAmount){

    if(newLoanAmount > (loanDataStructure.currentUserBalance)*2){
        alert("Loans can not be twice the amount of your current balance");
        return false;
    }
    else if(loanDataStructure.loans.length == 2){
        alert("Repay your last loan fully to take take a new loan ");
        return false;
    }
    else{
        loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newLoanAmount;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount + newLoanAmount;
        loanDataStructure.loans.push(newLoanAmount);
        KomputerAppBank.prototype.updateBankInformation(list, repayList);
        return true;
    }

}

KomputerAppBank.prototype.updateBankInformation = function(list, repayList){
    userNameElementGlobal.innerHTML = 'New balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    recentLoanAmountElement.innerHTML = 'Total loan amount: ' + loanDataStructure.totalLoanAmount +  ' SEK';
    
    if(loanDataStructure.loans.length == 0){
        recentLoanMsgElement.innerHTML =  'All loans are now payed back! You can borrow more if you like.';
        list.innerHTML = '';
        repayList.innerHTML = '';
        bankHistoryList.innerHTML = 'No current bank information available';
    }
    else{

        recentLoanMsgElement.innerHTML =  'Your recent loan amount: ' + loanDataStructure.loans[loanDataStructure.loans.length - 1] +  ' SEK';

        for(var i = 0; i < loanDataStructure.loans.length; i++) {
            list.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
            repayList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
            bankHistoryList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
        }
    }
}

KomputerAppBank.prototype.openRepayForm  = function(){
    if(loanDataStructure.currentUserBalance == 0){
        alert("Error: Work and take a loan to repay.");
        return;
    }
    document.getElementById("myForm").style.display = "block";
}

KomputerAppBank.prototype.closeRepayForm = function(){
    document.getElementById("myForm").style.display = "none";
}


KomputerAppBank.prototype.rePayLoanListener  = function(){
    
    var repayValue = document.getElementById("form").value;
    let restOfRepay = 0.0;

    restOfRepay  =  loanDataStructure.loans[loanDataStructure.loans.length - 1] - repayValue;

    if(restOfRepay == 0){
        loanDataStructure.currentUserBalance  = loanDataStructure.currentUserBalance - repayValue;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount - repayValue;
        loanDataStructure.loans.pop();
        KomputerAppBank.prototype.updateBankInformation(list, repayList);
        return;
        
    }
    else if(restOfRepay  < 0){

        recentLoanMsgElement.innerHTML =  'ERROR: Repay amount is to large. Please enter the value: ' + loanDataStructure.totalLoanAmount;
        return;
    }
    else if(loanDataStructure.totalLoanAmount == 0){
        recentLoanMsgElement.innerHTML =  'ERROR: Take a new loan to be able to repay!';
    }
    else if(loanDataStructure.currentUserBalance > loanDataStructure.currentUserBalance){
    }
    else if(repayValue < 0){
        recentLoanMsgElement.innerHTML =  'ERROR: You can not enter a negative amount!';
    }
    else{

        loanDataStructure.currentUserBalance  = loanDataStructure.currentUserBalance - repayValue;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount - repayValue;
        loanDataStructure.loans[loanDataStructure.loans.length - 1] = loanDataStructure.loans[loanDataStructure.loans.length - 1] - repayValue;

        KomputerAppBank.prototype.updateBankInformation(list, repayList);
        console.log(loanDataStructure);
    }
    
}


