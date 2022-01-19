
/**
 * This class is the controller module for everything to do with the work panel. 
 * It handles all the work related interactions made by the client.
 */

let newSaleryAmount = 0.0;

class KomputerAppWork{
/**
 * @return {KomputerAppWork}
 * @constructor
 */
    constructor(){
        this.initialPayBalance = 0.0;
    }
}

/**
 * Instantiate the pay salary. The function only gets run once by the KomputerAppRunner.js file.
 * 
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 * 
 * @param {void} undefined No argument needed as the initial pay salary is set from the constructor.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.intiUserSaleryAmount = function(){
    payMsg.innerHTML = 'Current salary: ' + this.initialPayBalance + ' SEK';
}

/**
 * Increases they pay salary by 100 every time the function gets called. And updates the pay salary in the UI.
 * 
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global variable to increase the pay salary.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.inscreasePayOnChangeListener = function(){
    newSaleryAmount = newSaleryAmount + 100;
    KomputerAppWork.prototype.updatePayListener(); 
}

/**
 * Resets the pay salary to zero every time it gets called.
 * 
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global variable to zero.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.resetPayListener = function(){
    newSaleryAmount = 0;
    KomputerAppWork.prototype.updatePayListener(); 
}

/**
 * Updates the current pay salary in the UI.
 * 
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global variable to zero.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.updatePayListener = function(){
    payMsg.innerHTML = 'Current salary: ' + newSaleryAmount;
}

/**
 * Heavy duty function! This function transfers money to the bank salary and updates it for the client UI.
 * If the client has a initial loan, then 10% of the salary must first be deducted and transferred to the outstanding loan amount.
 * This code is large and should be optimized when possible. Its kinda messy i know.
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global variable to zero.
 * @return {void} returns undefined. 
 */
   KomputerAppWork.prototype.transferSaleryToBankListener = function(){
        if(newSaleryAmount > 0 && loanDataStructure.loans[loanDataStructure.loans.length - 1] != undefined && loanDataStructure.totalLoanAmount != 0){

            let fractionAmount = newSaleryAmount * 0.10;
            newSaleryAmount = newSaleryAmount - fractionAmount;

            loanDataStructure.totalLoanAmount =  loanDataStructure.totalLoanAmount - fractionAmount;
            loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newSaleryAmount;
            loanDataStructure.loans[loanDataStructure.loans.length - 1] = loanDataStructure.loans[loanDataStructure.loans.length - 1] - fractionAmount;
            let restValue  = newSaleryAmount - loanDataStructure.totalLoanAmount;

            if(loanDataStructure.loans[loanDataStructure.loans.length - 1]  <= 0){
                loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + restValue;
                loanDataStructure.totalLoanAmount =  0;
                loanDataStructure.loans.pop();

                let historyObject = {occurence:"Transfer: ", amount: newSaleryAmount.toString(), date: dateObj.toLocaleString()};
                loanDataStructure.historyList.push(historyObject);

                newSaleryAmount = 0;

                KomputerAppWork.prototype.updatePayListener();
                KomputerAppBank.prototype.updateBankInformation();
                return
            }
            else{
                let historyObject = {occurence:"Transfer: ", amount: newSaleryAmount.toString(), date: dateObj.toLocaleString()};
                loanDataStructure.historyList.push(historyObject);
    
                newSaleryAmount = 0;
                KomputerAppBank.prototype.updateBankInformation();
                KomputerAppWork.prototype.updatePayListener();
            }
        }
        else if(newSaleryAmount == 0){
            alert("Add work to be able to transfer money to the bank.")
        }
        else{
            loanDataStructure.currentUserBalance =  loanDataStructure.currentUserBalance + newSaleryAmount;
            let historyObject = {occurence:"Transfer: ", amount: newSaleryAmount.toString(), date: dateObj.toLocaleString()};
            loanDataStructure.historyList.push(historyObject);

            newSaleryAmount = 0;
            KomputerAppBank.prototype.updateBankInformation();
            KomputerAppWork.prototype.updatePayListener();
        }
   }