/**
 * This class is the controller module for everything to do with the bank and repay panel. 
 * It handles all the bank and repay related interactions made by the client.
 */
var userNameElementGlobal;

class KomputerAppBank{
/**
 * @return {KomputerAppBank}
 * @constructor
 */
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

    recentLoanMsgElement.innerHTML =  'No Current loans to repay';
    userBalanceElement.innerHTML = 'Current balance: ' + loanDataStructure.currentUserBalance + ' SEK';
    bankHistoryList.innerHTML = 'No current transaction information available';
    userNameElement.innerHTML = loanDataStructure.user;
}

/**
 * This function updates the UI-bank information if the requirements are correct.  
 * This code is lage and should be optimized when possible.
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
        recentLoanMsgElement.innerHTML =  'No Current loans to repay';
        loanList.innerHTML = '';
        repayList.innerHTML = '';
    }
    if(loanDataStructure.historyList.length == 0){
        bankHistoryList.innerHTML = 'No current transaction information available';
    }
    if(loanDataStructure.historyList.length == 8){
        bankHistoryList.innerHTML = 'We clear bank information when list is full.';
        loanDataStructure.historyList.length = 0;
    }
    else{

        if(loanDataStructure.loans[loanDataStructure.loans.length - 1] == undefined){
            recentLoanMsgElement.innerHTML =  'No Current loans to repay';
        }
        else{
            recentLoanMsgElement.innerHTML =  'Current loan amount: ' + loanDataStructure.loans[loanDataStructure.loans.length - 1];
        }
        for(var i = 0; i < loanDataStructure.loans.length; i++) {
            loanList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
            repayList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
        }
        KomputerAppBank.prototype.printHistoryToUiPanel(loanDataStructure.historyList.length);
    }
}

/**
 * Updates the transaction history panel at the client side.  
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {number} length the n-amount to iterate the transaction history list.
 * @return {void} returns undefined. 
 */
KomputerAppBank.prototype.printHistoryToUiPanel = function(length){

    for(var i = 0; i < length; i++) {
        bankHistoryList.innerHTML = loanDataStructure.historyList.map(i => `<li>${i.occurence + i.amount + ' SEK,  ' + i.date} </li>`).join('');
    }
}

/**
 * This function makes the repay-form to pop-up for the client.  
 * This function handles input value entered by the client.
 * This function also makes sure the clint must have paid his initial loan to be able to take a new one.
 * This code is lage and should be optimized when possible.
 * The KomputerAppBankPrompt may be combined with this function. If there is time it good to do. As they both handle user input. 
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} undefined No param needed as the input from the form is only a reached in this function with its HTML element.
 * @return {void} returns undefined. 
 */
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
        recentLoanMsgElement.innerHTML =  'ERROR: Repay amount is to large. Please enter the value: ' + loanDataStructure.loans[loanDataStructure.loans.length - 1];
        return;
    }
    else if(loanDataStructure.totalLoanAmount == 0){
        recentLoanMsgElement.innerHTML =  'ERROR: Take a new loan to be able to repay!';
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


