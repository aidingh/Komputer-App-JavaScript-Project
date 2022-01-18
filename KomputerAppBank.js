
var userNameElementGlobal;

class KomputerAppBank{
    
    constructor(userName, initBalanceAmount, loanDataStructure, initialTotalLoanAmount){
        this.userName = userName;
        this.initBalanceAmount = initBalanceAmount;
        this.initialTotalLoanAmount = initialTotalLoanAmount;
        this.loanDataStructure = loanDataStructure;
        userNameElementGlobal = userBalanceElement;
    }
}

/**
 * Instanciates the HTML elements and loanDataStructure paramets when KomputerAppRunner.js is first run. This function only gets run once.
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {void} loanDataStructure Function takes no input, but sets the initial values for the data structure and HTML elements.
 * @return {void} Does not return anything. 
 */
KomputerAppBank.prototype.initUserBalance = function(){

    loanDataStructure.currentUserBalance = this.initBalanceAmount;
    loanDataStructure.totalLoanAmount = this.initialTotalLoanAmount;
    loanDataStructure.user = this.userName;

    userBalanceElement.innerHTML = 'Current balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    bankHistoryList.innerHTML = 'No current bank information available';
    userNameElement.innerHTML = loanDataStructure.user;
}



/**
 * The infamous prompt. The client specifies its input. But there can only be positive integer values. This code handles thoose cases.
 * The code also handles specifications made by the project directive. Such as the client cant have more that 2x loans if the initial loan is not payed back.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {void} input Input values specified by the client.
 * @return {boolean} returns true to exit promt and false to close promt 
 */
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

/**
 * This functions gets excecuted in the .getLoanPromt() function. It checks the project directives. 
 * Such as the client cant have more that 2x loans if the initial loan is not payed back. And that the client cant borrow twice the current user balance.
 * If the requirements are met, the client can take a loan and the UI gets updated.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {number} newLoanAmount New loan amount specified by the client.
 * @return {boolean} returns true if the loan attempt was succesfull and false if not.
 */
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

        let historyObject = {occurence:"Recent loan: ", amount: newLoanAmount.toString(), date: dateObj.toLocaleString()};
        loanDataStructure.historyList.push(historyObject);

        KomputerAppBank.prototype.updateBankInformation();
        return true;
    }
}

/**
 * This function updates the UI-bank information if the requirements are correct.  
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @global {document} list document object refering to the UI-element in the html.file. This list updates the infor in the bank panel.
 * @global {document} repayList document object refering to the UI-element in the html.file. This list updates the infor in the repay panel.
 * @return {void} returns undefined. 
 */
KomputerAppBank.prototype.updateBankInformation = function(){
    userNameElementGlobal.innerHTML = 'New balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    recentLoanAmountElement.innerHTML = 'Total loan amount: ' + loanDataStructure.totalLoanAmount +  ' SEK';
    
    if(loanDataStructure.loans.length == 0){
        recentLoanMsgElement.innerHTML =  'All loans are now payed back! You can borrow more if you like.';
        list.innerHTML = '';
        repayList.innerHTML = '';
        
    }
    if(loanDataStructure.historyList.length == 0){
        bankHistoryList.innerHTML = 'No current bank information available';
    }
    if(loanDataStructure.historyList.length == 8){
        bankHistoryList.innerHTML = 'We clear bank information when list is full.';
        loanDataStructure.historyList.length = 0;
    }
    else{

        recentLoanMsgElement.innerHTML =  'Your recent loan amount: ' + loanDataStructure.loans[loanDataStructure.loans.length - 1] +  ' SEK';

        for(var i = 0; i < loanDataStructure.loans.length; i++) {
            list.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
            repayList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
        }

        KomputerAppBank.prototype.printHistoryToUiPanel(loanDataStructure.historyList.length);
    }
}


KomputerAppBank.prototype.printHistoryToUiPanel = function(length){

    for(var i = 0; i < length; i++) {
        bankHistoryList.innerHTML = loanDataStructure.historyList.map(i => `<li>${i.occurence + i.amount + '  ' + i.date} </li>`).join('');
    }
}

/**
 * Opens the repay panel if the conditions are met. 
 *
 * @return {void} returns undefined. 
 */
KomputerAppBank.prototype.openRepayForm  = function(){
    if(loanDataStructure.currentUserBalance == 0){
        alert("Error: Work and take a loan to repay.");
        return;
    }
    document.getElementById("myForm").style.display = "block";
}

/**
 * Closes the repay panel on demand.
 *
 * @return {void} returns undefined. 
 */
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
        KomputerAppBank.prototype.updateBankInformation();
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

        KomputerAppBank.prototype.updateBankInformation();
    }
    
}


